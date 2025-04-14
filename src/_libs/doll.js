/**
 * file: doll.js
 * This script (doll.js) runs in chrome extension foreground i.e. it's chrome extension content script.
 * It receives instruction from Doller.js and sends response back. If the responce contains word ERROR the Doller.js will take it as an error.
 * Doller.js and doll.js provides Puppeteer-like functionality within a Chrome extension.
 */

const doll = () => {
  console.log('The doll is listening for Doller instructions');

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    (async () => {
      const { action, ...params } = request;

      try {
        switch (action) {
          /*** Navigation & Page Control ***/
          /*********************************/
          case 'goto':
            window.location.href = params.url;
            // sendResponse('URL opened); // WILL NOT WORK after window.location.href
            break;


          case 'back':
            window.history.back();
            sendResponse('navigated back');
            break;


          case 'waitForSelector':
            await Promise.race([
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error(`Timeout ${params.timeout}ms waiting for selector "${params.cssSel}"`)), params.timeout)
              ),
              new Promise((resolve) => {
                const check = () => {
                  if (document.querySelector(params.cssSel)) {
                    resolve();
                    return true;
                  }
                  return false;
                };

                if (check()) return;

                const observer = new MutationObserver(() => {
                  if (check()) observer.disconnect();
                });

                observer.observe(document.body, { childList: true, subtree: true });
              })
            ]);
            sendResponse('selector found');
            break;


          /*** Content & Info ***/
          /**********************/
          case 'url':
            sendResponse(window.location.href);
            break;

          case 'content':
            sendResponse(document.documentElement.outerHTML);
            break;

          case 'hasSelector':
            const elementExists = document.querySelector(params.selector) !== null;
            sendResponse(elementExists.toString());
            break;


          /*** Interaction ***/
          /*******************/
          case 'click':
            const elClick = document.querySelector(params.selector);
            if (elClick) {
              elClick.click();
              sendResponse('clicked');
            } else {
              sendResponse(`ERROR:Element not found: ${params.selector}`);
            }
            break;


          case 'type':
            const elType = document.querySelector(params.selector);
            if (elType) {
              elType.value = '';
              if (params.options?.delay) {
                for (const char of params.text) {
                  elType.value += char;
                  elType.dispatchEvent(new Event('input', { bubbles: true }));
                  await new Promise(r => setTimeout(r, params.options.delay));
                }
              } else {
                elType.value = params.text;
                elType.dispatchEvent(new Event('input', { bubbles: true }));
              }
              sendResponse('typed');
            } else {
              sendResponse(`ERROR:Element not found: ${params.selector}`);
            }
            break;


          case 'select':
            const elSelect = document.querySelector(params.selector);
            if (elSelect && elSelect.tagName === 'SELECT') {
              for (const value of params.values) {
                for (const option of elSelect.options) {
                  if (option.value === value || option.text === value) {
                    option.selected = true;
                  }
                }
              }
              elSelect.dispatchEvent(new Event('change', { bubbles: true }));
              sendResponse('selected');
            } else {
              sendResponse(`ERROR:Element not found or not a select element: ${params.selector}`);
            }
            break;


          default:
            sendResponse(`ERROR:Unknown action: ${action}`);
        }
      } catch (error) {
        sendResponse(`ERROR:${error.message}`);
      }
    })();

    return true; // Keep message channel open for async response
  });
};



export default doll;
