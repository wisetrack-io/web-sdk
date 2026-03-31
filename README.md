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
- Deep link tracking and handling with deferred deep link support
- Customizable logging level
- TypeScript support with full type definitions

---

## 📦 Installation

### Via npm, yarn or pnpm

```bash
npm install wisetrack
yarn add wisetrack
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
<script src="https://unpkg.com/wisetrack/dist/cdn/sdk.bundle.min.js"></script>
```

---

## ✅ Basic Usage

### For npm/yarn installations (ES6 Modules)

#### 1. Initialize the SDK

```typescript
import { WiseTrack, WTUserEnvironment, WTLogLevel } from "wisetrack";

await WiseTrack.instance.init({
  appToken: "YOUR_APP_TOKEN",
  clientSecret: "YOUR_CLIENT_SECRET",
  appVersion: "1.0.0",
  appFrameWork: "Next.js",
  userEnvironment: WTUserEnvironment.SANDBOX,
  logLevel: WTLogLevel.DEBUG,
});
```

#### 2. Start Tracking (Optional)

```typescript
// Starts automatically if `startTrackerAutomatically` is true.
// Otherwise, you can start manually:
await WiseTrack.instance.startTracking();
```

#### 3. Track Event

```typescript
import { WTEvent } from "wisetrack";

// Default Event
const signupEvent = WTEvent.defaultEvent("signup", {
  method: "Google",
});
signupEvent.addParam("method", "Google");
await WiseTrack.instance.trackEvent(signupEvent);

// Revenue Event
const purchase = WTEvent.revenueEvent(
  "order_completed",
  99.99,
  RevenueCurrency.USD,
  {
    item_id: "SKU-123",
  }
);
await WiseTrack.instance.trackEvent(purchase);
```

**Note:** Event parameter keys and values have a maximum limit of 50 characters.

### For CDN usage (Direct Browser)

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
        clientSecret: "YOUR_CLIENT_SECRET",
        appVersion: "1.0.0",
        appFrameWork: "Vanilla JS",
        userEnvironment: WiseTrackSDK.WTUserEnvironment.SANDBOX,
        logLevel: WiseTrackSDK.WTLogLevel.DEBUG,
      });

      // Track event
      const signupEvent = WiseTrackSDK.WTEvent.defaultEvent("signup", {
        method: "Google",
      });
      WiseTrackSDK.WiseTrack.instance.trackEvent(signupEvent);

      // Track revenue event
      const purchaseEvent = WiseTrackSDK.WTEvent.revenueEvent(
        "buy-plan-one",
        100.0,
        "USD",
        {
          user: "some user id",
        }
      );
      WiseTrackSDK.WiseTrack.instance.trackEvent(purchaseEvent);
    </script>
  </body>
</html>
```

### For CommonJS (Node.js)

```javascript
const { WiseTrack, WTUserEnvironment, WTLogLevel } = require("wisetrack");

// Same usage as ES6 modules
```

### Using in Progressive Web Apps (PWA)

WiseTrack is fully compatible with Progressive Web Apps (PWAs).
However, to ensure accurate tracking and data delivery, please note:

**Exclude WiseTrack API requests from Service Worker caching**
If you are using `workbox` or a custom `service-worker.js`,
add this rule to avoid caching:

```js
workbox.routing.registerRoute(
  ({ url }) => url.origin.includes("wisetrack.io"),
  new workbox.strategies.NetworkOnly()
);
```

---

## ⚙️ Configuration Options

| Key                         | Required | Default      | Description                                                    |
| --------------------------- | -------- | ------------ | -------------------------------------------------------------- |
| `appToken`                  | ✅       | -            | Your unique WiseTrack app token                                |
| `clientSecret`              | ✅       | -            | Your client secret provided by WiseTrack Panel                |
| `appVersion`                | ✅       | -            | Your app version                                               |
| `appFrameWork`              | ✅       | -            | The framework/platform name                                    |
| `userEnvironment`           | ❌       | `PRODUCTION` | `WTUserEnvironment.SANDBOX` or `WTUserEnvironment.PRODUCTION`  |
| `trackingWaitingTime`       | ❌       | `0`          | Time in seconds to wait before tracking starts automatically   |
| `startTrackerAutomatically` | ❌       | `true`       | Whether to start tracking automatically                        |
| `customDeviceId`            | ❌       | `auto`       | Provide your own device ID                                     |
| `defaultTracker`            | ❌       | -            | Optional tracker name                                          |
| `logLevel`                  | ❌       | `INFO`       | Logging level (`WTLogLevel.DEBUG` / `INFO` / `WARN` / `ERROR`) |
| `deeplinkEnabled`           | ❌       | `true`       | Whether to enable deep link tracking and handling              |

---

## 🧹 Flush / Stop Tracking

```typescript
// Stop tracking and clear stored data
WiseTrack.instance.flush();
```

---

## 🔗 Deep Link Handling

WiseTrack SDK provides comprehensive deep link tracking and handling capabilities for attribution and user engagement.

### Listening to Deep Links

Set a callback listener to receive deep link events:

```typescript
import { DeeplinkHandler } from "wisetrack";

