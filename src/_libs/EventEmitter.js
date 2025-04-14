/**
 * The EventEmitter, compatible with both browser and service worker (chrome extension's background) environments.
 */
class EventEmitter {
  constructor() {
    this.activeOns = []; // [{eventName:string, listener:Function, listenerCallback:Function, context:any}]
    this.globalContext = typeof window !== 'undefined' ? window : self;
  }


  /**
   * Create and emit the event.
   * @param {string} eventName - Event name, for example: 'pushstate' or 'message'.
   * @param {any} detail - Event argument.
   * @returns {void}
   */
  emit(eventName, detail = {}) {
    if (typeof window !== 'undefined') {
      // Browser environment
      const event = new CustomEvent(eventName, { detail });
      this.globalContext.dispatchEvent(event);
    } else {
      // Service worker environment
      //  console.log(`Emitting event: ${eventName}`, detail); // For debugging in service worker
      this.globalContext.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
  }


  /**
   * Listen for the event.
   * @param {string} eventName - Event name, for example: 'pushstate' or 'message'.
   * @param {Function} listener - Callback function, for example msg => {...}.
   * @returns {void}
   */
  on(eventName, listener) {
    const listenerCallback = (event) => {
      listener.call(this, event.detail); // Pass detail in service worker
    };

    this._removeOne(eventName, listener);
    this.activeOns.push({ eventName, listener, listenerCallback, context: this.globalContext });
    this.globalContext.addEventListener(eventName, listenerCallback);
  }


  /**
   * Listen for the event only once.
   * @param {string} eventName - Event name, for example: 'pushstate' or 'message'.
   * @param {Function} listener - Callback function.
   * @returns {void}
   */
  once(eventName, listener) {
    const listenerCallback = (event) => {
      listener.call(this, event.detail);
      this._removeOne(eventName, listener, listenerCallback);
    };
    this.globalContext.addEventListener(eventName, listenerCallback, { once: true });
  }


  /**
   * Stop listening for the event for a specific listener.
   * @param {string} eventName - Event name, for example: 'pushstate' or 'message'.
   * @param {Function} listener - Callback function, for example msg => {...}.
   * @returns {void}
   */
  off(eventName, listener) {
    this._removeOne(eventName, listener);
  }


  /**
   * Stop listening for the event for all listeners defined with on().
   * For example eventEmitter.on('msg', fja1) & eventEmitter.on('msg', fja2) then eventEmitter.off('msg') will remove fja1 and fja2 listeners.
   * @param {string} eventName - Event name, for example: 'pushstate' or 'message'.
   * @returns {void}
   */
  offAll(eventName) {
    let ind = 0;
    for (const activeOn of this.activeOns) {
      if (activeOn.eventName === eventName) {
        this.globalContext.removeEventListener(activeOn.eventName, activeOn.listenerCallback);
        this.activeOns.splice(ind, 1);
      }
      ind++;
    }
  }


  /**
   * Get active listeners filtered by eventName.
   * @param {string} eventName - Event name, for example: 'pushstate' or 'message'.
   * @returns {{eventName:string, listener:Function, listenerCallback:Function, context:any}[]}
   */
  getListeners(eventName) {
    let activeListeners = [...this.activeOns];
    activeListeners = activeListeners.filter(al => al.eventName === eventName);
    return activeListeners;
  }


  /*** PRIVATES ***/
  /**
   * Remove a listener from globalContext and this.activeOns
   */
  _removeOne(eventName, listener, listenerCallback) {
    if (!listener) {
      throw new Error('eventEmitter._removeOne Error: listener is not defined');
    }
    let ind = 0;
    for (const activeOn of this.activeOns) {
      //check the string representation of the listener
      if (activeOn.eventName === eventName && activeOn.listener === listener) {
        this.globalContext.removeEventListener(activeOn.eventName, listenerCallback || activeOn.listenerCallback);
        this.activeOns.splice(ind, 1);
        return; // Important: Exit the loop after removing
      }
      ind++;
    }
  }


}


export default EventEmitter;
