package xmlparsing

import (
	"encoding/xml"
	"io"
	"log/slog"
	"os"
	"path/filepath"
)

func UnmarshalFile[T any](filename string, data T) error {
	slog.Debug("Unmarshalling file: ", "file", filename)
	xmlFile, err := os.Open(filename)
	if err != nil {
		return err
	}
	defer xmlFile.Close()

	byteValue, err := io.ReadAll(xmlFile)
	if err != nil {
		return err
	}

	err = xml.Unmarshal(byteValue, &data)
	if err != nil {
		return err
	}
	return nil
}

func XMLFilesForPath(path string) ([]string, error) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return nil, err
	}

	matches, err := filepath.Glob(filepath.Join(path, "*.xml"))

	return matches, err
}
