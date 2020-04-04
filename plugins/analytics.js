/* eslint-disable */

import Vue from 'vue'

export default ({ app }) => {
    window.sa_event=window.sa_event||function(){
      var a=[].slice.call(arguments);
      sa_event.q?sa_event.q.push(a):sa_event.q=[a]
    };
    if (!document) return warn('No document defined.');
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = 'https://kisses.forhumansake.org/latest.js';
    document.head.appendChild(el);

    Vue.prototype.sa = window.sa_event;
}