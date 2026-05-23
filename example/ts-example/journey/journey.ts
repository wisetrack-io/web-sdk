import {
  ResourceWrapper,
  WiseTrack,
  WTInitialConfig,
  WTLogger,
  WTLogLevel,
} from "wisetrack";

// ── SDK init ──────────────────────────────────────────────────────────────────

const initBtn = document.getElementById("init-sdk-btn") as HTMLButtonElement;
const stopBtn = document.getElementById("stop-sdk-btn") as HTMLButtonElement;
const sdkStrip = document.getElementById("sdk-strip") as HTMLDivElement;
const sdkStripOk = document.getElementById("sdk-strip-ok") as HTMLDivElement;

initBtn.addEventListener("click", async () => {
  const config: WTInitialConfig = {
    appToken: "rMN5ZCwpOzY7",
    clientSecret: "01965797-1665-8d33-7d09-c7486afbd975",
    appFrameWork: "native",
    appVersion: "1.0.0",
    logLevel: WTLogLevel.DEBUG,
    screenTrackingConfig: {
      autoTrackScreens: true,
      autoTrackDialogs: true,
      excludedScreenPaths: ["/journey/admin"],
    },
  };

  await WiseTrack.instance.init(config);

  WiseTrack.instance.addScreenDataProvider(
    /^\/journey\/products\/(\w+)/,
    (_url, match) => ({
      name: "product_details",
      displayName: "Product Detail",
      params: { product_id: match[1] },
    }),
  );
  WiseTrack.instance.addScreenDataProvider(
    /^\/journey\/orders\/(\w+)/,
    (_url, match) => ({
      name: "order_detail",
      displayName: "Order Detail",
      params: { order_id: match[1] },
    }),
  );

  sdkStrip.style.display = "none";
  sdkStripOk.style.display = "flex";
});

stopBtn.addEventListener("click", async () => {
  await WiseTrack.instance.stopTracking();
  sdkStrip.style.display = "flex";
  sdkStripOk.style.display = "none";
});

// ── Page routing ──────────────────────────────────────────────────────────────

const pages = document.querySelectorAll<HTMLDivElement>(".page");
const sidebarBtns =
  document.querySelectorAll<HTMLButtonElement>(".sidebar-btn");

function showPage(pageId: string) {
  pages.forEach((p) => p.classList.remove("active"));
  sidebarBtns.forEach((b) => b.classList.remove("active"));

  const target = document.getElementById(`page-${pageId}`);
  if (target) target.classList.add("active");

  const activeBtn = document.querySelector<HTMLButtonElement>(
    `.sidebar-btn[data-page="${pageId}"]`,
  );
  if (activeBtn) activeBtn.classList.add("active");
}

sidebarBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const pageId = btn.dataset.page!;
    const path = btn.dataset.path!;

    // Settings tabs need to be handled separately on page activation
    showPage(pageId);

    // pushState — SDK auto-tracks this (unless excluded)
    history.pushState({ page: pageId }, "", path);

    // Manual trackScreen for admin (excluded from auto) to demonstrate diff
    // Settings tab entry — track the default "profile" tab
    if (pageId === "settings") {
      trackSettingsTab("profile");
    }
  });
});

// Browser back/forward
window.addEventListener("popstate", (e) => {
  const state = e.state as { page?: string } | null;
  if (state?.page) {
    showPage(state.page);
  }
});

// ── Settings tabs (manual tracking) ──────────────────────────────────────────

const tabBtns = document.querySelectorAll<HTMLButtonElement>(".tab-btn");
const tabPanes = document.querySelectorAll<HTMLDivElement>(".tab-pane");

function trackSettingsTab(tabId: string) {
  WiseTrack.instance.trackScreen({
    name: `settings_${tabId}`,
    displayName: `Settings — ${tabId}`,
  });
}

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.dataset.tab!;

    tabBtns.forEach((b) => b.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(`tab-${tabId}`)?.classList.add("active");

    // URL doesn't change — manual trackScreen required
    trackSettingsTab(tabId);
  });
});

// ── Dialogs ───────────────────────────────────────────────────────────────────

const promoDialog = document.getElementById(
  "promo-dialog",
) as HTMLDialogElement;
const confirmDialog = document.getElementById(
  "confirm-dialog",
) as HTMLDialogElement;

document
  .getElementById("open-promo-dialog")
  ?.addEventListener("click", () => promoDialog.showModal());

document
  .getElementById("open-confirm-dialog")
  ?.addEventListener("click", () => confirmDialog.showModal());

document.getElementById("confirm-order-btn")?.addEventListener("click", () => {
  confirmDialog.close();
  document
    .querySelector<HTMLButtonElement>('[data-page="confirmation"]')
    ?.click();
});

// ── Logger ────────────────────────────────────────────────────────────────────

window.addEventListener("load", () => {
  const logContainer = document.getElementById("log-container")!;
  WTLogger.addOutputEngine((level: string, prefix: string, ...args: any[]) => {
    const time = new Date().toLocaleTimeString();
    logContainer.innerHTML += `<p class="log ${level.toLowerCase()}">
      <span class="log-prefix ${level.toLowerCase()}">${prefix}</span>
      <span class="log-time">${time}</span>
      <span>${args.join(" ")}</span>
    </p><div class="log-separator"></div>`;
    logContainer.scrollTop = logContainer.scrollHeight;
  });
});
