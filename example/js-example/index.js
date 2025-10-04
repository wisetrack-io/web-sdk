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

  const defaultEvent = WiseTrackSDK.WTEvent.defaultEvent("default-event", {
    key1: "value1",
    key2: 123,
    key3: true,
  });
  await WiseTrackSDK.WiseTrack.instance.trackEvent(defaultEvent);
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

  const paramsList = eventParamsField.value.trim().split(",");
  const params = {};
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
    params[keyvalue[0].trim()] = paramValue;
  }

  let customEvent;
  switch (eventTypeField.value.toLowerCase()) {
    case "default":
      customEvent = WiseTrackSDK.WTEvent.defaultEvent(eventName, params);
      break;

    case "revenue":
      customEvent = WiseTrackSDK.WTEvent.revenueEvent(
        eventName,
        100000,
        "IRR",
        params
      );
      break;

    default:
      return;
  }
  console.log(customEvent.toJSON());
  await WiseTrackSDK.WiseTrack.instance.trackEvent(customEvent);
});

setFcmTokenBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  await WiseTrackSDK.WiseTrack.instance.setFCMToken("fcm-token-example");
});

window.addEventListener("load", () => {
  const logContainer = document.getElementById("log-container");

  WiseTrackSDK.WTLogger.addOutputEngine((level, prefix, args) => {
    logContainer.innerHTML += `<p class="log ${level.toLowerCase()}">
    <span class="log-prefix ${level.toLowerCase()}">${prefix}</span> 
    <span class="log-time">${getCurrentTime()}</span> 
    <span>${args.join(" ")}</span>
  </p>
  <div class="log-separator"></div>`;
  });
});

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
