# Create DoDo - Boilerplates
> This repository contains boilerplates (code templates) to start a new single page app with the [DoDo framework](http://dodo.mikosoft.info).


## Installation
To start a new project is very straightforward
```bash
$ npm init dodo
```


## Development
```bash
$ cd [projectName]
$ npm install   or   $ npm run inst
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


### Licence
Copyright (c) MikoSoft licensed under [MIT](./LICENSE).
