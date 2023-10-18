const tinyid = require("tinyid");
const generator = tinyid({
  wheel: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
});

const COUNTER_START = 0;
const COUNTER_END = 1e3;
const COUNTER_PADDING = COUNTER_END;

let counter = COUNTER_START;
let generatedPerTimeFrame = 0;
let lastCall;

const gen = module.exports = () => {

  counter++;
  generatedPerTimeFrame++;
  const now = Date.now();

  if (now !== lastCall) {
    lastCall = now;
    generatedPerTimeFrame = 0;
  }

  if (counter >= COUNTER_END) {
    counter = COUNTER_START;
    // console.error('rollover', Date.now());
  }

  const uniqueTime = (now * COUNTER_PADDING) + counter;

  return generator.encode(uniqueTime);
};

const safe = module.exports.safe = async () => {
  const now = Date.now();
  if (lastCall === now && generatedPerTimeFrame === COUNTER_END - 1) {
    await new Promise(_ => setTimeout(_, 1));
    return await safe();
  }

  return gen();
};