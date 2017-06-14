import { SyntheticCSSStyle } from "../css";
import { BoundingRect, IPoint } from "aerial-common";
import { VisibleSyntheticDOMElement, VisibleDOMNodeCapabilities } from "../markup";
export declare class SyntheticHTMLElement extends VisibleSyntheticDOMElement<SyntheticCSSStyle> {
    private _style;
    private _styleProxy;
    private _classList;
    protected _native: HTMLElement;
    onclick: (event?) => any;
    ondblclick: (event?) => any;
    onmousedown: (event?) => any;
    onmouseenter: (event?) => any;
    onmouseleave: (event?) => any;
    onmousemove: (event?) => any;
    onmouseover: (event?) => any;
    onmouseup: (event?) => any;
    onkeydown: (event?) => any;
    onkeypress: (event?) => any;
    onkeyup: (event?) => any;
    constructor(ns: string, tagName: string);
    getClientRects(): BoundingRect[];
    getBoundingClientRect(): BoundingRect;
    readonly classList: string[];
    style: SyntheticCSSStyle;
    text: string;
    focus(): void;
    blur(): void;
    className: string;
    class: string;
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    innerHTML: string;
    readonly outerHTML: string;
    private _resetStyleFromAttribute();
    private _resetStyleProxy();
    protected onStyleChange(): void;
    protected computeCapabilities(style: SyntheticCSSStyle): VisibleDOMNodeCapabilities;
    protected computeAbsoluteBounds(style: SyntheticCSSStyle): BoundingRect;
    setAbsolutePosition({left, top}: IPoint): void;
    setAbsoluteBounds(newBounds: BoundingRect): void;
}
