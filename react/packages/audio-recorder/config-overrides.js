module.exports = function override(config, env) {
  config.module.rules.push({
      test: /opus-media-recorder\/encoderWorker\.js$/,
      use: [{ loader: 'worker-loader' }]
    })

  config.module.rules.push({
      test: /opus-media-recorder\/.*\.wasm$/,
      type: "javascript/auto",
      use: [{ loader: 'file-loader' }]
    })

    config.output = Object.assign({}, config.output, {
      globalObject: "this"
    })
//      console.log(JSON.stringify(config , null, 2));
//      throw new Error();
//
//
  return config;
}
