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
- Automatic & manual screen tracking (URL changes, native `<dialog>` opens, plus a manual API for SPA modals/tabs)
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
  },
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
        appFrameWork: "native",
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
        },
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
  new workbox.strategies.NetworkOnly(),
);
```

---

## ⚙️ Configuration Options

| Key                         | Required | Default      | Description                                                             |
| --------------------------- | -------- | ------------ | ----------------------------------------------------------------------- |
| `appToken`                  | ✅       | -            | Your unique WiseTrack app token                                         |
| `clientSecret`              | ✅       | -            | Your client secret provided by WiseTrack Panel                          |
| `appVersion`                | ✅       | -            | Your app version                                                        |
| `appFrameWork`              | ✅       | -            | The framework/platform name                                             |
| `userEnvironment`           | ❌       | `PRODUCTION` | `WTUserEnvironment.SANDBOX` or `WTUserEnvironment.PRODUCTION`           |
| `trackingWaitingTime`       | ❌       | `0`          | Time in seconds to wait before tracking starts automatically            |
| `startTrackerAutomatically` | ❌       | `true`       | Whether to start tracking automatically                                 |
| `customDeviceId`            | ❌       | `auto`       | Provide your own device ID                                              |
| `defaultTracker`            | ❌       | -            | Optional tracker name                                                   |
| `logLevel`                  | ❌       | `INFO`       | Logging level (`WTLogLevel.DEBUG` / `INFO` / `WARN` / `ERROR`)          |
| `deeplinkEnabled`           | ❌       | `true`       | Whether to enable deep link tracking and handling                       |
| `screenTrackingConfig`      | ❌       | `{}`         | Auto screen tracking options (see [Screen Tracking](#-screen-tracking)) |

---

## 📺 Screen Tracking

WiseTrack tracks screen views in two complementary ways:

1. **Automatic** — URL changes (history) and native `<dialog>` opens are tracked out of the box.
2. **Manual** — call `trackScreen(...)` for views that don't change the URL (in‑app modals, tabs, wizard steps, virtualized routes, etc.).

Both modes can run together. The SDK deduplicates same‑URL events within a short window so a manual call followed by an auto event for the same URL won't double‑count.

### Quick Start (defaults)

```typescript
await WiseTrack.instance.init({
  appToken: "YOUR_APP_TOKEN",
  clientSecret: "YOUR_CLIENT_SECRET",
  appVersion: "1.0.0",
  appFrameWork: "React",
  // screenTrackingConfig omitted → all auto tracking enabled
});
```

### `screenTrackingConfig` Options

| Key                      | Default | Description                                                                                            |
| ------------------------ | ------- | ------------------------------------------------------------------------------------------------------ |
| `autoTrackScreens`       | `true`  | Auto‑track URL changes (history API + hashchange + initial load).                                      |
| `autoTrackDialogs`       | `true`  | Auto‑track native `<dialog>` opens (`show()` / `showModal()`) as `modal`.                              |
| `excludedScreenPaths`    | `[]`    | Exact paths or path prefixes (matched as `path === ep \|\| path.startsWith(ep + "/")`) to skip.       |
| `excludedScreenPatterns` | `[]`    | RegExp patterns matched against `url.pathname` to skip.                                                |
| `sensitiveQueryParams`   | `[]`    | Query keys stripped from screen URL/params (merged with built‑in blocklist).                           |
| `deduplicationWindowMs`  | `100`   | Window in ms to dedupe identical screen URLs.                                                          |
### Manual Tracking

```typescript
// Simple
await WiseTrack.instance.trackScreen({ name: "checkout" });

// With type, displayName, and params
await WiseTrack.instance.trackScreen({
  name: "product_details",
  type: "other",
  displayName: "Product Details",
  params: {
    product_id: "p-123",
    category: "shoes",
  },
});
```

`WTScreenType` values: `other` (manual/default), `page` (URL navigation), `router` (framework router), `iframe`, `dialog`.

### Customizing Auto‑Tracked Screens

Use `addScreenDataProvider` to map URL patterns to custom screen data. Call it after `init()`. The callback receives the full `URL` object and the `RegExpExecArray` — use capture groups to extract dynamic segments (IDs, slugs, etc.). Patterns are tested in insertion order; first match wins. Return `null`/`undefined` to keep all defaults.

```typescript
import { WiseTrack } from "wisetrack";

await WiseTrack.instance.init({ /* ... */ });

// Capture product ID from path → forward as param
WiseTrack.instance.addScreenDataProvider(
  /^\/products\/(\w+)/,
  (_url, match) => ({
    name: "product_detail",
    displayName: "Product Detail",
    params: { product_id: match[1] },
  }),
);

