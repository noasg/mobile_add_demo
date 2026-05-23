export class AnalyticsManager {
  constructor() {
    this.enabled = true;
    this.interval = null;
  }

  /**
   * Starts analytics session
   * and heartbeat tracking.
   */
  start() {
    if (this.interval) return;

    this.send("session_start");

    // Send heartbeat event every 7 seconds
    this.interval = setInterval(() => {
      this.send("heartbeat");
    }, 7000);
  }

  /**
   * Stops analytics session
   * and clears heartbeat tracking.
   */
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

  /**
   * Sends analytics payload.
   */
  send(event, data = {}) {
    if (!this.enabled) return;

    // console.log("Analytics event:", event, data);
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
