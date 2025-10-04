import {
  WiseTrack,
  WTEvent,
  WTInitialConfig,
  WTLogger,
  WTLogLevel,
} from "wisetrack";

const logLevelField = document.getElementById("log-level") as HTMLSelectElement;
const appTokenField = document.getElementById("app-token") as HTMLInputElement;
const initBtn = document.getElementById("init-sdk") as HTMLButtonElement;
const stopBtn = document.getElementById("stop-sdk") as HTMLButtonElement;
const setFcmTokenBtn = document.getElementById(
  "fcm-token"
) as HTMLButtonElement;
const resetBtn = document.getElementById("reset-sdk") as HTMLLinkElement;
const defaultEventBtn = document.getElementById(
  "default-event"
) as HTMLButtonElement;
const revenueEventBtn = document.getElementById(
  "revenue-event"
) as HTMLButtonElement;
const createCustomEventBtn = document.getElementById(
  "create-event"
) as HTMLButtonElement;

initBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const appToken = appTokenField.value;
  const logLevel = logLevelField.value as WTLogLevel;

  const initialConfig: WTInitialConfig = {
    appToken: appToken ?? "rMN5ZCwpOzY7",
    appFrameWork: "native",
    appVersion: "1.0.0",
    logLevel: logLevel ?? WTLogLevel.DEBUG,
    startTrackerAutomatically: true,
    // trackingWaitingTime: 3,
  };
  await WiseTrack.instance.init(initialConfig);

  initBtn.hidden = true;
  stopBtn.hidden = false;
});

stopBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  await WiseTrack.instance.stopTracking();

  initBtn.hidden = false;
  stopBtn.hidden = true;
});

resetBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  WiseTrack.instance.flush();
});

defaultEventBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const defaultEvent = WTEvent.defaultEvent("default-event", {
    key1: "value1",
    key2: 123,
    key3: true,
  });
  await WiseTrack.instance.trackEvent(defaultEvent);
});

revenueEventBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const revenueEvent = WTEvent.revenueEvent("revenue-event", 100000, "IRR", {
    key1: "value1",
    key2: 123,
    key3: true,
  });
  await WiseTrack.instance.trackEvent(revenueEvent);
});

createCustomEventBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const eventNameField = document.getElementById(
    "event-name"
  ) as HTMLInputElement;

  const eventTypeField = document.getElementById(
    "event-type"
  ) as HTMLSelectElement;

  const eventParamsField = document.getElementById(
    "event-params"
  ) as HTMLTextAreaElement;

  const eventName = eventNameField.value.trim();
  if (!eventName || eventName.length === 0) {
    console.warn("Please Enter Event Name");
    return;
  }

  const paramsList = eventParamsField.value.trim().split(",");
  const params: Record<string, any> = {};
  for (let param of paramsList) {
    if (!param.includes("=")) continue;
    const keyvalue = param.trim().split("=");
    const value = keyvalue[1].trim();
    let paramValue: any;

    if (!Number.isNaN(Number(value))) {
      paramValue = Number(value);
    } else if (value === "true" || value === "false") {
      paramValue = Boolean(value);
    } else {
      paramValue = value;
    }
    params[keyvalue[0].trim()] = paramValue;
  }

  let customEvent;
  switch (eventTypeField.value.toLowerCase()) {
    case "default":
      customEvent = WTEvent.defaultEvent(eventName, params);
      break;

    case "revenue":
      customEvent = WTEvent.revenueEvent(eventName, 100000, "IRR", params);
      break;

    default:
      return;
  }

  console.log(customEvent);
  await WiseTrack.instance.trackEvent(customEvent);
});

setFcmTokenBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  WiseTrack.instance.setFCMToken("fcm-token-example");
});

window.addEventListener("load", () => {
  const logContainer = document.getElementById("log-container");
  WTLogger.addOutputEngine((level: string, prefix: string, ...args: any[]) => {
    console.log("Log engine called", level, prefix, args);
    logContainer!.innerHTML += `<p class="log ${level.toLowerCase()}">
    <span class="log-prefix ${level.toLowerCase()}">${prefix}</span> 
    <span class="log-time">${getCurrentTime()}</span> 
    <span>${args.join(" ")}</span>
  </p>
  <div class="log-separator"></div>`;
  });
});

function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
