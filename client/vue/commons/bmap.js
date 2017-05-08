'use strict';
const BMAP_SCRIPT_SRC = '//api.map.baidu.com/api?v=2.0&ak=Tpl1p0frE1ovMWw47hP8VHFjRMcGP5Vr&s=1';
const JSONP_CALLBACK_NAME = 'BMA_CALLBACK';
function loadBMap() {
  return new Promise((resolve, reject) => {
    if (window.BMap) {
      resolve(window.BMap);
      return;
    }
    const script = document.createElement('script');
    const fnName = JSONP_CALLBACK_NAME + ((new Date()).getTime().toString(16).slice(-6));
    script.src = BMAP_SCRIPT_SRC + '&callback=' + fnName;
    window[fnName] = function() {
      resolve(window.BMap);
      delete window[fnName];
    };
    document.body.appendChild(script);
  });
}
export {
    loadBMap
};