// Capture order ID
WiseTrack.instance.addScreenDataProvider(
  /^\/orders\/(\w+)/,
  (_url, match) => ({
    name: "order_detail",
    displayName: "Order Detail",
    params: { order_id: match[1] },
  }),
);
```

`WTScreenOverride` fields — all optional; omitted fields fall back to defaults (`document.title` for `displayName`, full URL path for `name`, query params for `params`):

| Field         | Type                     | Description                                       |
| ------------- | ------------------------ | ------------------------------------------------- |
| `name`        | `string`                 | Overrides the auto-extracted screen name.         |
| `displayName` | `string`                 | Overrides the default `document.title` label.     |
| `params`      | `Record<string, WTParam>`| Merged on top of auto-extracted query params.     |

### Excluding Routes

```typescript
screenTrackingConfig: {
  excludedScreenPaths: ["/admin", "/internal"],          // exact or prefix (with "/")
  excludedScreenPatterns: [/^\/debug(\/|$)/, /\/health/], // regex on pathname
},
```

### Native `<dialog>` Auto‑Tracking

The SDK patches `HTMLDialogElement.prototype.show` / `showModal` and emits a screen with `type: "modal"`. The dialog's `id`, `aria-labelledby`, or `aria-label` is used to derive `name` and `displayName`.

```html
<!-- Tracked: name = "dialog:checkout-confirm" -->
<dialog id="checkout-confirm">...</dialog>

<!-- Tracked: name = "dialog:Are you sure?" (from aria-label) -->
<dialog aria-label="Are you sure?">...</dialog>

<!-- Skipped via opt-out attribute -->
<dialog data-wt-no-track>...</dialog>
```

To disable dialog tracking entirely:

```typescript
screenTrackingConfig: {
  autoTrackDialogs: false;
}
```

> **Note:** Only the native HTML5 `<dialog>` element is auto‑tracked. Custom modal components (`<div role="dialog">`, MUI `<Dialog>`, etc.) are **not** auto‑tracked — call `trackScreen({ name: "my_modal", type: "dialog" })` manually when they open.

### Disabling Auto Tracking

```typescript
screenTrackingConfig: {
  autoTrackScreens: false,  // disable URL tracking
  autoTrackDialogs: false,  // disable <dialog> tracking
}
// Then track everything manually with WiseTrack.instance.trackScreen(...)
```

### Sensitive Query Params

Common keys (e.g. `token`, `password`, `api_key`, `session_id`, `email`) are stripped by default from both the screen URL and the auto‑extracted params. Add your own:

```typescript
screenTrackingConfig: {
  sensitiveQueryParams: ["auth_token", "user_email"],
}
```

---

## 🗺️ User Journey

This section shows end‑to‑end recipes per framework: how to **initialize**, what auto‑tracking covers, and where to add **manual** `trackScreen` calls for views the SDK can't see (SPA modals, tabs, virtualized routes, custom modal libraries, etc.).

### Vanilla JS / HTML

Auto‑tracking covers everything URL‑based out of the box. Use manual calls for in‑page state that doesn't update the URL.

```html
<script src="https://cdn.jsdelivr.net/npm/wisetrack/dist/cdn/sdk.bundle.min.js"></script>
<script>
  WiseTrackSDK.WiseTrack.instance.init({
    appToken: "YOUR_APP_TOKEN",
    clientSecret: "YOUR_CLIENT_SECRET",
    appVersion: "1.0.0",
    appFrameWork: "native",
  });

  // Manual: tab switch with no URL change
  document.querySelector("#tab-billing").addEventListener("click", () => {
    WiseTrackSDK.WiseTrack.instance.trackScreen({
      name: "settings_billing",
      type: "other",
      displayName: "Billing",
    });
  });
</script>
```

### React (no router)

```tsx
import { useEffect } from "react";
import { WiseTrack } from "wisetrack";

useEffect(() => {
  WiseTrack.instance.init({
    appToken: "...",
    clientSecret: "...",
    appVersion: "1.0.0",
    appFrameWork: "React",
  });
}, []);

// In a custom modal component (NOT a native <dialog>):
useEffect(() => {
  if (open) {
    WiseTrack.instance.trackScreen({
      name: "upsell_modal",
      type: "dialog",
      displayName: "Upsell",
    });
  }
}, [open]);
```

### React + React Router

`pushState` / `replaceState` are patched, so route changes auto‑track. To set `type: "router"` explicitly, track manually on location change and disable URL auto‑tracking.

```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { WiseTrack } from "wisetrack";

// Option A: Keep auto-tracking ON (recommended). Use addScreenDataProvider for nice names.
await WiseTrack.instance.init({ /* ... */ });

WiseTrack.instance.addScreenDataProvider(
  /^\/orders\/(\d+)$/,
  (_url, match) => ({ name: "order_details", params: { order_id: match[1] } }),
);

// Option B: Manual control
WiseTrack.instance.init({
  // ...
  screenTrackingConfig: { autoTrackScreens: false },
});

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    WiseTrack.instance.trackScreen({
      name: location.صpathname,
      type: "router",
      displayName: document.title,
    });
  }, [location.pathname]);
  return null;
}
```

### Next.js (App Router)

App Router uses `pushState` under the hood, so auto‑tracking works. For server‑rendered initial page loads, the initial `page_load` event fires from the client after hydration.

```tsx
// app/layout.tsx
"use client";
import { useEffect } from "react";
import { WiseTrack } from "wisetrack";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    WiseTrack.instance.init({
      appToken: "...",
      clientSecret: "...",
      appVersion: "1.0.0",
      appFrameWork: "Next.js",
    });
  }, []);
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

