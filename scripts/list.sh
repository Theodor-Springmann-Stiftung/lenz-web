#!/usr/bin/env bash
# Usage: ./list_tags_and_attrs.sh file.xml

if [[ -z "$1" ]]; then
  echo "Usage: $0 file.xml" >&2
  exit 1
fi

FILE="$1"

# 1. list all unique tags
tags=($(xmlstarlet el -v "$FILE" | awk -F/ '{print $NF}' | sort -u))

for tag in "${tags[@]}"; do
  echo "$tag"
  # 2. for each tag, list all attribute values
  xmlstarlet sel -t \
    -m "//$tag/@*" \
    -v '.' -n "$FILE" \
  | sort -u \
  # 3. deduplicate via sort -u
done
