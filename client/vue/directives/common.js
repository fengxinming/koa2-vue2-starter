'use strict';

import processing from '../commons/processing';

const lib = window.lib;

export default {

  // 左滑 右滑
  'custom-swipe': {
    bind(el, binding, vnode) {
      const { componentOptions, data } = vnode;
      const listeners = componentOptions ? componentOptions.listeners : null;
      const on = data ? data.on : null;
      const events = listeners ? listeners : on ? on : null;
      let swipeFn = () => {};
      if (events && typeof events === 'object' && Object.keys(events).length) {
        swipeFn = events.swipe;
      }
      let x, y, nX, nY, swipeX, swipeY, direction;
      // 自定义事件
      const customListeners = {
        touchstart(e) {
          x = e.changedTouches[0].pageX;
          y = e.changedTouches[0].pageY;
          swipeX = true;
          swipeY = true;
        },
        touchmove(e) {
          nX = event.changedTouches[0].pageX;
          nY = event.changedTouches[0].pageY;
          if (swipeX && Math.abs(nX - x) - Math.abs(nY - y) > 0) {
            // 阻止默认事件
            e.stopPropagation();
            // 右滑
            if (nX - x > lib.flexible.rem2px(2)) {
              e.preventDefault();
              direction = 'right';
            }
            // 左滑
            if (x - nX > lib.flexible.rem2px(2)) {
              e.preventDefault();
              direction = 'left';
            }
            swipeY = false;
          }
          if (swipeY && Math.abs(nX - x) - Math.abs(nY - y) < 0) {
            swipeX = false;
            direction = null;
          }
        },
        touchend(e) {
          swipeFn({
            touchEvent: e,
            direction
          });
          direction = null;
        }
      };
      Object.keys(customListeners).forEach((key) => {
        el.addEventListener(key, customListeners[key]);
      });
      vnode.customListeners = customListeners;
    },
    update(el, binding, vnode) {},
    unbind(el, binding, vnode) {
      const customListeners = vnode.customListeners;
      if (customListeners) {
        Object.keys(customListeners).forEach((key) => {
          el.removeEventListener(key, customListeners[key]);
        });
      }
    }
  },

  countdown: {

    bind(el, binding, vnode) {
      const { componentOptions, data } = vnode;
      const listeners = componentOptions ? componentOptions.listeners : null;
      const on = data ? data.on : null;
      const events = listeners ? listeners : on ? on : null;
      if (events && typeof events === 'object' && Object.keys(events).length) {
        binding.customListeners = events;
      }
    },

    inserted(el, binding, vnode) {
      let val = +binding.value;
      if (!val) {
        return;
      }
      const milliseconds2HMS = processing.milliseconds2HMS;
      const formatter = vnode.data.attrs.formatter;
      let timer = window.setInterval(() => {
        val -= 1000;
        let instance = milliseconds2HMS(val);
        if (!instance[2]) {
          if (timer) {
            window.clearInterval(timer);
            timer = null;
            if (binding.customListeners) {
              binding.customListeners.complete && binding.customListeners.complete();
            }
          }
          return;
        }
        el.innerHTML = formatter.replace(/HH/g, instance[0]).replace(/mm/g, instance[1]).replace(/ss/g, instance[2]);
      }, 1000);
    },

    update(el, binding, vnode) {
      if (!binding.customListeners) {
        binding.def.bind(el, binding, vnode);
      }
      binding.def.inserted(el, binding, vnode);
    },

    unbind(el, binding, vnode) {
      const customListeners = binding.customListeners;
      if (customListeners) {
        delete binding.customListeners;
      }
    }

  }

};
