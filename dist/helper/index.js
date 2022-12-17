"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var _header = function (key) {
    if (key === void 0) { key = ""; }
    return {
        "Content-Type": "application/json",
        "X-360API-KEY": key,
    };
};
var Helper = (function () {
    function Helper(key) {
        this.key = key;
        this.cache = { lastUpdated: 0 };
        this.ENDPOINT = "https://cms.backend.pyvot360.com";
    }
    Helper.prototype.getAll = function () {
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
    Helper.prototype.getOne = function (articleId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.cache.posts && !this.isCacheExpired()) {
                            return [2, (_a = this.cache.posts) === null || _a === void 0 ? void 0 : _a.filter(function (p) { return p.id === articleId; })];
                        }
                        return [4, axios_1.default.post("".concat(this.ENDPOINT, "/article/get"), {
                                id: articleId,
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
    Helper.prototype.getTopics = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, topics;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.cache.topics && !this.isCacheExpired()) {
                            return [2, this.cache.topics];
                        }
                        return [4, axios_1.default.get("".concat(this.ENDPOINT, "/article/get-topics"), {
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
    Helper.prototype.search = function (_a) {
        var title = _a.title, tag = _a.tag, author = _a.author;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, axios_1.default.get("".concat(this.ENDPOINT, "/article/search?").concat(title ? "title=".concat(title, "&") : "").concat(tag ? "topic=".concat(tag, "&") : "").concat(author ? "topic=".concat(author) : ""), {
                            headers: _header(this.key),
                            validateStatus: function (status) {
                                return status < 505;
                            },
                        })];
                    case 1:
                        response = _b.sent();
                        if (response.status !== 200)
                            return [2, []];
                        return [2, Object.values(response.data)];
                }
            });
        });
    };
    Helper.prototype.viewed = function (articleId) {
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
    Helper.prototype.isCacheExpired = function () {
        return (Date.now() - this.cache.lastUpdated) / (1000 * 60 * 60) > 5;
    };
    return Helper;
}());
exports.Helper = Helper;
