"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSDK = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var _header = function (key) {
    if (key === void 0) { key = ""; }
    return {
        "Content-Type": "application/json",
        "X-360API-KEY": key,
    };
};
var ClientSDK = (function () {
    function ClientSDK(key) {
        this.key = key;
        this.cache = { lastUpdated: 0 };
        this.ENDPOINT = "https://cms.backend.pyvot360.com";
    }
    ClientSDK.prototype.getAll = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, posts;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.cache.posts && !this.isCacheExpired()) {
                            return [2, new Promise(function (res) { return res(_this.cache.posts || []); })];
                        }
                        return [4, axios_1.default.get("".concat(this.ENDPOINT, "/article/get-all"), {
                                headers: _header(this.key),
                                validateStatus: function (status) {
                                    return status < 505;
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            return [2, []];
                        posts = Object.values(response.data);
                        this.cache.posts = posts;
                        this.cache.lastUpdated = Date.now();
                        return [2, posts];
                }
            });
        });
    };
    ClientSDK.prototype.getById = function (articleId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.cache.posts && !this.isCacheExpired()) {
                            return [2, ((_a = this.cache.posts) === null || _a === void 0 ? void 0 : _a.filter(function (p) { return p.id === articleId; })[0]) || []];
                        }
                        return [4, axios_1.default.post("".concat(this.ENDPOINT, "/article/get"), {
                                filter: {
                                    id: articleId,
                                },
                            }, {
                                headers: _header(this.key),
                                validateStatus: function (status) {
                                    return status < 505;
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        if (response.status !== 200)
                            return [2];
                        return [2, Object.values(response.data)[0]];
                }
            });
        });
    };
    ClientSDK.prototype.getByUrl = function (articleUrl) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.cache.posts && !this.isCacheExpired()) {
                            return [2, ((_a = this.cache.posts) === null || _a === void 0 ? void 0 : _a.filter(function (p) { return p.url === articleUrl; })[0]) || []];
                        }
                        return [4, axios_1.default.post("".concat(this.ENDPOINT, "/article/get"), {
                                filter: {
                                    url: articleUrl,
                                },
                            }, {
                                headers: _header(this.key),
                                validateStatus: function (status) {
                                    return status < 505;
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        if (response.status !== 200)
                            return [2];
                        return [2, Object.values(response.data)[0]];
                }
            });
        });
    };
    ClientSDK.prototype.getTopics = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, topics;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.cache.topics && !this.isCacheExpired()) {
                            return [2, this.cache.topics];
                        }
                        return [4, axios_1.default.get("".concat(this.ENDPOINT, "/article/topics"), {
                                headers: _header(this.key),
                                validateStatus: function (status) {
                                    return status < 505;
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            return [2, []];
                        topics = Object.values(response.data);
                        this.cache.topics = topics;
                        this.cache.lastUpdated = Date.now();
                        return [2, topics];
                }
            });
        });
    };
    ClientSDK.prototype.search = function (filters) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var title, tag, author, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = filters.title, tag = filters.tag, author = filters.author;
                        return [4, axios_1.default.get("".concat(this.ENDPOINT, "/article/search?").concat(title ? "title=".concat(title, "&") : "").concat(tag ? "topic=".concat(tag, "&") : "").concat(author ? "topic=".concat(author) : ""), {
                                headers: _header(this.key),
                                validateStatus: function (status) {
                                    return status < 505;
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            return [2, []];
                        return [2, Object.values(response.data)];
                }
            });
        });
    };
    ClientSDK.prototype.viewed = function (articleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, axios_1.default.post("".concat(this.ENDPOINT, "/article/update-view"), {
                            id: articleId,
                        }, {
                            headers: _header(this.key),
                            validateStatus: function (status) {
                                return status < 505;
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            console.error("Sync error!");
                        return [2];
                }
            });
        });
    };
    ClientSDK.prototype.isCacheExpired = function () {
        return (Date.now() - this.cache.lastUpdated) / (1000 * 60) > 15;
    };
    return ClientSDK;
}());
exports.ClientSDK = ClientSDK;
