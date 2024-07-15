# Create DoDo - Boilerplates
> This repository contains boilerplates (code templates) to start a new single page app with the [DoDo framework](http://dodo.mikosoft.info).


## Installation
To start a new project is very straightforward
```bash
$ npm init dodo@latest
```


## Development
```bash
$ cd [projectName]
$ npm run start
```


## Boilerplates
The DoDo Framework boilerplates are placed in different repository branches:
- **spa** -- *Single Page App* - Effortlessly begin building browser-based Single Page Application (SPA)
- **desktop-electronforge** -- *ElectronJS Desktop App* - Initiate the development of desktop applications using the Dodo framework with ElectronJS Forge integration.


## Documentation
Tutorials and API documentation at [http://dodo.mikosoft.info](http://dodo.mikosoft.info)


## NOTICE
 - In the package.json the "name" and "productName" must have same value or this error will occur on command *$npm run make*:
 ```An unhandled rejection has occurred inside Forge: Error: could not find the Electron app binary at ...
 ```


### Firebase Hosting
Deploying a Dodo App on Firebase Hosting is a straightforward and user-friendly process.
Do the following commands from the project's root folder:
```
$ npm run build     - this will create /dist/ folder with index.html

$ firebase init
  - Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys [select this option]
  - What do you want to use as your public directory? [dist]
  - Configure as a single-page app (rewrite all urls to /index.html)? [y]
  - Set up automatic builds and deploys with GitHub? [N]
  - File dist/index.html already exists. Overwrite? [N]  -- if [y] then Firebase welcome page will be shown

$ firebase deploy
  Project Console: https://console.firebase.google.com/project/dodo-examples/overview
  Hosting URL: https://dodo-examples.web.app
```




### Licence
Copyright (c) MikoSoft licensed under [MIT](./LICENSE).