WiseTrack.instance.setOnDeeplinkListener((uri: string, isDeferred: boolean) => {
  console.log("Deep link received:", uri);
  console.log("Is deferred:", isDeferred);
  
  // Handle the deep link (e.g., navigate to the URL)
  if (isDeferred) {
    // This is a deferred deep link (for attribution after app install)
    // window.location.href = uri;
    // navigate(deepLink.path);
    // router.push(deepLink.path);
    // or any navigation method here ...

  } else {
    // Regular deep link
    // Handle navigation or other actions
  }
});
```

### Getting Deep Links

Retrieve the last recorded deep link or deferred deep link:

```typescript
// Get the last recorded deep link
const lastDeeplink = WiseTrack.instance.getLastDeeplink();
if (lastDeeplink) {
  console.log("Last deeplink:", lastDeeplink);
}

// Get the deferred deep link (for attribution)
const deferredDeeplink = WiseTrack.instance.getDeferredDeeplink();
if (deferredDeeplink) {
  console.log("Deferred deeplink:", deferredDeeplink);
}
```

### Disabling Deep Link Tracking

If you want to disable deep link tracking, set `deeplinkEnabled` to `false` in your initial configuration:

```typescript
await WiseTrack.instance.init({
  appToken: "YOUR_APP_TOKEN",
  clientSecret: "YOUR_CLIENT_SECRET",
  appVersion: "1.0.0",
  appFrameWork: "Next.js",
  deeplinkEnabled: false, // Disable deep link tracking
});
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
import { useEffect } from "react";
import { WiseTrack, WTUserEnvironment } from "wisetrack";

export default function App() {
  useEffect(() => {
    WiseTrack.instance.init({
      appToken: "YOUR_APP_TOKEN",
      clientSecret: "YOUR_CLIENT_SECRET",
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
import { onMounted } from "vue";
import { WiseTrack, WTUserEnvironment } from "wisetrack";

onMounted(() => {
  WiseTrack.instance.init({
    appToken: "YOUR_APP_TOKEN",
    clientSecret: "YOUR_CLIENT_SECRET",
    appVersion: "1.0.0",
    appFrameWork: "Vue.js",
    userEnvironment: WTUserEnvironment.PRODUCTION,
  });
});
</script>
```

### Angular

```typescript
import { Component, OnInit } from "@angular/core";
import { WiseTrack, WTUserEnvironment } from "wisetrack";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  async ngOnInit() {
    await WiseTrack.instance.init({
      appToken: "YOUR_APP_TOKEN",
      clientSecret: "YOUR_CLIENT_SECRET",
      appVersion: "1.0.0",
      appFrameWork: "Angular",
      userEnvironment: WTUserEnvironment.PRODUCTION,
    });
  }
}
```


---

## 🔧 TypeScript Support

This package includes TypeScript definitions out of the box. No need to install additional `@types` packages.

```typescript
import type { WTInitialConfig, WTEventData } from "wisetrack";

const config: WTInitialConfig = {
  appToken: "YOUR_APP_TOKEN",
  clientSecret: "YOUR_CLIENT_SECRET",
  appVersion: "1.0.0",
  appFrameWork: "TypeScript App",
};
```

---

## 📚 API Reference & Support

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
