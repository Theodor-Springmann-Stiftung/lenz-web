package controllers

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"path/filepath"
	"strings"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/config"
	gitprovider "github.com/Theodor-Springmann-Stiftung/lenz-web/git"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/server"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

const SIGNATURE_PREFIX = "sha256="

func PostWebhook(cfg config.Config, server server.Server) fiber.Handler {
	return func(c *fiber.Ctx) error {
		body := c.Body()
		if !verifySignature256([]byte(cfg.WebHookSecret), body, c.Get("X-Hub-Signature-256")) {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		if c.Get("X-GitHub-Event") == "" {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		dir := filepath.Join(cfg.BaseDIR, cfg.GITPath)

		commit, err := gitprovider.Pull(dir, cfg.GitURL, cfg.GitBranch)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		_, err = xmlmodels.Parse(dir, commit.Hash)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		server.Cache.Reset()
		return c.SendStatus(fiber.StatusOK)
	}
}

func verifySignature256(secret, payload []byte, header string) bool {
	if !strings.HasPrefix(header, SIGNATURE_PREFIX) {
		return false
	}

	sig, err := hex.DecodeString(header[len(SIGNATURE_PREFIX):])
	if err != nil {
		return false
	}

	mac := hmac.New(sha256.New, secret)
	mac.Write(payload)
	expected := mac.Sum(nil)

	return hmac.Equal(expected, sig)
}
