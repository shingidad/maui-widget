'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _mauiWidget = function () {
    /**
     * 생성
     */
    function _mauiWidget() {
        _classCallCheck(this, _mauiWidget);

        this.initEvents();
    }

    _createClass(_mauiWidget, [{
        key: 'isNull',
        value: function isNull(v) {
            return v === undefined || v === null;
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var _this = this;

            if (!this.isNull(window)) {
                window.addEventListener('message', function (e) {
                    var type = e.data.type;

                    if (typeof type === 'string') {
                        if (type === 'video.currentTime') {
                            if (_this._cbVideoCurrentTime !== undefined && _this._cbVideoCurrentTime !== null) {
                                _this._cbVideoCurrentTime();
                                _this._cbVideoCurrentTime = null;
                            }
                        } else if (type === 'video.duration') {
                            // video duration

                        } else if (type === 'device.info') {
                            //
                            if (_this.__callBackGetDeviceInfo) {
                                _this.__callBackGetDeviceInfo({ sn: e.data.sn, mac: e.data.mac });
                            }
                        } else {
                            _this.trigger(type, e.data);
                        }
                    }
                }, false);
            }
        }
    }, {
        key: 'addEventListener',


        /**
         * Add Event Listener
         * @param {*} type
         * @param {*} func
         */
        value: function addEventListener() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (e) {
                console.warn('not funod callback function', e);
            };

            if (typeof type !== 'string') {
                throw 'parma1 type only "string"';
            }
            if (this.listeners[type] === undefined) {
                this.listeners[type] = [];
            }
            var index = this.listeners[type].indexOf(func);
            if (index <= -1) {
                this.listeners[type].push(func);
            }
            return this;
        }
    }, {
        key: 'removeEventListener',


        /**
         * Remove Event Listener
         * @param {*} type
         * @param {*} func
         */
        value: function removeEventListener() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (type !== null) {
                var index = this.listenrs[type].indexOf(func);
                if (index >= 0) {
                    this.listeners[type].slic;
                }
            }
            return this;
        }

        /**
         * trigger
         * @param {*} type
         * @param {*} event
         */

    }, {
        key: 'trigger',
        value: function trigger(type) {
            var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (this.listeners[type] !== undefined) {
                var list = this.listeners[type];
                if (list !== undefined && Array.isArray(list)) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var e = _step.value;

                            e(Object.assign({}, event, { type: type }));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
            return this;
        }
    }, {
        key: 'parentTrigger',
        value: function parentTrigger(type, data) {
            if (this.isNull(window)) {
                return this;
            }
            if (window !== undefined && window.parent !== undefined && window.parent.postMessage !== undefined) {
                window.parent.postMessage({
                    type: type,
                    data: data
                }, '*');
            }
            return this;
        }
    }, {
        key: 'getDeviceInfo',
        value: function getDeviceInfo(callback) {
            this.parentTrigger('device.info');
            this.__callBackGetDeviceInfo = callback;
            return this;
        }

        /**
         * video Play
         * @param {string} src
         */

    }, {
        key: 'videoPlay',
        value: function videoPlay(src) {
            this.parentTrigger('video.play', { src: src });
            return this;
        }
        /**
         * video stop
         */

    }, {
        key: 'videoStop',
        value: function videoStop() {
            this.parentTrigger('video.stop');
        }
        /**
         * video resume
         */

    }, {
        key: 'videoResume',
        value: function videoResume() {
            this.parentTrigger('video.resume');
        }
        /**
         * video pause
         */

    }, {
        key: 'videoPause',
        value: function videoPause() {
            this.parentTrigger('video.pause');
        }

        /**
         * Video Current Time 가져오기
         * @param {function} callback
         */

    }, {
        key: 'videoGetCurrentTime',
        value: function videoGetCurrentTime(callback) {
            this._cbVideoCurrentTime = callback;
            this.parentTrigger('video.currentTime.get');
        }

        /**
         * Video Current Time 시간 설정
         * @param {number} time
         */

    }, {
        key: 'videoSetCurrentTime',
        value: function videoSetCurrentTime() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            this.parentTrigger('video.currentTime.set', { currentTime: time });
        }

        /**
         * 영상 시간 가져오기
         * @param {function} callback
         */

    }, {
        key: 'videoGetDuration',
        value: function videoGetDuration(callback) {
            this.parentTrigger('video.duration');
        }
    }, {
        key: 'listeners',
        get: function get() {
            if (this.mEventListenerList === undefined || this.mEventListenerList === null) {
                this.mEventListenerList = {};
            }
            return this.mEventListenerList;
        }
    }]);

    return _mauiWidget;
}();

var $mw = new _mauiWidget();
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = $mw;
} else {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return $mw;
        });
    } else {
        window.$mw = $mw;
    }
}
