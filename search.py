#!/usr/bin/env python3
"""
search.py – Search all .md files in the repository for a keyword.
Usage: python search.py <keyword>
Example: python search.py "AES"
"""

import os
import sys
import glob

def search_files(keyword, root_dir="."):
    """Recursively search all .md files for the keyword."""
    results = []
    for filepath in glob.glob(os.path.join(root_dir, "**/*.md"), recursive=True):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
                if keyword.lower() in content.lower():
                    # Extract a snippet (first line or context)
                    lines = content.split("\n")
                    snippet = ""
                    for line in lines:
                        if keyword.lower() in line.lower():
                            snippet = line.strip()
                            break
                    results.append({
                        "file": filepath,
                        "snippet": snippet or "Keyword found (no snippet)"
                    })
        except (UnicodeDecodeError, OSError):
            continue
    return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python search.py <keyword>")
        sys.exit(1)

    keyword = " ".join(sys.argv[1:])
    print(f"Searching for '{keyword}' in all notes...\n")

    results = search_files(keyword)
    if not results:
        print("No matches found.")
    else:
        for r in results:
            print(f"📄 {r['file']}")
            print(f"   {r['snippet']}\n")
