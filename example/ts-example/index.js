var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WiseTrack, WTEvent, WTLogEngine, WTLogger, WTLogLevel, } from "wisetrack";
const logLevelField = document.getElementById("log-level");
const appTokenField = document.getElementById("app-token");
const initBtn = document.getElementById("init-sdk");
const stopBtn = document.getElementById("stop-sdk");
const setFcmTokenBtn = document.getElementById("fcm-token");
const resetBtn = document.getElementById("reset-sdk");
const defaultEventBtn = document.getElementById("default-event");
const revenueEventBtn = document.getElementById("revenue-event");
const createCustomEventBtn = document.getElementById("create-event");
initBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi from init btn");
    e.preventDefault();
    const appToken = appTokenField.value;
    const logLevel = logLevelField.value;
    const initialConfig = {
        appToken: appToken !== null && appToken !== void 0 ? appToken : "rMN5ZCwpOzY7",
        appFrameWork: "native",
        appVersion: "1.0.0",
        logLevel: logLevel !== null && logLevel !== void 0 ? logLevel : WTLogLevel.DEBUG,
        startTrackerAutomatically: true,
        // trackingWaitingTime: 3,
    };
    yield WiseTrack.instance.init(initialConfig);
    initBtn.hidden = true;
    stopBtn.hidden = false;
}));
stopBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    yield WiseTrack.instance.stopTracking();
    initBtn.hidden = false;
    stopBtn.hidden = true;
}));
resetBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    WiseTrack.instance.flush();
}));
defaultEventBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const defaultEvent = new WTEvent.Default("default-event");
    defaultEvent.addParam("key1", "value1");
    defaultEvent.addParam("key2", 123);
    defaultEvent.addParam("key3", true);
    yield WiseTrack.instance.trackEvent(defaultEvent);
}));
revenueEventBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const revenueEvent = new WTEvent.Revenue("revenue-event", 100, "USD");
    revenueEvent.addParam("item_id", "item123");
    revenueEvent.addParam("quantity", 2);
    yield WiseTrack.instance.trackEvent(revenueEvent);
}));
createCustomEventBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const eventNameField = document.getElementById("event-name");
    const eventTypeField = document.getElementById("event-type");
    const eventParamsField = document.getElementById("event-params");
    const eventName = eventNameField.value.trim();
    if (!eventName || eventName.length === 0) {
        console.warn("Please Enter Event Name");
        return;
    }
    let customEvent;
    switch (eventTypeField.value.toLowerCase()) {
        case "default":
            customEvent = new WTEvent.Default(eventName);
            break;
        case "revenue":
            customEvent = new WTEvent.Revenue(eventName, 100000, "IRR");
            break;
        default:
            return;
    }
    const paramsList = eventParamsField.value.trim().split(",");
    for (let param of paramsList) {
        if (!param.includes("="))
            continue;
        const keyvalue = param.trim().split("=");
        const value = keyvalue[1].trim();
        let paramValue;
        if (!Number.isNaN(Number(value))) {
            paramValue = Number(value);
        }
        else if (value === "true" || value === "false") {
            paramValue = Boolean(value);
        }
        else {
            paramValue = value;
        }
        customEvent.addParam(keyvalue[0].trim(), paramValue);
    }
    console.log(customEvent.toJSON());
    yield WiseTrack.instance.trackEvent(customEvent);
}));
setFcmTokenBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    yield WiseTrack.instance.setFCMToken("fcm-token-example");
}));
window.addEventListener("load", () => {
    const logContainer = document.getElementById("log-container");
    const outputEngine = new CustomLogWriter(logContainer);
    WTLogger.addOutputEngine(outputEngine);
});
class CustomLogWriter extends WTLogEngine {
    constructor(logContainer) {
        super();
        this.logContainer = logContainer;
    }
    log(level, prefix, ...args) {
        this.logContainer.innerHTML += `<p class="log ${level.toLowerCase()}">
        <span class="log-prefix ${level.toLowerCase()}">${prefix}</span> 
        <span class="log-time">${this.getCurrentTime()}</span> 
        <span>${args.join(" ")}</span>
      </p>
      <div class="log-separator"></div>`;
    }
    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }
}
