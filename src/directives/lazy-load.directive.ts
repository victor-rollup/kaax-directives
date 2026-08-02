import type { Directive, DirectiveBinding } from 'vue';

interface HTMLImageElementWithObserver extends HTMLImageElement {
  __imageObserver__?: IntersectionObserver;
}

/**
 * Directiva para cargar imágenes de manera diferida mediante IntersectionObserver.
 *
 * @type {Directive<HTMLImageElementWithObserver, string>}
 */
export const vLazyLoad: Directive<HTMLImageElementWithObserver, string> = {
  mounted(
    element: HTMLImageElementWithObserver,
    binding: DirectiveBinding<string>,
  ): void {
    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ): void => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          element.src = binding.value;
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '50px 0px',
      threshold: 0.01,
    });

    element.__imageObserver__ = observer;
    observer.observe(element);
  },

  unmounted(element: HTMLImageElementWithObserver): void {
    if (element.__imageObserver__) {
      element.__imageObserver__.disconnect();
      delete element.__imageObserver__;
    }
  },
};
