# Changelog

## [2.0.3] - 2025-07-21

### Fixed

- CDN Support: Added standalone CDN build for browser usage without npm
- Global Access: SDK now available as `WiseTrackSDK` global variable in browsers

## [2.0.1] - 2025-07-20

### Changed

- Preserved console logs for user-controlled logging levels
- Updated build configuration to maintain SDK logging functionality

### Fixed

- Console logs now respect user-defined log levels in all environments

## [2.0.0] - 2025-07-20

### Added

- Initial public release of the WiseTrack Web SDK.
- Supports loading via CDN and npm.
- Provides ESM and CommonJS modules for modern bundlers.
- Includes production and development CDN builds.
- Added full TypeScript support and typings.
