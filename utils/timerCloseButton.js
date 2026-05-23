export function timerCloseButton(app, target, seconds = 30) {
  let elapsed = 0;

  const ticker = (delta) => {
    elapsed += delta;

    const time = elapsed / 60;

    if (time >= seconds) {
      target.visible = true;

      app.ticker.remove(ticker);
    }

    // console.log("elapsed", time);
  };

  app.ticker.add(ticker);

  return ticker;
}
