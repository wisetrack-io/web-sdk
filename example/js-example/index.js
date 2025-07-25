const logLevelField = document.getElementById("log-level");
const appTokenField = document.getElementById("app-token");
const initBtn = document.getElementById("init-sdk");
const stopBtn = document.getElementById("stop-sdk");
const setFcmTokenBtn = document.getElementById("fcm-token");
const resetBtn = document.getElementById("reset-sdk");
const defaultEventBtn = document.getElementById("default-event");
const revenueEventBtn = document.getElementById("revenue-event");
const createCustomEventBtn = document.getElementById("create-event");

initBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const appToken = appTokenField.value;
  const logLevel = logLevelField.value;

  const initialConfig = {
    appToken: appToken ?? "rMN5ZCwpOzY7",
    appFrameWork: "native",
    appVersion: "1.0.0",
    logLevel: logLevel ?? "debug",
    startTrackerAutomatically: true,
    // trackingWaitingTime: 3,
  };
  await WiseTrackSDK.WiseTrack.instance.init(initialConfig);

  initBtn.hidden = true;
  stopBtn.hidden = false;
});

stopBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  await WiseTrackSDK.WiseTrack.instance.stopTracking();

  initBtn.hidden = false;
  stopBtn.hidden = true;
});

resetBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  WiseTrackSDK.WiseTrack.instance.flush();
});

defaultEventBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const defaultEvent = new WTEvent.Default("default-event");
  defaultEvent.addParam("key1", "value1");
  defaultEvent.addParam("key2", 123);
  defaultEvent.addParam("key3", true);
  await WiseTrackSDK.WiseTrack.instance.trackEvent(defaultEvent);
});

revenueEventBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const revenueEvent = new WTEvent.Revenue("revenue-event", 100, "USD");
  revenueEvent.addParam("item_id", "item123");
  revenueEvent.addParam("quantity", 2);
  await WiseTrackSDK.WiseTrack.instance.trackEvent(revenueEvent);
});

createCustomEventBtn.addEventListener("click", async (e) => {
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
    if (!param.includes("=")) continue;
    const keyvalue = param.trim().split("=");
    const value = keyvalue[1].trim();
    let paramValue;

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
  await WiseTrackSDK.WiseTrack.instance.trackEvent(customEvent);
});

setFcmTokenBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  await WiseTrackSDK.WiseTrack.instance.setFCMToken("fcm-token-example");
});

class CustomLogWriter extends WiseTrackSDK.WTLogEngine {
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

window.addEventListener("load", () => {
  const logContainer = document.getElementById("log-container");
  const outputEngine = new CustomLogWriter(logContainer);
  WiseTrackSDK.WTLogger.addOutputEngine(outputEngine);
});
