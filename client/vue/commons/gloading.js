import { addClass, removeClass } from 'mint-ui/src/utils/dom';

class Loading {
  constructor(options) {
    this.queueNum = 0;
    this._options = options || {};
    document.body.appendChild(this.$loading = this._buildDom());
  }

  start() {
    if (this._options.sync) {
      this.queueNum += 1;
    }
    this._start();
    return this;
  }

  _start() {
    removeClass(this.$loading, 'hidden');
  }

  stop(force) {
    if (this._options.sync) {
      this.queueNum -= 1;
    }
    if (this.queueNum <= 0 || force) {
      this.queueNum = 0;
      this._stop();
    }
    return this;
  }

  _stop() {
    addClass(this.$loading, 'hidden');
  }

  // 创建dom
  _buildDom() {
    const zLoadingBox = this._createElement('z-loading-box hidden');
    zLoadingBox.appendChild(this._createElement('loading-mask'));
    const loadContainer = this._createElement('load-container');
    zLoadingBox.appendChild(loadContainer);
    loadContainer.appendChild(this._createElement('loader'));
    loadContainer.appendChild(this._createElement('load-word'));
    return zLoadingBox;
  }

  _createElement(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
  }
}

export default Loading;
