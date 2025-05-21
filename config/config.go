package config

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/kelseyhightower/envconfig"
)

const (
	DEFAULT_DIR              = "_cache"
	DEFAULT_GIT_CACHE_DIR    = "git"
	DEFAULT_GND_CACHE_DIR    = "gnd"
	DEFAULT_GEO_CACHE_DIR    = "geo"
	DEFAULT_SEARCH_CACHE_DIR = "search"
	DEFAULT_IMG_DIR          = "data_bilder"
	DEFAULT_WEBHOOK_ENDPOINT = "/webhook"

	DEFAULT_BRANCH = "main"

	DEFAULT_PORT  = "8085"
	DEFAULT_ADDR  = "127.0.0.1"
	DEFAULT_HTTPS = false

	ENV_PREFIX = "KGPZ"
)

type ConfigProvider struct {
	Files []string
	*Config
}

type Config struct {
	// At least one of these should be set
	BaseDIR         string `json:"base_dir" envconfig:"BASE_DIR"`
	GitURL          string `json:"git_url" envconfig:"GIT_URL"`
	GitBranch       string `json:"git_branch" envconfig:"GIT_BRANCH"`
	GITPath         string `json:"git_path" envconfig:"GIT_PATH"`
	GNDPath         string `json:"gnd_path" envconfig:"GND_PATH"`
	GeoPath         string `json:"geo_path" envconfig:"GEO_PATH"`
	WebHookEndpoint string `json:"webhook_endpoint" envconfig:"WEBHOOK_ENDPOINT"`
	WebHookSecret   string `json:"webhook_secret" envconfig:"WEBHOOK_SECRET"`
	Debug           bool   `json:"debug" envconfig:"DEBUG"`
	Cache           bool   `json:"cache" envconfig:"CACHE"`
	Watch           bool   `json:"watch" envconfig:"WATCH"`
	LogData         bool   `json:"log_data" envconfig:"LOG_DATA"`

	Address string `json:"address" envconfig:"ADDRESS"`
	Port    string `json:"port" envconfig:"PORT"`
	Https   bool   `json:"https" envconfig:"HTTPS"`
}

func NewConfigProvider(files []string) *ConfigProvider {
	return &ConfigProvider{Files: files}
}

func (c *ConfigProvider) Read() error {
	c.Config = &Config{}
	for _, file := range c.Files {
		_, _ = readSettingsFile(c.Config, file)
	}
	c.Config = readSettingsEnv(c.Config)
	c.Config = readDefaults(c.Config)
	return nil
}

func (c *ConfigProvider) Validate() error {
	if strings.TrimSpace(c.Config.BaseDIR) == "" {
		return fmt.Errorf("Base directory path not set")
	}
	return nil
}

func readSettingsFile(cfg *Config, path string) (*Config, error) {
	f, err := os.Open(path)
	if err != nil {
		return cfg, err
	}
	defer f.Close()

	dec := json.NewDecoder(f)
	err = dec.Decode(cfg)

	return cfg, err
}

func readSettingsEnv(cfg *Config) *Config {
	_ = envconfig.Process(ENV_PREFIX, cfg)
	return cfg
}

func readDefaults(cfg *Config) *Config {
	if strings.TrimSpace(cfg.BaseDIR) == "" {
		cfg.BaseDIR = DEFAULT_DIR
	}

	if strings.TrimSpace(cfg.GitBranch) == "" {
		cfg.GitBranch = DEFAULT_BRANCH
	}

	if strings.TrimSpace(cfg.GITPath) == "" {
		cfg.GITPath = DEFAULT_GIT_CACHE_DIR
	}

	if strings.TrimSpace(cfg.GNDPath) == "" {
		cfg.GNDPath = DEFAULT_GND_CACHE_DIR
	}

	if strings.TrimSpace(cfg.GeoPath) == "" {
		cfg.GeoPath = DEFAULT_GEO_CACHE_DIR
	}

	if strings.TrimSpace(cfg.Address) == "" {
		cfg.Address = DEFAULT_ADDR
	}

	if strings.TrimSpace(cfg.WebHookEndpoint) == "" {
		cfg.WebHookEndpoint = DEFAULT_WEBHOOK_ENDPOINT
	}

	if strings.TrimSpace(cfg.Port) == "" {
		cfg.Port = DEFAULT_PORT
	}

	return cfg
}

func (c *Config) String() string {
	json, err := json.Marshal(c)
	if err != nil {
		return "Config: Error marshalling to JSON"
	}
	return string(json)
}
