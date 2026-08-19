"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fworkspaces%2FFormat%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FFormat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fworkspaces%2FFormat%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FFormat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _workspaces_Format_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/workspaces/Format/src/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _workspaces_Format_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZ3b3Jrc3BhY2VzJTJGRm9ybWF0JTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZ3b3Jrc3BhY2VzJTJGRm9ybWF0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNVO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9lcmZvcmdlLz8xODVkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi93b3Jrc3BhY2VzL0Zvcm1hdC9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL3dvcmtzcGFjZXMvRm9ybWF0L3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fworkspaces%2FFormat%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FFormat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUFDUTtBQUV6QyxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0Msa0RBQVdBO0FBRU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb2VyZm9yZ2UvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/MDA5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XG5cbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTtcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mongodb */ \"(rsc)/./src/lib/mongodb.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID || \"placeholder\",\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET || \"placeholder\"\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Email\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\",\n                    placeholder: \"you@example.com\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const { db } = await (0,_mongodb__WEBPACK_IMPORTED_MODULE_3__.connectToDatabase)();\n                const user = await db.collection(\"users\").findOne({\n                    email: credentials.email\n                });\n                if (!user || !user.password) {\n                    return null;\n                }\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(credentials.password, user.password);\n                if (!isValid) {\n                    return null;\n                }\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.name\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account }) {\n            if (account?.provider === \"google\") {\n                const { db } = await (0,_mongodb__WEBPACK_IMPORTED_MODULE_3__.connectToDatabase)();\n                const existingUser = await db.collection(\"users\").findOne({\n                    email: user.email\n                });\n                if (!existingUser) {\n                    await db.collection(\"users\").insertOne({\n                        email: user.email,\n                        name: user.name,\n                        image: user.image,\n                        plan: \"free\",\n                        creditsRemaining: 3,\n                        createdAt: new Date(),\n                        updatedAt: new Date()\n                    });\n                }\n            }\n            return true;\n        },\n        async session ({ session, user }) {\n            if (session.user) {\n                const { db } = await (0,_mongodb__WEBPACK_IMPORTED_MODULE_3__.connectToDatabase)();\n                const dbUser = await db.collection(\"users\").findOne({\n                    email: session.user.email\n                });\n                if (dbUser) {\n                    session.user.id = dbUser._id.toString();\n                    session.user.plan = dbUser.plan;\n                    session.user.creditsRemaining = dbUser.creditsRemaining;\n                }\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBYyxRQUFRckMsUUFBUUMsR0FBRyxDQUFDcUMsZUFBZTtBQUNyQyxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9lcmZvcmdlLy4vc3JjL2xpYi9hdXRoLnRzPzY2OTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZSc7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHsgY29ubmVjdFRvRGF0YWJhc2UgfSBmcm9tICcuL21vbmdvZGInO1xuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgfHwgJ3BsYWNlaG9sZGVyJyxcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQgfHwgJ3BsYWNlaG9sZGVyJyxcbiAgICB9KSxcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6ICdFbWFpbCcsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJywgcGxhY2Vob2xkZXI6ICd5b3VAZXhhbXBsZS5jb20nIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgZGIgfSA9IGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCd1c2VycycpLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSk7XG5cbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnBhc3N3b3JkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgc2lnbkluKHsgdXNlciwgYWNjb3VudCB9KSB7XG4gICAgICBpZiAoYWNjb3VudD8ucHJvdmlkZXIgPT09ICdnb29nbGUnKSB7XG4gICAgICAgIGNvbnN0IHsgZGIgfSA9IGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKCk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ3VzZXJzJykuZmluZE9uZSh7IGVtYWlsOiB1c2VyLmVtYWlsIH0pO1xuXG4gICAgICAgIGlmICghZXhpc3RpbmdVc2VyKSB7XG4gICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbigndXNlcnMnKS5pbnNlcnRPbmUoe1xuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcbiAgICAgICAgICAgIHBsYW46ICdmcmVlJyxcbiAgICAgICAgICAgIGNyZWRpdHNSZW1haW5pbmc6IDMsXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHVzZXIgfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBjb25zdCB7IGRiIH0gPSBhd2FpdCBjb25uZWN0VG9EYXRhYmFzZSgpO1xuICAgICAgICBjb25zdCBkYlVzZXIgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCd1c2VycycpLmZpbmRPbmUoeyBlbWFpbDogc2Vzc2lvbi51c2VyLmVtYWlsIH0pO1xuXG4gICAgICAgIGlmIChkYlVzZXIpIHtcbiAgICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQgPSBkYlVzZXIuX2lkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLnBsYW4gPSBkYlVzZXIucGxhbjtcbiAgICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuY3JlZGl0c1JlbWFpbmluZyA9IGRiVXNlci5jcmVkaXRzUmVtYWluaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9sb2dpbicsXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufTtcbiJdLCJuYW1lcyI6WyJHb29nbGVQcm92aWRlciIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJjb25uZWN0VG9EYXRhYmFzZSIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiZGIiLCJ1c2VyIiwiY29sbGVjdGlvbiIsImZpbmRPbmUiLCJpc1ZhbGlkIiwiY29tcGFyZSIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJjYWxsYmFja3MiLCJzaWduSW4iLCJhY2NvdW50IiwicHJvdmlkZXIiLCJleGlzdGluZ1VzZXIiLCJpbnNlcnRPbmUiLCJpbWFnZSIsInBsYW4iLCJjcmVkaXRzUmVtYWluaW5nIiwiY3JlYXRlZEF0IiwiRGF0ZSIsInVwZGF0ZWRBdCIsInNlc3Npb24iLCJkYlVzZXIiLCJwYWdlcyIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/mongodb.ts":
/*!****************************!*\
  !*** ./src/lib/mongodb.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDatabase: () => (/* binding */ connectToDatabase)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nlet cachedClient = null;\nlet cachedDb = null;\nasync function connectToDatabase() {\n    const MONGODB_URI = process.env.MONGODB_URI;\n    if (!MONGODB_URI) {\n        throw new Error(\"Please define the MONGODB_URI environment variable\");\n    }\n    if (cachedClient && cachedDb) {\n        return {\n            client: cachedClient,\n            db: cachedDb\n        };\n    }\n    const client = await mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient.connect(MONGODB_URI);\n    const db = client.db(\"doerforge\");\n    cachedClient = client;\n    cachedDb = db;\n    return {\n        client,\n        db\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vbmdvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBDO0FBRTFDLElBQUlDLGVBQW1DO0FBQ3ZDLElBQUlDLFdBQXNCO0FBRW5CLGVBQWVDO0lBQ3BCLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztJQUUzQyxJQUFJLENBQUNBLGFBQWE7UUFDaEIsTUFBTSxJQUFJRyxNQUFNO0lBQ2xCO0lBRUEsSUFBSU4sZ0JBQWdCQyxVQUFVO1FBQzVCLE9BQU87WUFBRU0sUUFBUVA7WUFBY1EsSUFBSVA7UUFBUztJQUM5QztJQUVBLE1BQU1NLFNBQVMsTUFBTVIsZ0RBQVdBLENBQUNVLE9BQU8sQ0FBQ047SUFDekMsTUFBTUssS0FBS0QsT0FBT0MsRUFBRSxDQUFDO0lBRXJCUixlQUFlTztJQUNmTixXQUFXTztJQUVYLE9BQU87UUFBRUQ7UUFBUUM7SUFBRztBQUN0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2RvZXJmb3JnZS8uL3NyYy9saWIvbW9uZ29kYi50cz81M2MyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50LCBEYiB9IGZyb20gJ21vbmdvZGInO1xuXG5sZXQgY2FjaGVkQ2xpZW50OiBNb25nb0NsaWVudCB8IG51bGwgPSBudWxsO1xubGV0IGNhY2hlZERiOiBEYiB8IG51bGwgPSBudWxsO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmVjdFRvRGF0YWJhc2UoKTogUHJvbWlzZTx7IGNsaWVudDogTW9uZ29DbGllbnQ7IGRiOiBEYiB9PiB7XG4gIGNvbnN0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XG5cbiAgaWYgKCFNT05HT0RCX1VSSSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUnKTtcbiAgfVxuXG4gIGlmIChjYWNoZWRDbGllbnQgJiYgY2FjaGVkRGIpIHtcbiAgICByZXR1cm4geyBjbGllbnQ6IGNhY2hlZENsaWVudCwgZGI6IGNhY2hlZERiIH07XG4gIH1cblxuICBjb25zdCBjbGllbnQgPSBhd2FpdCBNb25nb0NsaWVudC5jb25uZWN0KE1PTkdPREJfVVJJKTtcbiAgY29uc3QgZGIgPSBjbGllbnQuZGIoJ2RvZXJmb3JnZScpO1xuXG4gIGNhY2hlZENsaWVudCA9IGNsaWVudDtcbiAgY2FjaGVkRGIgPSBkYjtcblxuICByZXR1cm4geyBjbGllbnQsIGRiIH07XG59XG4iXSwibmFtZXMiOlsiTW9uZ29DbGllbnQiLCJjYWNoZWRDbGllbnQiLCJjYWNoZWREYiIsImNvbm5lY3RUb0RhdGFiYXNlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiRXJyb3IiLCJjbGllbnQiLCJkYiIsImNvbm5lY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/mongodb.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fworkspaces%2FFormat%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FFormat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();