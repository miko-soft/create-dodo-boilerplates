// importScripts('service-worker-utils.js'); // importing and using functionality from external files is also possible

import apiCaller from './libs/apiCaller';

console.log('[background/sevice_worker.js] - service worker script works !');

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('[service_worker.js] request::', request, 'sender::', sender);

  if (request.route === '/api/getone') {
    const url = request.payload;
    sendResponse({ success: true, msg: 'The API request is sent', data: null }); // placeing after await will cause the error "The message port closed before a response"
    const apiResp = await apiCaller.get(url);
    console.log('apiResp::', apiResp);
  }

});
