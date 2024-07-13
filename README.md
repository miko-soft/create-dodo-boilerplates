# Create DoDo - Boilerplates
> This repository contains boilerplates (code templates) to start a new single page app with the [DoDo framework](http://dodo.mikosoft.info).


## Installation
To start a new chrome extension project is very straightforward
```bash
$ npm init dodo
```
Select "Chrome Extension" option.


## Action Popup Development
```bash
$ npm run dev-action
```
Open the app in browser: http://127.0.0.1:9888/action/popup.html


## Options Development
```bash
$ npm run dev-options
```
Open the app in browser: http://127.0.0.1:9888/options/opt.html


## Build
To build complete chrome extension run:
```bash
$ npm run build
```
After succesful build, open chrome://extensions and upload the content of /dist/ folder.



### Licence
Copyright (c) MikoSoft licensed under [MIT](./LICENSE).
