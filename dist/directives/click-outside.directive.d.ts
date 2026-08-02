import { Directive } from 'vue';
interface HTMLElementWithClickOutside extends HTMLElement {
    __clickOutsideHandler__?: (event: MouseEvent) => void;
}
/**
 * Directiva para ejecutar un callback al hacer clic fuera del elemento binding.
 *
 * @type {Directive<HTMLElementWithClickOutside, (event: MouseEvent) => void>}
 */
export declare const vClickOutside: Directive<HTMLElementWithClickOutside, (event: MouseEvent) => void>;
export {};
