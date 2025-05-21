package middleware

import (
	"bytes"
	"hash/crc32"

	"github.com/gofiber/fiber/v2"

	"github.com/valyala/bytebufferpool"
)

// Config defines the config for middleware.
type Config struct {
	// Weak indicates that a weak validator is used. Weak etags are easy
	// to generate, but are far less useful for comparisons. Strong
	// validators are ideal for comparisons but can be very difficult
	// to generate efficiently. Weak ETag values of two representations
	// of the same resources might be semantically equivalent, but not
	// byte-for-byte identical. This means weak etags prevent caching
	// when byte range requests are used, but strong etags mean range
	// requests can still be cached.
	Weak bool

	// Next defines a function to skip this middleware when returned true.
	//
	// Optional. Default: nil
	Next func(c *fiber.Ctx) bool
}

// ConfigDefault is the default config
var ConfigDefault = Config{
	Weak: false,
	Next: nil,
}

// Helper function to set default values
func configDefault(config ...Config) Config {
	// Return default config if nothing provided
	if len(config) < 1 {
		return ConfigDefault
	}

	// Override default config
	cfg := config[0]

	// Set default values

	return cfg
}

func New() fiber.Handler {
	var (
		normalizedHeaderETag = []byte("Etag")
		weakPrefix           = []byte("W/")
	)

	const crcPol = 0xD5828281
	crc32q := crc32.MakeTable(crcPol)

	// Return new handler
	return func(c *fiber.Ctx) error {
		// Return err if next handler returns one
		if err := c.Next(); err != nil {
			return err
		}

		// Don't generate ETags for invalid responses
		if c.Response().StatusCode() != fiber.StatusOK {
			return nil
		}
		body := c.Response().Body()
		// Skips ETag if no response body is present
		if len(body) == 0 {
			return nil
		}
		// Skip ETag if header is already present
		if c.Response().Header.PeekBytes(normalizedHeaderETag) != nil {
			return nil
		}

		// Generate ETag for response
		bb := bytebufferpool.Get()
		defer bytebufferpool.Put(bb)

		_ = bb.WriteByte('"') //nolint:errcheck // This will never fail
		bb.B = appendUint(bb.Bytes(), uint32(len(body)))
		_ = bb.WriteByte('-') //nolint:errcheck // This will never fail
		bb.B = appendUint(bb.Bytes(), crc32.Checksum(body, crc32q))
		_ = bb.WriteByte('"') //nolint:errcheck // This will never fail

		etag := bb.Bytes()

		// Get ETag header from request
		clientEtag := c.Request().Header.Peek(fiber.HeaderIfNoneMatch)

		// Check if client's ETag is weak
		if bytes.HasPrefix(clientEtag, weakPrefix) {
			// Check if server's ETag is weak
			if bytes.Equal(clientEtag[2:], etag) || bytes.Equal(clientEtag[2:], etag[2:]) {
				// W/1 == 1 || W/1 == W/1
				c.Context().ResetBody()

				return c.SendStatus(fiber.StatusNotModified)
			}
			// W/1 != W/2 || W/1 != 2
			c.Response().Header.SetCanonical(normalizedHeaderETag, etag)

			return nil
		}

		if bytes.Contains(clientEtag, etag) {
			// 1 == 1
			c.Context().ResetBody()

			return c.SendStatus(fiber.StatusNotModified)
		}
		// 1 != 2
		c.Response().Header.SetCanonical(normalizedHeaderETag, etag)

		return nil
	}
}

// appendUint appends n to dst and returns the extended dst.
func appendUint(dst []byte, n uint32) []byte {
	var b [20]byte
	buf := b[:]
	i := len(buf)
	var q uint32
	for n >= 10 {
		i--
		q = n / 10
		buf[i] = '0' + byte(n-q*10)
		n = q
	}
	i--
	buf[i] = '0' + byte(n)

	dst = append(dst, buf[i:]...)
	return dst
}
