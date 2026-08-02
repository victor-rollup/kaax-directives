import type { Directive, DirectiveBinding } from 'vue';

/** Nombre de la clase CSS asignada al elemento span de la onda */
const RIPPLE_ELEMENT_CLASS_NAME = 'kaax-ripple';

/** Divisor utilizado para calcular el radio del círculo */
const DIAMETER_TO_RADIUS_DIVISOR = 2;

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
export const vRipple: Directive<HTMLElementWithRipple, boolean> = {
  mounted(targetElement: HTMLElementWithRipple, binding: DirectiveBinding<boolean>): void {
    const isRippleEnabled: boolean = binding.value ?? true;

    if (!isRippleEnabled) {
      return;
    }

    // Garantizar posicionamiento relativo y desborde oculto en el contenedor
    targetElement.style.position = 'relative';
    targetElement.style.overflow = 'hidden';

    /**
     * Maneja el evento de clic sobre el elemento objetivo y calcula las coordenadas de la onda.
     *
     * @param {MouseEvent} event - Evento del cursor generado al hacer clic.
     * @returns {void}
     */
    function handleElementClick(event: MouseEvent): void {
      const boundingRectangle: DOMRect = targetElement.getBoundingClientRect();

      // Calcular la coordenada central del clic relativa al elemento
      const positionX: number = event.clientX - boundingRectangle.left;
      const positionY: number = event.clientY - boundingRectangle.top;

      // Determinar el diámetro del ripple basado en la mayor dimensión del elemento
      const elementDiameter: number = Math.max(boundingRectangle.width, boundingRectangle.height);
      const elementRadius: number = elementDiameter / DIAMETER_TO_RADIUS_DIVISOR;

      // Crear el nodo HTML de la onda
      const rippleCircleElement: HTMLSpanElement = document.createElement('span');
      rippleCircleElement.style.width = `${elementDiameter}px`;
      rippleCircleElement.style.height = `${elementDiameter}px`;
      rippleCircleElement.style.left = `${positionX - elementRadius}px`;
      rippleCircleElement.style.top = `${positionY - elementRadius}px`;
      rippleCircleElement.classList.add(RIPPLE_ELEMENT_CLASS_NAME);

      // Si ya existía una onda anterior en progreso, la removemos preventivamente
      const existingRippleElement: Element | null = targetElement.querySelector(`.${RIPPLE_ELEMENT_CLASS_NAME}`);
      if (existingRippleElement) {
        existingRippleElement.remove();
      }

      targetElement.appendChild(rippleCircleElement);

      /**
       * Limpia y remueve el nodo HTML de la onda al finalizar su animación CSS.
       *
       * @returns {void}
       */
      function handleAnimationEnd(): void {
        rippleCircleElement.removeEventListener('animationend', handleAnimationEnd);
        rippleCircleElement.remove();
      }

      rippleCircleElement.addEventListener('animationend', handleAnimationEnd);
    }

    targetElement.__rippleClickHandler__ = handleElementClick;
    targetElement.addEventListener('click', handleElementClick);
  },

  unmounted(targetElement: HTMLElementWithRipple): void {
    if (targetElement.__rippleClickHandler__) {
      targetElement.removeEventListener('click', targetElement.__rippleClickHandler__);
      delete targetElement.__rippleClickHandler__;
    }
  }
};