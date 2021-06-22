/*!
 *  idcard-validator v0.1.0
 *  (c) 2020-2021 chenwuai
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IDCardValidator = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var isType = function isType(obj, type) {
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };
    var isString = function isString(val) {
      return isType(val, 'String');
    };
    var isNumber = function isNumber(val) {
      return isType(val, 'Number');
    };
    var isLeapYear = function isLeapYear(year) {
      return isNumber(year) && (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0);
    };

    var numberRatio = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var ratioValue = 11;
    var codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var idcardLength = 18;
    var isValid = function isValid(idcard) {
      if (!isString(idcard) || !/^[0,9]{17}([0,9]|[x,X])$/.test(idcard)) {
        return false;
      }

      if (idcard.length !== idcardLength) {
        return false;
      }

      var isValidCode = checkCode(idcard);

      if (!isValidCode) {
        return false;
      }

      var birthday = calculateBirthday(idcard);

      if (birthday === false) {
        return false;
      }

      return true;
    };
    var calculateIDCard = function calculateIDCard(idcard) {
      if (!isString(idcard) || !/^[0,9]{17}([0,9]|[x,X])$/.test(idcard)) {
        return false;
      }

      if (idcard.length !== idcardLength) {
        return false;
      }

      var isValidCode = checkCode(idcard);

      if (!isValidCode) {
        return false;
      }

      var code = idcard.substr(-1, 1);
      var birthday = calculateBirthday(idcard);

      if (birthday === false) {
        return false;
      }

      var sexCode = idcard.substr(-2, 1);
      var sex = Number(sexCode) % 2 ? 1 : 2;
      return __assign(__assign({}, birthday), {
        code: code,
        sex: sex
      });
    };
    var calculateCode = function calculateCode(idcard) {
      if (!isString(idcard) || !/^[0,9]{17}/.test(idcard)) {
        return false;
      }

      var head17Str = idcard.slice(0, 17);
      var head17List = head17Str.split('');
      var totalCount = 0;

      for (var index = 0; index < head17List.length; index++) {
        totalCount += Number(head17List[index]) * numberRatio[index];
      }

      var code = codeMap[totalCount % ratioValue];
      return code.toUpperCase();
    };

    var checkCode = function checkCode(idcard) {
      var lastStr = idcard.slice(-1, 1);
      lastStr = lastStr.toUpperCase();
      var code = calculateCode(idcard);
      return code === lastStr;
    };

    var calculateBirthday = function calculateBirthday(idcard) {
      if (!isString(idcard) || !/^[0,9]{14}/.test(idcard)) {
        return false;
      }

      var birthday = idcard.substr(6, 8);
      var y = birthday.slice(0, 4);
      var m = birthday.slice(4, 6);
      var d = birthday.slice(6, 8);
      var year = Number(y);
      var month = Number(m);
      var date = Number(d);

      if (checkBirthday(year, month, date)) {
        return {
          year: year,
          month: month,
          date: date,
          birthday: year + "-" + month + "-" + date
        };
      } else {
        return false;
      }
    };

    var checkBirthday = function checkBirthday(year, month, date) {
      if (!isNumber(year) || isNumber(month) || isNumber(date)) {
        return false;
      }

      if (year > new Date().getFullYear()) {
        return false;
      }

      var febDaysNum = 28;

      if (isLeapYear(year)) {
        febDaysNum = 29;
      }

      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return date >= 1 && date <= 31;

        case 4:
        case 6:
        case 9:
        case 11:
          return date >= 1 && date <= 30;

        case 2:
          return date >= 1 && date <= febDaysNum;

        default:
          return false;
      }
    };

    exports.calculateCode = calculateCode;
    exports.calculateIDCard = calculateIDCard;
    exports.isValid = isValid;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=idcard-validator.umd.js.map
