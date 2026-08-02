import type { Directive, DirectiveBinding } from 'vue';

interface HTMLElementWithCopy extends HTMLElement {
  __copyHandler__?: () => void;
}

/**
 * Directiva para copiar texto al portapapeles al hacer clic.
 *
 * @type {Directive<HTMLElementWithCopy, string>}
 */
export const vCopy: Directive<HTMLElementWithCopy, string> = {
  mounted(
    element: HTMLElementWithCopy,
    binding: DirectiveBinding<string>,
  ): void {
    function handleCopy(): void {
      const textToCopy: string = binding.value;

      if (!textToCopy) {
        return;
      }

      navigator.clipboard.writeText(textToCopy).catch((error: unknown) => {
        console.error('Error al copiar el texto al portapapeles:', error);
      });
    }

    element.__copyHandler__ = handleCopy;
    element.addEventListener('click', handleCopy);
  },

  updated(
    element: HTMLElementWithCopy,
    binding: DirectiveBinding<string>,
  ): void {
    // Actualiza la referencia si la expresión reactiva cambia
    binding.oldValue;
  },

  unmounted(element: HTMLElementWithCopy): void {
    if (element.__copyHandler__) {
      element.removeEventListener('click', element.__copyHandler__);
      delete element.__copyHandler__;
    }
  },
};
