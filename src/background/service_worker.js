// importScripts('service-worker-utils.js'); // importing and using functionality from external files is also possible

import apiCaller from '../_libs/apiCaller';
import messenger from '../_libs/messenger.js';

console.log('[background/sevice_worker.js] - service worker script works !');


messenger.listenMsgs(async (request, sender, sendResponse) => {
  console.log('[service_worker.js] request::', request, 'sender::', sender);
  const route = request.route;
  const payload = request.payload;

  if (route === '/background/service_worker/api-getone') {
    const url = payload;
    sendResponse({ success: true, msg: 'The API request is sent', data: null }); // Placing it after `await` will cause an error: "The message port closed before a response"
    const apiResp = await apiCaller.get(url);
    await new Promise(r => setTimeout(r, 3400));
    messenger.sendMsg({ route: '/action/showmessage?responseFrom=/background/service_worker/api-getone', payload: apiResp }, 'action');
  }

});
