# WiseTrack Web SDK

A lightweight JavaScript SDK for tracking user behavior and events in your web applications.

![npm version](https://img.shields.io/npm/v/wisetrack)
![npm downloads](https://img.shields.io/npm/dm/wisetrack)
![bundle size](https://img.shields.io/bundlephobia/minzip/wisetrack)
![license](https://img.shields.io/npm/l/wisetrack)

---

## 🚀 Features

- Lightweight and easy to integrate
- Supports custom and revenue events
- Environment-based configuration (Sandbox & Production)
- Automatic or manual tracking control
- Customizable logging level
- TypeScript support with full type definitions
- Tree-shakable ESM and CommonJS builds
- Zero dependencies (except ua-parser-js)

---

## 📦 Installation

### Via npm
```bash
npm install wisetrack
```

### Via yarn
```bash
yarn add wisetrack
```

### Via pnpm
```bash
pnpm add wisetrack
```

### Via CDN (Direct Browser Usage)
```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/wisetrack/dist/cdn/sdk.bundle.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/wisetrack@2.0.0/dist/cdn/sdk.bundle.min.js"></script>
```

### Alternative CDNs
```html
<!-- unpkg -->
<script src="https://unpkg.com/wisetrack@2.0.0/dist/cdn/sdk.bundle.min.js"></script>
```

---

## ✅ Basic Usage

### 📱 For npm/yarn installations (ES6 Modules)

#### 1️⃣ Initialize the SDK
```typescript
import { WiseTrack, WTUserEnvironment, WTLogLevel } from "wisetrack";

await WiseTrack.instance.init({
  appToken: "YOUR_APP_TOKEN",
  appVersion: "1.0.0",
  appFrameWork: "Next.js",
  userEnvironment: WTUserEnvironment.SANDBOX,
  logLevel: WTLogLevel.DEBUG,
});
```

#### 2️⃣ Start Tracking (Optional)
```typescript
// Starts automatically if `startTrackerAutomatically` is true.
// Otherwise, you can start manually:
await WiseTrack.instance.startTracking();
```

#### 3️⃣ Track a Custom Event
```typescript
import { WTEvent } from "wisetrack";

const signupEvent = new WTEvent.Default("signup");
signupEvent.addParam("method", "Google");
await WiseTrack.instance.trackEvent(signupEvent);
```

#### 4️⃣ Track a Revenue Event
```typescript
import { WTEvent, RevenueCurrency } from "wisetrack";

const purchase = new WTEvent.Revenue("order_completed", 99.99, RevenueCurrency.USD);
purchase.addParam("item_id", "SKU-123");
await WiseTrack.instance.trackEvent(purchase);
```

### 🌐 For CDN usage (Direct Browser)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/wisetrack/dist/cdn/sdk.bundle.min.js"></script>
</head>
<body>
  <script>
    // Initialize
    WiseTrackSDK.WiseTrack.instance.init({
      appToken: "YOUR_APP_TOKEN",
      appVersion: "1.0.0",
      appFrameWork: "Vanilla JS",
      userEnvironment: WiseTrackSDK.WTUserEnvironment.SANDBOX,
      logLevel: WiseTrackSDK.WTLogLevel.DEBUG,
    });

    // Track event
    const signupEvent = new WiseTrackSDK.WTEvent.Default("signup");
    signupEvent.addParam("method", "Google");
    WiseTrackSDK.WiseTrack.instance.trackEvent(signupEvent);
  </script>
</body>
</html>
```

### 🔧 For CommonJS (Node.js)
```javascript
const { WiseTrack, WTUserEnvironment, WTLogLevel } = require("wisetrack");

// Same usage as ES6 modules
```

---

## ⚙️ Configuration Options

| Key | Required | Default | Description |
| --------------------------- | -------- | ------- | -------------------------------------------------------------- |
| `appToken` | ✅ | - | Your unique WiseTrack app token |
| `appVersion` | ✅ | - | Your app version |
| `appFrameWork` | ✅ | - | The framework/platform name |
| `userEnvironment` | ❌ | `SANDBOX` | `WTUserEnvironment.SANDBOX` or `WTUserEnvironment.PRODUCTION` |
| `trackingWaitingTime` | ❌ | `0` | Time in seconds to wait before tracking starts automatically |
| `startTrackerAutomatically` | ❌ | `true` | Whether to start tracking automatically |
| `customDeviceId` | ❌ | `auto` | Provide your own device ID |
| `defaultTracker` | ❌ | - | Optional tracker name |
| `logLevel` | ❌ | `ERROR` | Logging level (`WTLogLevel.DEBUG` / `INFO` / `WARN` / `ERROR`) |

---

## 🧹 Flush / Stop Tracking

```typescript
// Stop tracking and clear stored data
WiseTrack.instance.flush();
```

---

## 🔍 Log Level

Set the SDK log level for debugging:

```typescript
WiseTrack.instance.setLogLevel(WTLogLevel.DEBUG);
```

---

## 🏗️ Framework Examples

### React/Next.js
```tsx
import { useEffect } from 'react';
import { WiseTrack, WTUserEnvironment } from 'wisetrack';

export default function App() {
  useEffect(() => {
    WiseTrack.instance.init({
      appToken: "YOUR_APP_TOKEN",
      appVersion: "1.0.0",
      appFrameWork: "React",
      userEnvironment: WTUserEnvironment.PRODUCTION,
    });
  }, []);

  return <div>Your App</div>;
}
```

### Vue.js
```vue
<script setup>
import { onMounted } from 'vue';
import { WiseTrack, WTUserEnvironment } from 'wisetrack';

onMounted(() => {
  WiseTrack.instance.init({
    appToken: "YOUR_APP_TOKEN",
    appVersion: "1.0.0",
    appFrameWork: "Vue.js",
    userEnvironment: WTUserEnvironment.PRODUCTION,
  });
});
</script>
```

### Angular
```typescript
import { Component, OnInit } from '@angular/core';
import { WiseTrack, WTUserEnvironment } from 'wisetrack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  async ngOnInit() {
    await WiseTrack.instance.init({
      appToken: "YOUR_APP_TOKEN",
      appVersion: "1.0.0",
      appFrameWork: "Angular",
      userEnvironment: WTUserEnvironment.PRODUCTION,
    });
  }
}
```

---

## 📊 Bundle Size & Performance

| Build Type | Size (Minified) | Size (Gzipped) | Use Case |
|------------|----------------|----------------|----------|
| ESM | ~45KB | ~12KB | Modern bundlers (Webpack, Vite) |
| CommonJS | ~45KB | ~12KB | Node.js, older bundlers |
| CDN Bundle | ~25KB | ~8KB | Direct browser usage |

---

## 🔧 TypeScript Support

This package includes TypeScript definitions out of the box. No need to install additional `@types` packages.

```typescript
import type { WTConfig, WTEventData } from 'wisetrack';

const config: WTConfig = {
  appToken: "YOUR_APP_TOKEN",
  appVersion: "1.0.0",
  appFrameWork: "TypeScript App",
};
```

---

## 🧪 Browser Compatibility

| Browser | Version |
|---------|---------|
| Chrome | ≥ 60 |
| Firefox | ≥ 60 |
| Safari | ≥ 12 |
| Edge | ≥ 79 |

---

## 🛟 📚 API Reference & Support

- [📖 Documentation](https://docs.wisetrack.io)
- [📖 Detailed TypeDocs](https://github.com/wisetrack-io/web-sdk/tree/main/docs)
- [🐛 Report Issues](https://github.com/wisetrack-io/web-sdk/issues)
- [📧 Email Support](mailto:support@wisetrack.io)

---

## 📄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.

---

## 📝 License

MIT © [WiseTrack](https://wisetrack.io)