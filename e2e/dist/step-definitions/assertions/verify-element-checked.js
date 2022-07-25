"use strict";

var _cucumber = require("@cucumber/cucumber");

var _waitForBehavior = require("../../support/wait-for-behavior");

var _htmlBehavior = require("../../support/html-behavior");

var _webElementHelper = require("../../support/web-element-helper");

var _logger = require("../../logger");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _cucumber.Then)(/^the "([^"]*)" (?:check box|radio button|switch) should( not)? be checked$/, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(elementKey, negate) {
    var page, globalConfig, elementIdentifier;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = this.screen.page, globalConfig = this.globalConfig;

            _logger.logger.log("the ".concat(elementKey, " check box|radio button should ").concat(negate ? 'not ' : '', "be checked"));

            elementIdentifier = (0, _webElementHelper.getElementLocator)(page, elementKey, globalConfig);
            _context2.next = 5;
            return (0, _waitForBehavior.waitFor)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var elementStable, isElementChecked;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _waitForBehavior.waitForSelector)(page, elementIdentifier);

                    case 2:
                      elementStable = _context.sent;

                      if (!elementStable) {
                        _context.next = 14;
                        break;
                      }

                      _context.next = 6;
                      return (0, _htmlBehavior.elementChecked)(page, elementIdentifier);

                    case 6:
                      isElementChecked = _context.sent;

                      if (!(isElementChecked === !negate)) {
                        _context.next = 11;
                        break;
                      }

                      return _context.abrupt("return", _waitForBehavior.waitForResult.PASS);

                    case 11:
                      return _context.abrupt("return", _waitForBehavior.waitForResult.FAIL);

                    case 12:
                      _context.next = 15;
                      break;

                    case 14:
                      return _context.abrupt("return", _waitForBehavior.waitForResult.ELEMENT_NOT_AVAILABLE);

                    case 15:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })), globalConfig, {
              target: elementKey,
              failureMessage: "\uD83E\uDDE8 Expected ".concat(elementKey, " to ").concat(negate ? 'not ' : '', "be checked \uD83E\uDDE8")
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());