console.log('[content_scripts/foreground.js] - forground script works !');

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('[foreground.js] request::', request, 'sender::', sender);
  // sendResponse({ success: true, request }); // return message back to sender
});
