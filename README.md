# Create DoDo - Boilerplates
> This repository contains boilerplates (code templates) to start a new single page app with the DoDo Framework.


## How to start
How to start a new project in the [DoDo framework](http://dodo.mikosoft.info) ?

Very short way:
```bash
$ npm init create-dodo [projectName]
```

Longer way:
```bash
$ git clone -b master https://github.com/miko-soft/create-dodo-boilerplates.git [projectName]
$ cd [projectName]

// remove .git and init new one
$ rm -rf .git && git init

// install npm packages
$ npm install
```

## Start with development
```bash
$ cd [projectName]
$ npm run dev
```
The file changes are watched and automatically bundled in /frontend/_dist/ folder.
Open the app in browser: http://localhost:9000 .

## Boilerplates
The DoDo Framework boilerplates are settled in the repository branches, so to download specific boilerplate use:
```bash
$ git clone -b [boilerplateName] https://github.com/miko-soft/create-dodo-boilerplates.git 
```


## Documentation
Tutorials and API doc at [http://dodo.mikosoft.info](http://dodo.mikosoft.info)


### Licence
Copyright (c) MikoSoft licensed under [MIT](./LICENSE).
