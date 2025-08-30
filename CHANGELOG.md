# Changelog

## [2.0.6] - 2025-08-30

### Added

- Update Documents

## [2.0.5] - 2025-08-30

### Added

- Event Parameters Validation: Added comprehensive validation for event
  parameters to prevent malicious content
- Key and Value validation with 50-character limit and forbidden key
  restrictions

## [2.0.4] - 2025-07-23

### Fixed

- SDK Initialization: Modify the config and initial SDK structure

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