For dynamic routes, use `addScreenDataProvider` to collapse `/products/123` and `/products/456` into a single `product_details` screen.

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { WiseTrack } from "wisetrack";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    WiseTrack.instance.init({
      appToken: "...",
      clientSecret: "...",
      appVersion: "1.0.0",
      appFrameWork: "Next.js",
      screenTrackingConfig: { autoTrackScreens: false }, // we'll track via router events
    });

    const handle = (url: string) => {
      WiseTrack.instance.trackScreen({
        name: url,
        type: "router",
        displayName: document.title,
      });
    };
    router.events.on("routeChangeComplete", handle);
    return () => router.events.off("routeChangeComplete", handle);
  }, []);

  return <Component {...pageProps} />;
}
```

### Vue 3 + Vue Router

Vue Router uses the History API, so auto‑tracking already works. To set `type: "router"` explicitly, plug into the router and disable URL auto‑tracking.

```ts
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { WiseTrack } from "wisetrack";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    /* ... */
  ],
});

WiseTrack.instance.init({
  appToken: "...",
  clientSecret: "...",
  appVersion: "1.0.0",
  appFrameWork: "Vue.js",
  screenTrackingConfig: { autoTrackScreens: false },
});

router.afterEach((to) => {
  WiseTrack.instance.trackScreen({
    name: to.fullPath,
    type: "router",
    displayName: (to.meta?.title as string) ?? document.title,
    params: {
      route_name: String(to.name ?? ""),
    },
  });
});
```

### Nuxt 3

```ts
// plugins/wisetrack.client.ts
import { WiseTrack } from "wisetrack";

export default defineNuxtPlugin((nuxtApp) => {
  WiseTrack.instance.init({
    appToken: "...",
    clientSecret: "...",
    appVersion: "1.0.0",
    appFrameWork: "Nuxt",
    screenTrackingConfig: { autoTrackScreens: false },
  });

  const router = useRouter();
  router.afterEach((to) => {
    WiseTrack.instance.trackScreen({
      name: to.fullPath,
      type: "router",
      displayName: document.title,
    });
  });
});
```

### Angular + Angular Router

```typescript
import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { WiseTrack } from "wisetrack";

@Component({ selector: "app-root", templateUrl: "./app.component.html" })
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  async ngOnInit() {
    await WiseTrack.instance.init({
      appToken: "...",
      clientSecret: "...",
      appVersion: "1.0.0",
      appFrameWork: "Angular",
      screenTrackingConfig: { autoTrackScreens: false },
    });

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        WiseTrack.instance.trackScreen({
          name: e.urlAfterRedirects,
          type: "router",
          displayName: document.title,
        });
      });
  }
}
```

### Svelte / SvelteKit

SvelteKit uses the History API, so auto‑tracking covers navigation. For modals or tabs, call `trackScreen` manually.

```ts
// src/routes/+layout.svelte
<script lang="ts">
  import { onMount } from "svelte";
  import { WiseTrack } from "wisetrack";
  onMount(() => {
    WiseTrack.instance.init({
      appToken: "...", clientSecret: "...", appVersion: "1.0.0", appFrameWork: "SvelteKit",
    });
  });
</script>
```

### Hash‑based Routers (older React Router v5 hash, Vue 2 hash, etc.)

`hashchange` is auto‑tracked — no extra wiring needed.

### Modals & Dialogs

| Modal kind                                     | Auto‑tracked?         | What to do                                                                      |
| ---------------------------------------------- | --------------------- | ------------------------------------------------------------------------------- |
| Native `<dialog>` (`.show()` / `.showModal()`) | ✅                    | Set `id` or `aria-label` for a meaningful name. Add `data-wt-no-track` to skip. |
| Custom React/Vue modal (`<div role="dialog">`) | ❌                    | Call `trackScreen({ name: "my_modal", type: "dialog", displayName: "..." })` when it opens.     |
| MUI `<Dialog>`, Headless UI, Radix, Ant Design | ❌                    | Same as above — track manually in the open callback.                            |
| Toasts / snackbars                             | ❌ (and shouldn't be) | Don't track — they're not screens.                                              |

### Tabs, Wizards, Virtual Routes

Anything that changes content without changing the URL is invisible to the auto tracker — track it manually:

```ts
WiseTrack.instance.trackScreen({
  name: "checkout_step_2",
  type: "other",
  displayName: "Shipping",
});
```

### iFrames

Cross‑origin iframes can't be observed from the parent. Initialize the SDK **inside** the iframe document if you control it, then use `type: "iframe"` for clarity:

```ts
WiseTrack.instance.trackScreen({
  name: window.location.pathname,
  type: "iframe",
});
```

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
