import messenger from '../_libs/messenger.js';

console.log('[content_scripts/foreground.js] - forground script works !');


messenger.listenMsgs(async (request, sender, sendResponse) => {
  console.log('[foreground.js] request::', request, 'sender::', sender);
  const route = request.route;
  const payload = request.payload;

  if (route === '/content_scripts/foreground/change-background-color') {
    sendResponse({ success: true, msg: `Background color changed to "${payload}"` });

    const elem = document.body;
    elem.style.backgroundColor = payload;
  }

});
