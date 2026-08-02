import type { Directive, DirectiveBinding } from 'vue';

interface HTMLElementWithClickOutside extends HTMLElement {
  __clickOutsideHandler__?: (event: MouseEvent) => void;
}

/**
 * Directiva para ejecutar un callback al hacer clic fuera del elemento binding.
 *
 * @type {Directive<HTMLElementWithClickOutside, (event: MouseEvent) => void>}
 */
export const vClickOutside: Directive<
  HTMLElementWithClickOutside,
  (event: MouseEvent) => void
> = {
  mounted(
    element: HTMLElementWithClickOutside,
    binding: DirectiveBinding<(event: MouseEvent) => void>,
  ): void {
    const handleClickOutside = (event: MouseEvent): void => {
      const targetElement = event.target as Node;
      if (!(element === targetElement || element.contains(targetElement))) {
        binding.value(event);
      }
    };

    element.__clickOutsideHandler__ = handleClickOutside;
    document.addEventListener('click', handleClickOutside);
  },

  unmounted(element: HTMLElementWithClickOutside): void {
    if (element.__clickOutsideHandler__) {
      document.removeEventListener('click', element.__clickOutsideHandler__);
      delete element.__clickOutsideHandler__;
    }
  },
};
