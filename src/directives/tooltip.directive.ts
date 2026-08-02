import type { Directive, DirectiveBinding } from 'vue';

/** Distancia en píxeles entre el elemento objetivo y el tooltip */
const TOOLTIP_OFFSET_PIXELS = 8;

/** Margen mínimo de seguridad respecto al borde de la pantalla */
const VIEWPORT_PADDING_PIXELS = 12;

interface HTMLElementWithTooltip extends HTMLElement {
  __tooltipElement__?: HTMLDivElement;
  __mouseenterHandler__?: () => void;
  __mouseleaveHandler__?: () => void;
}

/**
 * Calcula las coordenadas óptimas para posicionar el tooltip dentro del viewport.
 *
 * @param {DOMRect} targetRectangle - Dimensiones y posición del elemento objetivo.
 * @param {HTMLDivElement} tooltipElement - Elemento HTML del tooltip para medir su dimensión real.
 * @returns {{ top: number; left: number }} Objeto con las coordenadas X e Y calculadas.
 */
function calculateTooltipPosition(
  targetRectangle: DOMRect,
  tooltipElement: HTMLDivElement
): { top: number; left: number } {
  const tooltipWidth: number = tooltipElement.offsetWidth;
  const tooltipHeight: number = tooltipElement.offsetHeight;

  const windowWidth: number = window.innerWidth;
  const windowScrollY: number = window.scrollY;
  const windowScrollX: number = window.scrollX;

  // Intentar posicionar arriba por defecto
  let topPosition: number = targetRectangle.top + windowScrollY - tooltipHeight - TOOLTIP_OFFSET_PIXELS;

  // Si sobrepasa el borde superior de la pantalla, posicionar abajo
  if (targetRectangle.top - tooltipHeight - TOOLTIP_OFFSET_PIXELS < VIEWPORT_PADDING_PIXELS) {
    topPosition = targetRectangle.bottom + windowScrollY + TOOLTIP_OFFSET_PIXELS;
  }

  // Centrar horizontalmente respecto al elemento objetivo
  let leftPosition: number = targetRectangle.left + windowScrollX + (targetRectangle.width / 2) - (tooltipWidth / 2);

  // Ajuste de seguridad horizontal en el borde izquierdo
  if (leftPosition < VIEWPORT_PADDING_PIXELS + windowScrollX) {
    leftPosition = VIEWPORT_PADDING_PIXELS + windowScrollX;
  }

  // Ajuste de seguridad horizontal en el borde derecho
  const maxAllowedLeftPosition: number = windowWidth + windowScrollX - tooltipWidth - VIEWPORT_PADDING_PIXELS;
  if (leftPosition > maxAllowedLeftPosition) {
    leftPosition = maxAllowedLeftPosition;
  }

  return {
    top: topPosition,
    left: leftPosition
  };
}

/**
 * Directiva para desplegar un tooltip flotante inteligente con prevención de colisiones con el viewport.
 *
 * @type {Directive<HTMLElementWithTooltip, string>}
 */
export const vTooltip: Directive<HTMLElementWithTooltip, string> = {
  mounted(element: HTMLElementWithTooltip, binding: DirectiveBinding<string>): void {
    if (!binding.value) {
      return;
    }

    function createTooltipElement(textContent: string): HTMLDivElement {
      const tooltip = document.createElement('div');
      tooltip.className = 'smart-tooltip';
      tooltip.textContent = textContent;
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = '#0f172a';
      tooltip.style.color = '#f8fafc';
      tooltip.style.padding = '0.375rem 0.75rem';
      tooltip.style.borderRadius = '0.375rem';
      tooltip.style.fontSize = '0.75rem';
      tooltip.style.lineHeight = '1rem';
      tooltip.style.zIndex = '9999';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.whiteSpace = 'nowrap';
      tooltip.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      return tooltip;
    }

    function showTooltip(): void {
      if (element.__tooltipElement__) {
        return;
      }

      const tooltip = createTooltipElement(binding.value);
      element.__tooltipElement__ = tooltip;
      document.body.appendChild(tooltip);

      const targetRectangle: DOMRect = element.getBoundingClientRect();
      const coordinates = calculateTooltipPosition(targetRectangle, tooltip);

      tooltip.style.top = `${coordinates.top}px`;
      tooltip.style.left = `${coordinates.left}px`;
    }

    function hideTooltip(): void {
      if (element.__tooltipElement__) {
        element.__tooltipElement__.remove();
        delete element.__tooltipElement__;
      }
    }

    element.__mouseenterHandler__ = showTooltip;
    element.__mouseleaveHandler__ = hideTooltip;

    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  },

  updated(element: HTMLElementWithTooltip, binding: DirectiveBinding<string>): void {
    if (element.__tooltipElement__ && binding.value) {
      element.__tooltipElement__.textContent = binding.value;
    }
  },

  unmounted(element: HTMLElementWithTooltip): void {
    if (element.__mouseleaveHandler__) {
      element.__mouseleaveHandler__();
    }
    if (element.__mouseenterHandler__) {
      element.removeEventListener('mouseenter', element.__mouseenterHandler__);
      delete element.__mouseenterHandler__;
    }
    if (element.__mouseleaveHandler__) {
      element.removeEventListener('mouseleave', element.__mouseleaveHandler__);
      delete element.__mouseleaveHandler__;
    }
  }
};