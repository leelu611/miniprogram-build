# miniprogram-build

build miniprogram with typescript & scss 

## Features

* `TS` => `js`
    * [x] compile
    * [ ] sourcemap
    * [ ] build break
    * [ ] compress
    * [ ] one tslib
* `scss/sass/css` => `wxss`
    * [x] compile
    * [x] import node_modules
    * [x] sourcemaps
    * [ ] import wxss
    * [ ] inline svg/image
    * [ ] build break
    * [ ] local scss
* `svg` ==> `iconfonts`
    * [ ] svg ==> iconfont 
    * [ ] inline iconfont
* resource
    * [ ] image compress
* [x] Multi Environment (生多个APP)
    * APPID
    * domain & other configs
* build miniprogram native npm
    * [ ] rollup js lib
    * [ ] components


## Todo
* [ ] init
* [ ] console verbose
* [ ] ~~pages config~~
* [ ] template project


## Usage

### install 

```
npm i miniprogram-build -D
```

### Command

> `mp-build [task] [--flags]`

task

* `build` compile all files from `src/` to `dist/`
* `watch` watch src files change and update dist
* `dev` = `build`+`watch`
* `clean` remove dist
* default is `dev`

flags

* `--config={CONFIG_FILE_JSON}` using config file
* `--debug` open debug mode
* `--release` build for release with optimization


examples

* dev in int env
```
mp-build --config=./config.int.json 
```
* build for prod release
```
mp-build build --config=./config.prod.json --release 
```

### default config

```json
{
    "release": false,
    "debug": false,
    "src": "src",
    "dist": "dist",
    "ignore": "",
    "tsconfig": "tsconfig.json",
    "replace": {
        "APP_ID": "all {{APP_ID}} in json files will replaced by this value"
    }
}
```
