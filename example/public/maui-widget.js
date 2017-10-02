'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
./node_modules/.bin/babel src/maui-widget-es6.js --out-file example/public/maui-widget.js
 */
var $MayUHD = function () {
    /**
     * 생성
     * @param {*} w
     */
    function $MayUHD() {
        var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

        _classCallCheck(this, $MayUHD);

        this.mWindow = w;
        this.initEvents(w);
    }

    _createClass($MayUHD, [{
        key: 'initEvents',
        value: function initEvents(window) {
            var _this = this;

            window.addEventListener('message', function (e) {
                var type = e.data.type;

                if (typeof type === 'string') {
                    if (type === 'video.currentTime') {
                        if (_this._cbVideoCurrentTime !== undefined && _this._cbVideoCurrentTime !== null) {
                            _this._cbVideoCurrentTime();
                            _this._cbVideoCurrentTime = null;
                        }
                    } else if (type === 'video.duration') {} else {
                        _this.trigger(type, e.data);
                    }
                }
            }, false);
            document.addEventListener('keydown', function (e) {
                return _this.trigger(e.type, e);
            });
            document.addEventListener('keyup', function (e) {
                return _this.trigger(e.type, e);
            });
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
            if (this.listenrs[type] === undefined) {
                this.listenrs[type] = [];
            }
            var index = this.listenrs[type].indexOf(func);
            if (index <= -1) {
                this.listenrs[type].push(func);
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
                    this.listenrs[type].slic;
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

            if (this.listenrs[type] !== undefined) {
                var list = this.listenrs[type];
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
            if (this.mWindow !== undefined && this.mWindow.parent !== undefined && this.mWindow.parent.postMessage !== undefined) {
                this.mWindow.parent.postMessage({
                    type: type,
                    data: data
                }, '*');
            }
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
        key: 'listenrs',
        get: function get() {
            if (this.mEventListenerList === undefined || this.mEventListenerList === null) {
                this.mEventListenerList = {};
            }
            return this.mEventListenerList;
        }
    }]);

    return $MayUHD;
}();

(function (global) {
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
        module.exports = $MayUHD;
    } else {
        window.$MayUHD = new $MayUHD(window);
    }
})(undefined);
