//#region src/directives/click-outside.directive.ts
var e = {
	mounted(e, t) {
		let n = (n) => {
			let r = n.target;
			e === r || e.contains(r) || t.value(n);
		};
		e.__clickOutsideHandler__ = n, document.addEventListener("click", n);
	},
	unmounted(e) {
		e.__clickOutsideHandler__ && (document.removeEventListener("click", e.__clickOutsideHandler__), delete e.__clickOutsideHandler__);
	}
}, t = {
	mounted(e, t) {
		let n = new IntersectionObserver((n, r) => {
			n.forEach((n) => {
				n.isIntersecting && (e.src = t.value, r.unobserve(e));
			});
		}, {
			rootMargin: "50px 0px",
			threshold: .01
		});
		e.__imageObserver__ = n, n.observe(e);
	},
	unmounted(e) {
		e.__imageObserver__ && (e.__imageObserver__.disconnect(), delete e.__imageObserver__);
	}
}, n = "kaax-ripple", r = 2, i = {
	mounted(e, t) {
		if (!(t.value ?? !0)) return;
		e.style.position = "relative", e.style.overflow = "hidden";
		function i(t) {
			let i = e.getBoundingClientRect(), a = t.clientX - i.left, o = t.clientY - i.top, s = Math.max(i.width, i.height), c = s / r, l = document.createElement("span");
			l.style.width = `${s}px`, l.style.height = `${s}px`, l.style.left = `${a - c}px`, l.style.top = `${o - c}px`, l.classList.add(n);
			let u = e.querySelector(`.${n}`);
			u && u.remove(), e.appendChild(l);
			function d() {
				l.removeEventListener("animationend", d), l.remove();
			}
			l.addEventListener("animationend", d);
		}
		e.__rippleClickHandler__ = i, e.addEventListener("click", i);
	},
	unmounted(e) {
		e.__rippleClickHandler__ && (e.removeEventListener("click", e.__rippleClickHandler__), delete e.__rippleClickHandler__);
	}
}, a = 8, o = 12;
function s(e, t) {
	let n = t.offsetWidth, r = t.offsetHeight, i = window.innerWidth, s = window.scrollY, c = window.scrollX, l = e.top + s - r - a;
	e.top - r - a < o && (l = e.bottom + s + a);
	let u = e.left + c + e.width / 2 - n / 2;
	u < o + c && (u = o + c);
	let d = i + c - n - o;
	return u > d && (u = d), {
		top: l,
		left: u
	};
}
var c = {
	mounted(e, t) {
		if (!t.value) return;
		function n(e) {
			let t = document.createElement("div");
			return t.className = "smart-tooltip", t.textContent = e, t.style.position = "absolute", t.style.backgroundColor = "#0f172a", t.style.color = "#f8fafc", t.style.padding = "0.375rem 0.75rem", t.style.borderRadius = "0.375rem", t.style.fontSize = "0.75rem", t.style.lineHeight = "1rem", t.style.zIndex = "9999", t.style.pointerEvents = "none", t.style.whiteSpace = "nowrap", t.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)", t;
		}
		function r() {
			if (e.__tooltipElement__) return;
			let r = n(t.value);
			e.__tooltipElement__ = r, document.body.appendChild(r);
			let i = s(e.getBoundingClientRect(), r);
			r.style.top = `${i.top}px`, r.style.left = `${i.left}px`;
		}
		function i() {
			e.__tooltipElement__ && (e.__tooltipElement__.remove(), delete e.__tooltipElement__);
		}
		e.__mouseenterHandler__ = r, e.__mouseleaveHandler__ = i, e.addEventListener("mouseenter", r), e.addEventListener("mouseleave", i);
	},
	updated(e, t) {
		e.__tooltipElement__ && t.value && (e.__tooltipElement__.textContent = t.value);
	},
	unmounted(e) {
		e.__mouseleaveHandler__ && e.__mouseleaveHandler__(), e.__mouseenterHandler__ && (e.removeEventListener("mouseenter", e.__mouseenterHandler__), delete e.__mouseenterHandler__), e.__mouseleaveHandler__ && (e.removeEventListener("mouseleave", e.__mouseleaveHandler__), delete e.__mouseleaveHandler__);
	}
}, l = {
	mounted(e, t) {
		function n() {
			let e = t.value;
			e && navigator.clipboard.writeText(e).catch((e) => {
				console.error("Error al copiar el texto al portapapeles:", e);
			});
		}
		e.__copyHandler__ = n, e.addEventListener("click", n);
	},
	updated(e, t) {
		t.oldValue;
	},
	unmounted(e) {
		e.__copyHandler__ && (e.removeEventListener("click", e.__copyHandler__), delete e.__copyHandler__);
	}
};
//#endregion
//#region src/index.ts
Promise.resolve({               });
//#endregion
export { e as vClickOutside, l as vCopy, t as vLazyLoad, i as vRipple, c as vTooltip };
