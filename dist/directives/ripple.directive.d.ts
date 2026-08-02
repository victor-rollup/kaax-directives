import { Directive } from 'vue';
/**
 * Extensión de la interfaz HTMLElement para almacenar la referencia limpia
 * del escuchador de eventos de clic en el nodo HTML.
 */
interface HTMLElementWithRipple extends HTMLElement {
    __rippleClickHandler__?: (event: MouseEvent) => void;
}
/**
 * Directiva personalizada para generar un efecto visual de onda (ripple) al hacer clic en un elemento.
 *
 * @type {Directive<HTMLElementWithRipple, boolean>}
 */
export declare const vRipple: Directive<HTMLElementWithRipple, boolean>;
export {};
