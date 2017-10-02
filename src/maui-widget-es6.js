/*
./node_modules/.bin/babel src/maui-widget-es6.js --out-file example/public/maui-widget.js
 */
class $MayUHD {
    /**
     * 생성
     * @param {*} w
     */
    constructor(w = window) {
        this.mWindow = w;
        this.initEvents(w);
    }

    initEvents(window) {
        window.addEventListener('message', (e) => {
            const {type} = e.data;
            if (typeof type === 'string') {
                if (type === 'video.currentTime') {
                    if (this._cbVideoCurrentTime !== undefined && this._cbVideoCurrentTime !== null) {
                        this._cbVideoCurrentTime();
                        this._cbVideoCurrentTime = null;
                    }
                } else if (type === 'video.duration') {} else {
                    this.trigger(type, e.data);
                }
            }
        }, false);
        document.addEventListener('keydown', (e) => this.trigger(e.type, e));
        document.addEventListener('keyup', (e) => this.trigger(e.type, e));
    }
    get listenrs() {
        if (this.mEventListenerList === undefined || this.mEventListenerList === null) {
            this.mEventListenerList = {};
        }
        return this.mEventListenerList;
    }

    /**
     * Add Event Listener
     * @param {*} type
     * @param {*} func
     */
    addEventListener(type = null, func = (e) => {
        console.warn('not funod callback function', e);
    }) {
        if (typeof type !== 'string') {
            throw('parma1 type only "string"');
        }
        if (this.listenrs[type] === undefined) {
            this.listenrs[type] = [];
        }
        const index = this
            .listenrs[type]
            .indexOf(func);
        if (index <= -1) {
            this
                .listenrs[type]
                .push(func);
        }
        return this;
    };

    /**
     * Remove Event Listener
     * @param {*} type
     * @param {*} func
     */
    removeEventListener(type = null, func = null) {
        if (type !== null) {
            const index = this
                .listenrs[type]
                .indexOf(func);
            if (index >= 0) {
                this.listenrs[type].slic
            }
        }
        return this;
    }

    /**
     * trigger
     * @param {*} type
     * @param {*} event
     */
    trigger(type, event = {}) {
        if (this.listenrs[type] !== undefined) {
            const list = this.listenrs[type];
            if (list !== undefined && Array.isArray(list)) {
                for (let e of list) {
                    e(Object.assign({}, event, {type: type}));
                }
            }
        }
        return this;
    }

    parentTrigger(type, data) {
        if (this.mWindow !== undefined && this.mWindow.parent !== undefined && this.mWindow.parent.postMessage !== undefined) {
            this
                .mWindow
                .parent
                .postMessage({
                    type,
                    data: data
                }, '*');
        }
        return this;
    }

    /**
     * video Play
     * @param {string} src
     */
    videoPlay(src) {
        this.parentTrigger('video.play', {src});
        return this;
    }
    /**
     * video stop
     */
    videoStop() {
        this.parentTrigger('video.stop');
    }
    /**
     * video resume
     */
    videoResume() {
        this.parentTrigger('video.resume');
    }
    /**
     * video pause
     */
    videoPause() {
        this.parentTrigger('video.pause');
    }

    /**
     * Video Current Time 가져오기
     * @param {function} callback
     */
    videoGetCurrentTime(callback) {
        this._cbVideoCurrentTime = callback;
        this.parentTrigger('video.currentTime.get');
    }

    /**
     * Video Current Time 시간 설정
     * @param {number} time
     */
    videoSetCurrentTime(time = 0) {
        this.parentTrigger('video.currentTime.set', {currentTime: time});
    }

    /**
     * 영상 시간 가져오기
     * @param {function} callback
     */
    videoGetDuration(callback) {
        this.parentTrigger('video.duration');
    }
}(function (global) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = $MayUHD
    } else {
        window.$MayUHD = new $MayUHD(window);
    }
}(this));