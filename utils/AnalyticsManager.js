export class AnalyticsManager {
  constructor() {
    this.enabled = true;
    this.interval = null;
  }

  start() {
    if (this.interval) return;

    this.send("session_start");

    this.interval = setInterval(() => {
      this.send("heartbeat");
    }, 7000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    this.send("session_end");
  }

  track(event, data = {}) {
    this.send(event, data);
  }

  send(event, data = {}) {
    if (!this.enabled) return;

    //replaced with console log so i wont have console errors when testing analytics without a backend
    console.log("Analytics event:", event, data);
    // fetch("https://my-api.com/analytics", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     event,
    //     data,
    //     ts: Date.now(),
    //   }),
    // }).catch(() => {});
  }
}
