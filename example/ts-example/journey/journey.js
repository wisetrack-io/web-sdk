var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import { ResourceWrapper, WiseTrack, WTLogger, WTLogLevel, } from "wisetrack";
// ── SDK init ──────────────────────────────────────────────────────────────────
const initBtn = document.getElementById("init-sdk-btn");
const stopBtn = document.getElementById("stop-sdk-btn");
const sdkStrip = document.getElementById("sdk-strip");
const sdkStripOk = document.getElementById("sdk-strip-ok");
initBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
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
    yield WiseTrack.instance.init(config);
    WiseTrack.instance.addScreenDataProvider(/^\/journey\/products\/(\w+)/, (_url, match) => ({
        name: "product_details",
        displayName: "Product Detail",
        params: { product_id: match[1] },
    }));
    WiseTrack.instance.addScreenDataProvider(/^\/journey\/orders\/(\w+)/, (_url, match) => ({
        name: "order_detail",
        displayName: "Order Detail",
        params: { order_id: match[1] },
    }));
    sdkStrip.style.display = "none";
    sdkStripOk.style.display = "flex";
}));
stopBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield WiseTrack.instance.stopTracking();
    sdkStrip.style.display = "flex";
    sdkStripOk.style.display = "none";
}));
// ── Page routing ──────────────────────────────────────────────────────────────
const pages = document.querySelectorAll(".page");
const sidebarBtns = document.querySelectorAll(".sidebar-btn");
function showPage(pageId) {
    pages.forEach((p) => p.classList.remove("active"));
    sidebarBtns.forEach((b) => b.classList.remove("active"));
    const target = document.getElementById(`page-${pageId}`);
    if (target)
        target.classList.add("active");
    const activeBtn = document.querySelector(`.sidebar-btn[data-page="${pageId}"]`);
    if (activeBtn)
        activeBtn.classList.add("active");
}
sidebarBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const pageId = btn.dataset.page;
        const path = btn.dataset.path;
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
    const state = e.state;
    if (state === null || state === void 0 ? void 0 : state.page) {
        showPage(state.page);
    }
});
// ── Settings tabs (manual tracking) ──────────────────────────────────────────
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");
function trackSettingsTab(tabId) {
    WiseTrack.instance.trackScreen({
        name: `settings_${tabId}`,
        displayName: `Settings — ${tabId}`,
    });
}
tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        var _a;
        const tabId = btn.dataset.tab;
        tabBtns.forEach((b) => b.classList.remove("active"));
        tabPanes.forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        (_a = document.getElementById(`tab-${tabId}`)) === null || _a === void 0 ? void 0 : _a.classList.add("active");
        // URL doesn't change — manual trackScreen required
        trackSettingsTab(tabId);
    });
});
// ── Dialogs ───────────────────────────────────────────────────────────────────
const promoDialog = document.getElementById("promo-dialog");
const confirmDialog = document.getElementById("confirm-dialog");
(_a = document
    .getElementById("open-promo-dialog")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => promoDialog.showModal());
(_b = document
    .getElementById("open-confirm-dialog")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => confirmDialog.showModal());
(_c = document.getElementById("confirm-order-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    var _a;
    confirmDialog.close();
    (_a = document
        .querySelector('[data-page="confirmation"]')) === null || _a === void 0 ? void 0 : _a.click();
});
// ── Logger ────────────────────────────────────────────────────────────────────
window.addEventListener("load", () => {
    const logContainer = document.getElementById("log-container");
    WTLogger.addOutputEngine((level, prefix, ...args) => {
        const time = new Date().toLocaleTimeString();
        logContainer.innerHTML += `<p class="log ${level.toLowerCase()}">
      <span class="log-prefix ${level.toLowerCase()}">${prefix}</span>
      <span class="log-time">${time}</span>
      <span>${args.join(" ")}</span>
    </p><div class="log-separator"></div>`;
        logContainer.scrollTop = logContainer.scrollHeight;
    });
});
