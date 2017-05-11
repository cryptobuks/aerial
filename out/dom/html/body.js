"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@tandem/common");
var element_1 = require("./element");
var SyntheticTextRange = (function () {
    function SyntheticTextRange() {
    }
    SyntheticTextRange.prototype.getBoundingClientRect = function () {
        return common_1.BoundingRect.zeros();
    };
    return SyntheticTextRange;
}());
exports.SyntheticTextRange = SyntheticTextRange;
var SyntheticHTMLBodyElement = (function (_super) {
    __extends(SyntheticHTMLBodyElement, _super);
    function SyntheticHTMLBodyElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SyntheticHTMLBodyElement.prototype.createTextRange = function () {
        return new SyntheticTextRange();
    };
    return SyntheticHTMLBodyElement;
}(element_1.SyntheticHTMLElement));
exports.SyntheticHTMLBodyElement = SyntheticHTMLBodyElement;
//# sourceMappingURL=body.js.map