import corejs from 'core-js';
class _mauiWidget {
    /**
     * 생성
     */
    constructor() {
        this.initEvents();
    }

    isNull(v) {
        return v === undefined || v === null;
    }

    initEvents() {
        if (!this.isNull(window)) {
            window.addEventListener('message', (e) => {
                // console.log(e);
                const {type} = e.data;
                if (typeof type === 'string') {
                    if (type === 'video.currentTime.get') {
                        if (!this.isNull(this._cbVideoCurrentTime)) {
                            this._cbVideoCurrentTime(e.data.currentTime);
                            this._cbVideoCurrentTime = null;
                        }
                    } else if (type === 'video.duration') {
                        // video duration
                        if (!this.isNull(this._cbVideoDuration)) {
                            this._cbVideoDuration(e.data.duration);
                        }
                    } else if (type === 'device.info') {
                        if (this.__callBackGetDeviceInfo) {
                            this.__callBackGetDeviceInfo(e.data);
                        }
                    } else {
                        this.trigger(type, e.data);
                    }
                }
            }, false);
        }
    }
    get listeners() {
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
        if (this.listeners[type] === undefined) {
            this.listeners[type] = [];
        }
        const index = this
            .listeners[type]
            .indexOf(func);
        if (index <= -1) {
            this
                .listeners[type]
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
                this.listeners[type].slic
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
        if (this.listeners[type] !== undefined) {
            const list = this.listeners[type];
            if (list !== undefined && Array.isArray(list)) {
                for (let e of list) {
                    e(Object.assign({}, event, {type: type}));
                }
            }
        }
        return this;
    }

    parentTrigger(type, data) {
        if (this.isNull(window)) {
            return this;
        }
        if (window !== undefined && window.parent !== undefined && window.parent.postMessage !== undefined) {
            window
                .parent
                .postMessage({
                    type,
                    data: data
                }, '*');
        }
        return this;
    }

    getDeviceInfo(callback) {
        this.parentTrigger('device.info')
        this.__callBackGetDeviceInfo = callback;
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
        this._cbVideoDuration = callback;
        this.parentTrigger('video.duration');
    }
}
const $mw = new _mauiWidget();
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    window.$mw = $mw;
    module.exports = $mw;
}