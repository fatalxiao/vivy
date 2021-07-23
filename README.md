[npm-image]: https://img.shields.io/npm/v/vivy.svg?style=flat-square

[npm-url]: https://npmjs.org/package/vivy

[license-image]: https://img.shields.io/npm/l/vivy.svg?style=flat-square

[dva-url]: https://github.com/dvajs/dva

[redux-url]: https://github.com/reduxjs/redux

[example-counter-url]: https://github.com/fatalxiao/vivy/tree/main/examples/counter

[example-globalReducers-url]: https://github.com/fatalxiao/vivy/tree/main/examples/globalReducers

[example-requestApi-url]: https://github.com/fatalxiao/vivy/tree/main/examples/requestApi

[example-requestApiWithApiPlugin-url]: https://github.com/fatalxiao/vivy/tree/main/examples/requestApiWithApiPlugin

[example-withAsyncComponentPlugin-url]: https://github.com/fatalxiao/vivy/tree/main/examples/withAsyncComponentPlugin

[pieb-with-dpe-frontend-url]: https://github.com/fatalxiao/pieb-with-dpe-frontend

# Vivy

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][npm-url]

## What is Vivy?

Vivy is a [Dva][dva-url] like state container based on [redux][redux-url].

## Installation

Using npm:

```shell
$ npm install vivy
```

## Examples

### Run examples in repository.

```shell
$ npm run example:[EXAMPLE_NAME]
```

**Example names**:

* [counter][example-counter-url]
* [globalReducers][example-globalReducers-url]
* [requestApi][example-requestApi-url]
* [requestApiWithApiPlugin][example-requestApiWithApiPlugin-url]
* [withAsyncComponentPlugin][example-withAsyncComponentPlugin-url]

### A complete and real example:

[pieb-with-dpe-frontend][pieb-with-dpe-frontend-url]

## Documentation

### Usage

#### Import Vivy

```js
import Vivy from 'vivy';
```

#### Create Vivy instance

```js
const vivy = Vivy();
```

### Vivy Api

### Methods

#### registerModel

```js
import {registerModel} from 'vivy';

// register model to your Vivy store
registerModel(yourVivyStore, model);
```

#### registerModels

```js
import {registerModels} from 'vivy';

// register models to your Vivy store
registerModels(yourVivyStore, [
    model1,
    model2,
    // other models...
]);
```
