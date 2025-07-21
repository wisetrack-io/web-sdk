import {
  WiseTrack,
  WTEvent,
  WTInitialConfig,
  WTLogEngine,
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
  console.log("hi from init btn");

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

  const defaultEvent = new WTEvent.Default("default-event");
  defaultEvent.addParam("key1", "value1");
  defaultEvent.addParam("key2", 123);
  defaultEvent.addParam("key3", true);
  await WiseTrack.instance.trackEvent(defaultEvent);
});

revenueEventBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const revenueEvent = new WTEvent.Revenue("revenue-event", 100, "USD");
  revenueEvent.addParam("item_id", "item123");
  revenueEvent.addParam("quantity", 2);
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

  let customEvent: WTEvent.Default | WTEvent.Revenue;

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
    customEvent.addParam(keyvalue[0].trim(), paramValue);
  }
  console.log(customEvent.toJSON());
  await WiseTrack.instance.trackEvent(customEvent);
});

setFcmTokenBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  await WiseTrack.instance.setFCMToken("fcm-token-example");
});

window.addEventListener("load", () => {
  const logContainer = document.getElementById(
    "log-container"
  ) as HTMLDivElement;
  const outputEngine = new CustomLogWriter(logContainer);
  WTLogger.addOutputEngine(outputEngine);
});

class CustomLogWriter extends WTLogEngine {
  private logContainer: HTMLDivElement;
  constructor(logContainer: HTMLDivElement) {
    super();
    this.logContainer = logContainer;
  }

  log(level: string, prefix: string, ...args: any[]): void {
    this.logContainer.innerHTML += `<p class="log ${level.toLowerCase()}">
        <span class="log-prefix ${level.toLowerCase()}">${prefix}</span> 
        <span class="log-time">${this.getCurrentTime()}</span> 
        <span>${args.join(" ")}</span>
      </p>
      <div class="log-separator"></div>`;
  }

  private getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
}
