package templating

import (
	"html/template"
	"io"
	"io/fs"
	"log/slog"
	"maps"
	"net/http"
	"strconv"
	"sync"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/helpers/functions"
	"golang.org/x/net/websocket"
)

const (
	WS_SERVER       = 9000
	RELOAD_TEMPLATE = `
<script type="module">
(function () {
	let relto = -1;
  const scheme = location.protocol === "https:" ? "wss" : "ws";
  // Hardcode port 9000 here:
  const url = scheme + "://" + location.hostname + ":9000/pb/reload";

  function connect() {
    const socket = new WebSocket(url);

    socket.addEventListener("open", function () {
      console.log("Reload socket connected (port 9000).");
    });

    socket.addEventListener("message", function (evt) {
      if (evt.data === "reload") {
        console.log("Received reload signal. Reloading...");
				if (relto !== -1) clearTimeout(relto);
				relto = setTimeout(() => location.reload(), 0);	
      }
    });

    socket.addEventListener("close", function () {
      console.log("Reload socket closed. Reconnecting in 3 seconds...");
      setTimeout(connect, 3000);
    });

    socket.addEventListener("error", function (err) {
      console.error("Reload socket error:", err);
      // We'll let onclose handle reconnection.
    });
  }

  // Initiate the first connection attempt.
  connect();
})();
</script>
`
)

type Engine struct {
	debug  bool
	ws     *WsServer
	onceWS sync.Once

	// NOTE: LayoutRegistry and TemplateRegistry have their own syncronization & cache and do not require a mutex here
	regmu            *sync.RWMutex
	LayoutRegistry   *LayoutRegistry
	TemplateRegistry *TemplateRegistry

	mu         *sync.RWMutex
	FuncMap    template.FuncMap
	GlobalData map[string]any
}

// INFO: We pass the app here to be able to access the config and other data for functions
// which also means we must reload the engine if the app changes
func New(layouts, templates *fs.FS) *Engine {
	e := Engine{
		regmu:            &sync.RWMutex{},
		mu:               &sync.RWMutex{},
		LayoutRegistry:   NewLayoutRegistry(*layouts),
		TemplateRegistry: NewTemplateRegistry(*templates),
		FuncMap:          make(template.FuncMap),
		GlobalData:       make(map[string]any),
	}
	e.funcs()
	return &e
}

func (e *Engine) Debug() {
	e.setDebugData()
	e.onceWS.Do(func() {
		e.ws = NewWsServer()
		go e.startWSServer()
	})
}

func (e *Engine) setDebugData() {
	e.mu.Lock()
	defer e.mu.Unlock()
	e.debug = true
	e.GlobalData["isDev"] = true
	e.GlobalData["debugport"] = WS_SERVER
}

func (e *Engine) startWSServer() {
	// We'll create a basic default mux here and mount /pb/reload
	mux := http.NewServeMux()
	mux.Handle("/pb/reload", websocket.Handler(e.ws.Handler))

	slog.Info("Starting separate WebSocket server for live reload...", "port", WS_SERVER)
	if err := http.ListenAndServe(":"+strconv.Itoa(WS_SERVER), mux); err != nil {
		slog.Debug("WebSocket server error", "error", err)
	}
}

func (e *Engine) funcs() error {
	e.mu.Lock()
	e.mu.Unlock()

	// Passing HTML
	e.AddFunc("Safe", functions.Safe)
	e.AddFunc("Today", functions.Today)
	e.AddFunc("GetMonth", functions.GetMonth)

	return nil
}

func (e *Engine) Globals(data map[string]any) {
	e.mu.Lock()
	defer e.mu.Unlock()
	if e.GlobalData == nil {
		e.GlobalData = data
	} else {
		maps.Copy(e.GlobalData, data)
	}
}

func (e *Engine) Load() error {
	e.regmu.Lock()
	defer e.regmu.Unlock()

	wg := sync.WaitGroup{}
	wg.Add(2)

	go func() {
		defer wg.Done()
		e.LayoutRegistry.Load()
	}()

	go func() {
		defer wg.Done()
		e.TemplateRegistry.Load()
	}()

	wg.Wait()

	return nil
}

func (e *Engine) Reload() {
	e.regmu.Lock()
	e.LayoutRegistry = e.LayoutRegistry.Reset()
	e.TemplateRegistry = e.TemplateRegistry.Reset()
	e.regmu.Unlock()
	e.Load()
}

func (e *Engine) Refresh() {
	if e.debug && e.ws != nil {
		e.ws.BroadcastReload()
	}
}

// INFO: fn is a function that returns either one value or two values, the second one being an error
func (e *Engine) AddFunc(name string, fn any) {
	e.mu.Lock()
	defer e.mu.Unlock()
	e.FuncMap[name] = fn
}

func (e *Engine) AddFuncs(funcs template.FuncMap) {
	e.mu.Lock()
	defer e.mu.Unlock()
	for k, v := range funcs {
		e.FuncMap[k] = v
	}
}

func (e *Engine) Render(out io.Writer, path string, data any, layout ...string) error {
	e.mu.RLock()
	ld := data.(map[string]any)
	if e.GlobalData != nil {
		maps.Copy(ld, e.GlobalData)
	}
	e.mu.RUnlock()

	e.regmu.RLock()
	defer e.regmu.RUnlock()
	var l *template.Template
	if layout == nil || len(layout) == 0 {
		lay, err := e.LayoutRegistry.Default(&e.FuncMap)
		if err != nil {
			return err
		}
		l = lay
	} else {
		lay, err := e.LayoutRegistry.Layout(layout[0], &e.FuncMap)
		if err != nil {
			return err
		}
		l = lay
	}

	lay, err := l.Clone()
	if err != nil {
		return err
	}

	err = e.TemplateRegistry.Add(path, lay, &e.FuncMap)
	if err != nil {
		return err
	}

	err = lay.Execute(out, ld)
	if err != nil {
		return err
	}

	return nil
}
