"use strict";

const env = process.env.NODE_ENV || "local",
  envConfig = require("./" + env);

const defaultConfig = {
  env: env
};

const mergedConfigs = Object.assign({}, defaultConfig, envConfig);

module.exports = mergedConfigs;