import { Directive } from 'vue';
interface HTMLElementWithCopy extends HTMLElement {
    __copyHandler__?: () => void;
}
/**
 * Directiva para copiar texto al portapapeles al hacer clic.
 *
 * @type {Directive<HTMLElementWithCopy, string>}
 */
export declare const vCopy: Directive<HTMLElementWithCopy, string>;
export {};
