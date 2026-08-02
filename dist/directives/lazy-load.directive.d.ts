import { Directive } from 'vue';
interface HTMLImageElementWithObserver extends HTMLImageElement {
    __imageObserver__?: IntersectionObserver;
}
/**
 * Directiva para cargar imágenes de manera diferida mediante IntersectionObserver.
 *
 * @type {Directive<HTMLImageElementWithObserver, string>}
 */
export declare const vLazyLoad: Directive<HTMLImageElementWithObserver, string>;
export {};
