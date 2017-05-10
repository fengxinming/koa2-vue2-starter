'use strict';

const REGEXP = {
  CELLPHONE: /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|0?85[23])[0-9]{8}$/,
  PHONE: /^([0-9]{3,4}(\-\|)?)?[0-9]{7,8}$/,
  EMAIL: /^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$/,
  NUMBER: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}\[\]:";'<>?,.\/]).{6,16}$/,
  INTEGER: /^\d+$/,
  URL: /^([a-zA-Z]+:\/\/)?([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/,
  IDCARD: /^\d{6}(\d{4})(\d{2})(\d{2})\d{3}[0-9xX]$/i,
  CHINESE_NAME: /^[\u4e00-\u9fa5a-z\/]{1,30}$/i,
  ENGLISH_NAME: /^[a-z][a-z ]+(\s*\/\s*[a-z ]+)?$/i,
  NUMBER_OR_CHAR: /^[a-z0-9A-Z]+$/
};

function validate(text, regexp, isTrim) {
  if (isTrim) {
    text = text === null || typeof text === 'undefined' ? '' : (text + '').trim();
  }
  return regexp.test(text);
}

const _ = {
  REGEXP: REGEXP,

  isIdcard: (text, isTrim) => validate(text, _.REGEXP.IDCARD, isTrim),

  isCellphone: (text, isTrim) => validate(text, _.REGEXP.CELLPHONE, isTrim),

  isPhone: (text, isTrim) => validate(text, _.REGEXP.PHONE, isTrim),

  isEmail: (text, isTrim) => validate(text, _.REGEXP.EMAIL, isTrim),

  isNumber: (text, isTrim) => validate(text, _.REGEXP.NUMBER, isTrim),

  isPassword: (text, isTrim) => validate(text, _.REGEXP.PASSWORD, isTrim),

  isInteger: (text, isTrim) => validate(text, _.REGEXP.INTEGER, isTrim),

  isEmpty: (text) => text === null || typeof text === 'undefined' ? true : !(text + '').trim(),

  isUrl: (text, isTrim) => validate(text, _.REGEXP.URL, isTrim),

  isNumberOrChar: (text, isTrim) => validate(text, _.REGEXP.NUMBER_OR_CHAR, isTrim),

  isChineseName: (text, isTrim) => validate(text, _.REGEXP.CHINESE_NAME, isTrim),

  isEnglishName: (text, isTrim) => validate(text, _.REGEXP.ENGLISH_NAME, isTrim)

};

export default _;
