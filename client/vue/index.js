'use strict';

import fastClick from 'fastclick';
fastClick.attach(document.body);

import { app } from './app';

if (process.env.NODE_ENV === 'production') {
  require('./commons/pwa');
}

app.$mount('#app');
