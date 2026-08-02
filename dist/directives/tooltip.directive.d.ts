import { Directive } from 'vue';
interface HTMLElementWithTooltip extends HTMLElement {
    __tooltipElement__?: HTMLDivElement;
    __mouseenterHandler__?: () => void;
    __mouseleaveHandler__?: () => void;
}
/**
 * Directiva para desplegar un tooltip flotante inteligente con prevención de colisiones con el viewport.
 *
 * @type {Directive<HTMLElementWithTooltip, string>}
 */
export declare const vTooltip: Directive<HTMLElementWithTooltip, string>;
export {};
