# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial Quartz community plugin template.

### Changed

- **BREAKING**: `slugifyPath`, `slugifyFilePath`, and `slugTag` now lowercase their output to match Obsidian's case-insensitive link- and tag-matching semantics. Previously all three preserved case. This means `[[My Note]]` and `[[my note]]` both resolve to the slug `my-note`, and the tags `#MyTag` and `#mytag` collapse into a single tag page. Downstream effects: all generated URLs are now lowercase; users upgrading from earlier Quartz v5 betas with mixed-case source filenames will see their URLs change (e.g. `/MyNote` → `/my-note`). Also eliminates silent data loss on case-insensitive filesystems (macOS APFS, Windows NTFS), where `Apple.md` and `apple.md` previously produced conflicting HTML outputs that overwrote each other without warning.
