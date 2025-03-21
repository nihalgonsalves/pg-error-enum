# Changelog

## [1.0.2](https://github.com/nihalgonsalves/pg-error-enum/compare/pg-error-enum-v1.0.1...pg-error-enum-v1.0.2) (2025-03-21)


### Bug Fixes

* add back prepublish build ([#557](https://github.com/nihalgonsalves/pg-error-enum/issues/557)) ([1618d57](https://github.com/nihalgonsalves/pg-error-enum/commit/1618d570c478d30dd170fe778c884f9e3cceeffc))

## [1.0.1](https://github.com/nihalgonsalves/pg-error-enum/compare/pg-error-enum-v1.0.0...pg-error-enum-v1.0.1) (2025-03-19)


### Bug Fixes

* **build:** remove prepublish test ([#554](https://github.com/nihalgonsalves/pg-error-enum/issues/554)) ([f58de92](https://github.com/nihalgonsalves/pg-error-enum/commit/f58de92a62080f6eb856f138413cb92d8e79698a))

## [1.0.0](https://github.com/nihalgonsalves/pg-error-enum/compare/pg-error-enum-v0.7.3...pg-error-enum-v1.0.0) (2025-03-19)


### ⚠ BREAKING CHANGES

* This drops support for Node 18, and switches to a pure ESM package. This means that you either have to use `"type": "module"` in your `package.json`, or upgrade to a Node version that supports [require(esm)](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require), i.e. >= [v20.19.0](https://nodejs.org/en/blog/release/v20.19.0#requireesm-is-now-enabled-by-default), >= [v22.12.0](https://nodejs.org/en/blog/release/v22.12.0#requireesm-is-now-enabled-by-default), or v23 and above.

### Build System

* switch to esm ([#552](https://github.com/nihalgonsalves/pg-error-enum/issues/552)) ([449c422](https://github.com/nihalgonsalves/pg-error-enum/commit/449c422e9e3534d37b4e2b8646ba871a11a8252c))

## [0.7.3](https://github.com/nihalgonsalves/pg-error-enum/compare/pg-error-enum-v0.7.2...pg-error-enum-v0.7.3) (2024-10-01)


### Features

* add INVALID_ARGUMENT_FOR_XQUERY (10608) ([#540](https://github.com/nihalgonsalves/pg-error-enum/issues/540)) ([e14399a](https://github.com/nihalgonsalves/pg-error-enum/commit/e14399ab41eaa87717476559f39571da8d486f39))

## [0.7.2](https://github.com/nihalgonsalves/pg-error-enum/compare/pg-error-enum-v0.7.1...pg-error-enum-v0.7.2) (2024-07-22)


### Features

* add FILE_NAME_TOO_LONG (58P03) ([#533](https://github.com/nihalgonsalves/pg-error-enum/issues/533)) ([a7ab269](https://github.com/nihalgonsalves/pg-error-enum/commit/a7ab269182e674fa9a92e0c4e7d5ed866a1742ab))

## [0.7.1](https://github.com/nihalgonsalves/pg-error-enum/compare/pg-error-enum-v0.7.0...pg-error-enum-v0.7.1) (2024-02-19)


### Features

* sync with latest Postgres Errors ([#523](https://github.com/nihalgonsalves/pg-error-enum/issues/523)) ([0c8f0ce](https://github.com/nihalgonsalves/pg-error-enum/commit/0c8f0cedf6b3adac63bdae64541e63cd52fa7f28))


### Bug Fixes

* update sync.ts quotes for prettier changes ([845a7c3](https://github.com/nihalgonsalves/pg-error-enum/commit/845a7c34cb9ec9049be545ad7c7963d6964fd83b))

## [0.7.0](https://github.com/nihalgonsalves/pg-error-enum/compare/v0.6.1...v0.7.0) (2023-09-11)


### ⚠ BREAKING CHANGES

* **sync:** This removes an enum constant, and could possibly break code that uses it.

### Features

* **sync:** remove SNAPSHOT_TOO_OLD (72000) ([#508](https://github.com/nihalgonsalves/pg-error-enum/issues/508)) ([6477108](https://github.com/nihalgonsalves/pg-error-enum/commit/64771080dc044beff5a48a123f0e2cd07ffe4ccf))

## [0.6.1](https://github.com/nihalgonsalves/pg-error-enum/compare/v0.6.0...v0.6.1) (2023-07-07)


### Features

* publish with npm provenance ([6b28711](https://github.com/nihalgonsalves/pg-error-enum/commit/6b287114058d58cc5616864eaccd06c516ecbf68))
