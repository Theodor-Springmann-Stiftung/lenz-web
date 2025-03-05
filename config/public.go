package config

import "sync"

var cp *ConfigProvider
var mu = sync.Mutex{}

func Get() Config {
	mu.Lock()
	defer mu.Unlock()

	if cp == nil {
		cp = NewConfigProvider([]string{"config.dev.json", "config.json"})
	}
	return *cp.Config
}

func Set(config Config) {
	mu.Lock()
	defer mu.Unlock()

	cp = &ConfigProvider{Config: &config}
}
