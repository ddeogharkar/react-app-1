"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJsonFromFile = exports.envNumber = exports.env = void 0;

var getJsonFromFile = function getJsonFromFile(path) {
  //console.log("process curr work dir :",process.cwd() + " path : ",path)
  return require("".concat(process.cwd()).concat(path));
};

exports.getJsonFromFile = getJsonFromFile;

var env = function env(key) {
  var value = process.env[key]; //console.log("value ",value)

  if (!value) {
    throw Error("No environment variable found for ".concat(key));
  }

  return value;
};

exports.env = env;

var envNumber = function envNumber(key) {
  //console.log("env number ", Number(env(key)))
  return Number(env(key));
};

exports.envNumber = envNumber;