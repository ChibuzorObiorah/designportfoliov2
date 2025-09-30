import { createHead } from "@unhead/vue/server";
import { defineComponent, ref, onMounted, createSSRApp } from "vue";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation, Link, useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
const ClientOnly = defineComponent({
  setup(props, { slots }) {
    const mounted = ref(false);
    onMounted(() => mounted.value = true);
    return () => {
      if (!mounted.value)
        return slots.placeholder && slots.placeholder({});
      return slots.default && slots.default({});
    };
  }
});
function ViteSSG(App2, fn, options) {
  const {
    transformState,
    registerComponents = true,
    useHead = true,
    rootContainer = "#app"
  } = {};
  async function createApp$1() {
    const app = createSSRApp(App2);
    let head;
    if (useHead) {
      app.use(head = createHead());
    }
    const appRenderCallbacks = [];
    const onSSRAppRendered = (cb) => appRenderCallbacks.push(cb);
    const triggerOnSSRAppRendered = () => {
      return Promise.all(appRenderCallbacks.map((cb) => cb()));
    };
    const context = {
      app,
      head,
      isClient: false,
      router: void 0,
      routes: void 0,
      initialState: {},
      onSSRAppRendered,
      triggerOnSSRAppRendered,
      transformState
    };
    if (registerComponents)
      app.component("ClientOnly", ClientOnly);
    await (fn == null ? void 0 : fn(context));
    const initialState = context.initialState;
    return {
      ...context,
      initialState
    };
  }
  return createApp$1;
}
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref: ref2,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref2) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref: ref2,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref: ref2,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref: ref2,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref: ref2,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref: ref2,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref2) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref: ref2,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const Navbar = ({ state = "Rest" }) => {
  const [scrollState, setScrollState] = useState(
    "Rest"
  );
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedTab, setSelectedTab] = useState("work");
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setScrollState("Rest");
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
        setScrollState("On Scroll Up");
      } else if (currentScrollY <= 100) {
        setIsVisible(true);
        setScrollState("Rest");
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  useEffect(() => {
    if (location.pathname === "/about") {
      setSelectedTab("about");
    } else if (location.pathname === "/") {
      setSelectedTab("work");
    } else {
      setSelectedTab(null);
    }
  }, [location.pathname]);
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const logo = /* @__PURE__ */ jsx(
    Link,
    {
      to: "/",
      className: "flex items-center justify-center px-6 py-2 cursor-pointer",
      onClick: () => handleTabClick("work"),
      children: /* @__PURE__ */ jsx("div", { className: "font-['Rubik_Mono_One'] text-[14px] text-fg-1 tracking-[-0.28px]", children: "CHIB" })
    }
  );
  const toggleOptions = /* @__PURE__ */ jsxs("div", { className: "glass-toggle", "data-selected": selectedTab, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `toggle-option ${selectedTab === "work" ? "active" : ""}`,
        onClick: () => handleTabClick("work"),
        children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-[12px] font-['IBM_Plex_Mono'] tracking-[-0.24px] uppercase font-medium", children: "WORK" })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `toggle-option ${selectedTab === "about" ? "active" : ""}`,
        onClick: () => handleTabClick("about"),
        children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-[12px] font-['IBM_Plex_Mono'] tracking-[-0.24px] uppercase font-medium", children: "ABOUT" })
      }
    )
  ] });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `fixed top-0 left-0 right-0 w-full z-50 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-[56px] sm:px-[72px] md:px-[88px] lg:px-[100px] py-6 relative w-full mx-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "glass-container", children: logo }),
        toggleOptions
      ] })
    }
  );
};
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
function StaticHero({ isMobile = false }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const fontLoadTimeout = setTimeout(() => {
      if (isMounted) setFontLoaded(true);
    }, 1e3);
    async function loadFont() {
      try {
        await document.fonts.load("900 100px 'Rubik Mono One'");
        if (isMounted) {
          clearTimeout(fontLoadTimeout);
          setFontLoaded(true);
        }
      } catch (e) {
        console.warn("Font loading failed in StaticHero, using fallback:", e);
        if (isMounted) {
          clearTimeout(fontLoadTimeout);
          setFontLoaded(true);
        }
      }
    }
    loadFont();
    return () => {
      isMounted = false;
      clearTimeout(fontLoadTimeout);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full flex flex-col items-center justify-center bg-[#020b0d]", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `transition-opacity duration-500 ${fontLoaded ? "opacity-100" : "opacity-0"}`,
        style: {
          fontFamily: "'Rubik Mono One', 'Courier New', monospace",
          fontSize: isMobile ? "50px" : "100px",
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          textShadow: "0 0 20px rgba(255, 248, 76, 0.3), 0 0 40px rgba(255, 248, 76, 0.2)",
          letterSpacing: "0.05em"
        },
        children: "CHIBUZOR"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020b0d]/20 pointer-events-none" })
  ] });
}
function ParticleHero() {
  const canvasRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [canvasSupported, setCanvasSupported] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  useEffect(() => {
    function detectCanvasSupport() {
      try {
        const testCanvas = document.createElement("canvas");
        const testCtx = testCanvas.getContext("2d");
        if (!testCtx) {
          console.warn("Canvas 2D context not available, using fallback");
          setCanvasSupported(false);
          setShowFallback(true);
          return false;
        }
        console.log("Canvas support detected");
        return true;
      } catch (e) {
        console.warn("Canvas detection failed:", e);
        setCanvasSupported(false);
        setShowFallback(true);
        return false;
      }
    }
    detectCanvasSupport();
  }, []);
  useEffect(() => {
    if (!canvasSupported) return;
    let isMounted = true;
    const fontLoadTimeout = setTimeout(() => {
      console.log("Font load timeout (1s), proceeding with fallback fonts");
      if (isMounted) setFontLoaded(true);
    }, 1e3);
    async function loadFontAndStart() {
      console.log("Starting font load...");
      try {
        await document.fonts.load("900 100px 'Rubik Mono One'");
        await document.fonts.ready;
        console.log("Font loaded successfully");
        if (isMounted) {
          clearTimeout(fontLoadTimeout);
          setFontLoaded(true);
        }
      } catch (e) {
        console.warn("Font loading failed, using system fallback:", e);
        if (isMounted) {
          clearTimeout(fontLoadTimeout);
          setFontLoaded(true);
        }
      }
    }
    loadFontAndStart();
    return () => {
      isMounted = false;
      clearTimeout(fontLoadTimeout);
    };
  }, [canvasSupported]);
  useEffect(() => {
    if (!fontLoaded || !canvasSupported) return;
    console.log("Initializing canvas...");
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found, switching to fallback");
      setShowFallback(true);
      return;
    }
    let ctx = null;
    try {
      ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Canvas 2D context not available, switching to fallback");
        setShowFallback(true);
        return;
      }
      console.log("Canvas initialized successfully");
    } catch (e) {
      console.error("Canvas context creation failed:", e);
      setShowFallback(true);
      return;
    }
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7;
      setIsMobile(window.innerWidth < 768);
    };
    updateCanvasSize();
    let particles = [];
    let textImageData = null;
    function createTextImage() {
      if (!ctx || !canvas) return 0;
      ctx.fillStyle = "white";
      ctx.save();
      const textSize = isMobile ? 50 : 100;
      ctx.font = `900 ${textSize}px 'Rubik Mono One', 'Courier New', 'Monaco', 'Menlo', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CHIBUZOR", canvas.width / 2, canvas.height / 2);
      ctx.restore();
      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return textSize / 160;
    }
    function createParticle(scale2) {
      if (!ctx || !canvas || !textImageData) return null;
      const data = textImageData.data;
      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "white",
            scatteredColor: "#fff84c",
            life: Math.random() * 100 + 50
          };
        }
      }
      return null;
    }
    function createInitialParticles(scale2) {
      if (!canvas) return;
      const baseParticleCount = 7e3;
      const particleCount = Math.floor(
        baseParticleCount * Math.sqrt(canvas.width * canvas.height / (1920 * 1080))
      );
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        if (particle) particles.push(particle);
      }
    }
    let animationFrameId;
    function animate(scale2) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#020b0d";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      const maxDistance = 240;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * 60;
          const moveY = Math.sin(angle) * force * 60;
          p.x = p.baseX - moveX;
          p.y = p.baseY - moveY;
          ctx.fillStyle = p.scatteredColor;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
          ctx.fillStyle = "white";
        }
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.life--;
        if (p.life <= 0) {
          const newParticle = createParticle();
          if (newParticle) {
            particles[i] = newParticle;
          } else {
            particles.splice(i, 1);
            i--;
          }
        }
      }
      const baseParticleCount = 7e3;
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt(canvas.width * canvas.height / (1920 * 1080))
      );
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle();
        if (newParticle) particles.push(newParticle);
      }
      animationFrameId = requestAnimationFrame(() => animate());
    }
    createTextImage();
    createInitialParticles();
    animate();
    const handleResize = () => {
      updateCanvasSize();
      createTextImage();
      particles = [];
      createInitialParticles();
    };
    const handleMove = (x, y) => {
      mousePositionRef.current = { x, y };
    };
    const handleMouseMove = (e) => {
      handleMove(e.clientX, e.clientY);
    };
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchStart = () => {
      isTouchingRef.current = true;
    };
    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      mousePositionRef.current = { x: 0, y: 0 };
    };
    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 };
      }
    };
    window.addEventListener("resize", handleResize);
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
      canvas.addEventListener("mouseleave", handleMouseLeave);
      canvas.addEventListener("touchstart", handleTouchStart);
      canvas.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, fontLoaded, canvasSupported]);
  if (showFallback || !canvasSupported) {
    return /* @__PURE__ */ jsx(StaticHero, { isMobile });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "relative w-full h-full flex flex-col items-center justify-center",
      "data-oid": "kl:ac:4",
      children: /* @__PURE__ */ jsx(
        "canvas",
        {
          ref: canvasRef,
          className: "w-full h-full absolute top-0 left-0 touch-none",
          "aria-label": "Interactive particle effect with Chibuzor name",
          "data-oid": "0a_xdb8"
        }
      )
    }
  );
}
function WorkCard({
  title = "Upscale in Designer",
  description = "Insert short description for the project",
  videoSrc,
  videoAlt = "Project video thumbnail",
  className,
  caseStudyLink
}) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (caseStudyLink) {
      navigate(caseStudyLink);
    }
  };
  const isImage = (src) => {
    if (!src) return false;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    return imageExtensions.some((ext) => src.toLowerCase().endsWith(ext));
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "group relative w-full rounded-xl overflow-hidden",
        caseStudyLink ? "cursor-pointer" : "cursor-default",
        className
      ),
      onClick: handleCardClick,
      "data-oid": "4pmrqey",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-full h-full bg-bg-2 rounded-xl overflow-hidden",
            "data-oid": "bt_-q3p",
            children: videoSrc && (isImage(videoSrc) ? /* @__PURE__ */ jsx(
              "img",
              {
                src: videoSrc,
                alt: videoAlt,
                className: "w-full h-full object-cover transform scale-105 group-hover:blur-sm transition-all duration-300",
                "data-oid": "ny_c509"
              }
            ) : /* @__PURE__ */ jsx(
              "video",
              {
                src: videoSrc,
                "aria-label": videoAlt,
                className: "w-full h-full object-cover transform scale-105 group-hover:blur-sm transition-all duration-300",
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                "data-oid": "ny_c509"
              }
            ))
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-bg-1 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-xl" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 w-[60%] flex flex-col gap-3 items-start justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "data-oid": "wp2aqee",
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex flex-col gap-2 items-start justify-start w-full",
                "data-oid": "k435fmj",
                children: [
                  /* @__PURE__ */ jsx(
                    "h3",
                    {
                      className: "font-ibm-plex-condensed text-title-3 text-fg-1 tracking-[-0.48px]",
                      "data-oid": "v95s856",
                      children: title
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "font-ibm-plex text-body-1 text-fg-1 max-w-[470px]",
                      "data-oid": "3mog6u3",
                      children: description
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
}
const allProjects = [
  {
    title: "Shortcutter.io",
    description: "Built a game to help users master keyboard shortcuts through muscle memory, to make learning efficient, and fun.",
    videoSrc: "/assets/shortcutter/shortcutter-prototype.mp4"
    // caseStudyLink: "/shortcutter-case-study", // Disabled - page not ready
  },
  {
    title: "Tidy up for OneNote Canvas",
    description: "Designed a one-click feature to tidy up the OneNote canvas, to help users relaize value with AI with less effort.",
    videoSrc: "/assets/copilotcanvas/tidyup_prototype.mp4"
    // caseStudyLink: "/tidyup-case-study", // Disabled - page not ready
  },
  {
    title: "Upscale in Copilot",
    description: "Designed an AI-powered image enhancement tool in one click, resulting in high engagement with users",
    videoSrc: "/assets/upscale/upscale-prototype.mp4"
    // caseStudyLink: "/upscale-case-study", // Disabled - page not ready
  },
  {
    title: "Copilot Scoping in OneNote",
    description: "Helping users understand the scope of LLMs in OneNote, increasing user adoption and satisfaction.",
    videoSrc: "/assets/copilotscoping/scopingUI.mp4",
    caseStudyLink: "/copilot-context"
  },
  {
    title: "Copilot on Canvas",
    description: "Crafted an engaging Copilot experience on OneNote Canvas, significantly boosting user adoption",
    videoSrc: "/assets/copilotcanvas/rewrite.mp4",
    caseStudyLink: "/copilot-canvas"
  },
  {
    title: "Visualis",
    description: "Built a web app that transforms written stories into visually consistent, cinematic image sequences using OpenAI API",
    videoSrc: "/assets/visualis/visualis-prototype.mp4"
    // caseStudyLink: "/visualis-case-study", // Disabled - page not ready
  },
  {
    title: "iOS Home in OneNote",
    description: "Designed the OneNote iOS app to make it easy for users to capture and retrieve notes faster, increasing usage and retention.",
    videoSrc: "/assets/ioshome/fullflow-ioshome.mp4",
    caseStudyLink: "/case-study"
  },
  {
    title: "ThredUp Checkout",
    description: "Revamped the checkout process for the Thredup appto significantly decrease the drop-off rate",
    videoSrc: "/assets/thredup/thredup-thumbnail.png",
    caseStudyLink: "/thredup-case-study"
  }
];
const projectsWithCaseStudies = allProjects.filter(
  (project) => project.caseStudyLink
);
const getOtherCaseStudyProjects = (currentProjectTitle, limit = 2) => {
  return projectsWithCaseStudies.filter((project) => project.title !== currentProjectTitle).slice(0, limit);
};
const gridLayout = [
  [4, 6],
  [7, 3],
  [2, 0],
  [1, 5]
];
const PortfolioGrid = () => {
  const [showGrid, setShowGrid] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGrid(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: `w-full px-[56px] sm:px-[72px] md:px-[88px] lg:px-[100px] py-6 transition-all duration-1000 ease-out ${showGrid ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
      "data-oid": "hvnhpbb",
      children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-[1400px] mx-auto", "data-oid": "r9c34h1", children: gridLayout.map((row, rowIndex) => /* @__PURE__ */ jsxs("div", { children: [
        rowIndex === 2 && /* @__PURE__ */ jsx("div", { className: "w-full py-12", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-rubik-mono-one text-[36px] text-fg-1 mb-2", children: "Reels" }),
          /* @__PURE__ */ jsx("p", { className: "text-caption-1 text-fg-2 uppercase", children: "CASE STUDIES COMING SOON" })
        ] }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex flex-col ${row.length > 1 ? "lg:flex-row" : ""} gap-12 pb-16`,
            "data-oid": "nfr8ot2",
            children: row.map((projectIndex) => {
              let widthClass = "w-full";
              if (row.length > 1) {
                if (rowIndex === 0 && projectIndex === 4) {
                  widthClass = "w-[60%]";
                } else if (rowIndex === 0 && projectIndex === 6) {
                  widthClass = "w-[40%]";
                } else if (rowIndex === 1 && projectIndex === 7) {
                  widthClass = "w-[40%]";
                } else if (rowIndex === 1 && projectIndex === 3) {
                  widthClass = "w-[60%]";
                } else if (rowIndex === 2 && projectIndex === 5) {
                  widthClass = "w-[60%]";
                } else if (rowIndex === 2 && projectIndex === 0) {
                  widthClass = "w-[40%]";
                } else if (rowIndex === 3 && projectIndex === 2) {
                  widthClass = "w-[60%]";
                } else if (rowIndex === 3 && projectIndex === 1) {
                  widthClass = "w-[40%]";
                } else {
                  widthClass = "flex-1";
                }
              }
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: widthClass,
                  "data-oid": "zf.jo65",
                  children: /* @__PURE__ */ jsx(WorkCard, { ...allProjects[projectIndex], "data-oid": "skt8sfd" })
                },
                projectIndex
              );
            })
          }
        )
      ] }, rowIndex)) })
    }
  );
};
const TexturedFooter = () => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "relative w-full h-[265px] overflow-hidden",
      "data-name": "Textured-footer",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
          style: {
            backgroundImage: "url('/footer-img/textured-footer.png')"
          },
          "data-name": "Texture-img"
        }
      )
    }
  );
};
const Footer = () => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "bg-bg-1 flex flex-col gap-[24px] items-start relative w-full pt-[80px]",
      "data-name": "Footer",
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[24px] rounded-[16px] w-full",
            "data-name": "Footermenu",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex gap-[16px] items-center",
                  "data-name": "Menu-Items",
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "font-ibm-plex-mono font-semibold leading-[0] text-fg-2 text-[12px] sm:text-[14px] text-nowrap tracking-[-0.28px]",
                      children: /* @__PURE__ */ jsx("p", { className: "leading-[normal] whitespace-pre", children: "2025 CHIBUZOR OBIORAH" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex font-ibm-plex-mono font-semibold gap-[8px] sm:gap-[12px] md:gap-[16px] items-center leading-[0] text-fg-2 text-[12px] sm:text-[14px] text-nowrap tracking-[-0.28px]",
                  "data-name": "Menu-Items",
                  children: [
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "mailto:obiorahchibuzor3@gmail.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity",
                        children: /* @__PURE__ */ jsx("p", { className: "leading-[normal] text-nowrap whitespace-pre", children: "EMAIL" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "https://www.linkedin.com/in/chibobi/",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity",
                        children: /* @__PURE__ */ jsx("p", { className: "leading-[normal] text-nowrap whitespace-pre", children: "LINKEDIN" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "https://drive.google.com/file/d/1QGsf-0iKpV6G5IJLTIx2FistmSfOX0x5/view?usp=drive_link",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity",
                        children: /* @__PURE__ */ jsx("p", { className: "leading-[normal] text-nowrap whitespace-pre", children: "RESUME" })
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(TexturedFooter, {}) })
      ]
    }
  );
};
const Index = ({ isInitialLoad }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-bg-1 font-ibm-plex", children: [
    /* @__PURE__ */ jsx("section", { className: "w-full h-[60vh] relative overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: `absolute inset-0 z-10 transition-opacity duration-700 ease-out ${mounted ? "opacity-100" : "opacity-0"}`, children: /* @__PURE__ */ jsx(ParticleHero, {}) }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-2 mb-16 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: `text-center space-y-2 transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [
      /* @__PURE__ */ jsx("p", { className: "font-['IBM_Plex_Mono'] text-[12px] sm:text-[14px] md:text-[16px] text-fg-2 tracking-[-0.24px] uppercase", children: "PRODUCT DESIGNER AT MICROSOFT, IN NYC" }),
      /* @__PURE__ */ jsx("p", { className: "font-['IBM_Plex_Mono'] text-[12px] sm:text-[14px] md:text-[16px] text-fg-2 tracking-[-0.24px] uppercase", children: "MOST ENERGIZED WHEN ALIGNED TO THE MISSION" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `transition-all duration-700 ease-out delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [
      /* @__PURE__ */ jsx(PortfolioGrid, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    delay = 0
  } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay]);
  return { isVisible, elementRef };
};
const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  animation = "fade-up"
}) => {
  const { isVisible, elementRef } = useScrollReveal({ delay, triggerOnce: true });
  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out";
    switch (animation) {
      case "fade-up":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;
      case "fade-in":
        return `${baseClasses} ${isVisible ? "opacity-100" : "opacity-0"}`;
      case "slide-left":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`;
      case "slide-right":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`;
      default:
        return `${baseClasses} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: elementRef,
      className: `${getAnimationClasses()} ${className}`,
      children
    }
  );
};
const TextBlock = ({
  title,
  content,
  className = ""
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-3 items-start text-fg-1 pb-4 pt-0 px-0 relative shrink-0 w-full ${className}`, children: [
    title && /* @__PURE__ */ jsx("div", { className: "text-title-3 text-fg-1 w-full", children: /* @__PURE__ */ jsx("p", { children: title }) }),
    /* @__PURE__ */ jsx("div", { className: "text-body-1 text-fg-2 w-full", children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap", children: content }) })
  ] });
};
const ContentSection = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-2 items-start relative shrink-0 w-[800px] ${className}`, children });
};
const About = () => {
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [showMiddleImage, setShowMiddleImage] = useState(false);
  const [showSideImages, setShowSideImages] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(1);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (isPageVisible) {
      const middleTimer = setTimeout(() => {
        setShowMiddleImage(true);
      }, 500);
      const sideTimer = setTimeout(() => {
        setShowSideImages(true);
      }, 1e3);
      return () => {
        clearTimeout(middleTimer);
        clearTimeout(sideTimer);
      };
    }
  }, [isPageVisible]);
  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: `min-h-screen bg-bg-1 transition-opacity duration-1000 ease-out ${isPageVisible ? "opacity-100" : "opacity-0"}`, children: [
      /* @__PURE__ */ jsx("div", { className: "w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] xl:px-[80px] pt-[80px] pb-[80px]", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-[1280px] mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative h-[481px] flex justify-center items-center", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/assets/aboutme/1950.jpg",
            alt: "1950s Photo",
            onClick: () => handleImageClick(0),
            className: `absolute aspect-[368/481] w-[368px] rounded-lg cursor-pointer transition-all duration-500 ease-out origin-center object-cover ${activeImageIndex === 0 ? "z-30 scale-105 shadow-2xl" : "z-10 scale-100 shadow-lg"} ${showSideImages ? "translate-x-[-200px] rotate-[-10deg] opacity-100" : "translate-x-0 rotate-0 opacity-0"}`
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/assets/aboutme/menow.jpeg",
            alt: "Current Photo",
            onClick: () => handleImageClick(1),
            className: `absolute aspect-[368/481] w-[368px] rounded-lg cursor-pointer transition-all duration-500 ease-out origin-center object-cover ${activeImageIndex === 1 ? "z-30 scale-105 shadow-2xl" : "z-20 scale-100 shadow-lg"} ${showMiddleImage ? "opacity-100" : "opacity-0"}`
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/assets/aboutme/1970.jpg",
            alt: "1970s Photo",
            onClick: () => handleImageClick(2),
            className: `absolute aspect-[368/481] w-[368px] rounded-lg cursor-pointer transition-all duration-500 ease-out origin-center object-cover ${activeImageIndex === 2 ? "z-30 scale-105 shadow-2xl" : "z-10 scale-100 shadow-lg"} ${showSideImages ? "translate-x-[200px] rotate-[10deg] opacity-100" : "translate-x-0 rotate-0 opacity-0"}`
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] xl:px-[80px] pb-[80px]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1280px] mx-auto", children: [
        /* @__PURE__ */ jsx(AnimatedSection, { delay: 300, children: /* @__PURE__ */ jsx("div", { className: "w-full mb-[32px]", children: /* @__PURE__ */ jsx("div", { className: "w-[720px] mx-auto", children: /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-caption-1 text-fg-1 mb-6", children: "QUICK FACTS" }),
          /* @__PURE__ */ jsx(
            TextBlock,
            {
              content: "Born and raised in Nigeria, but now based in New York City area. Recently got married, love working out but currently have an obsession with basketball. Ran a photography business in the past."
            }
          ),
          /* @__PURE__ */ jsx(
            TextBlock,
            {
              content: "5 years of experience in product design. Currently at Microsoft, focused on building the creative AI experiences for Microsoft Copilot."
            }
          )
        ] }) }) }) }) }),
        /* @__PURE__ */ jsx(AnimatedSection, { delay: 400, children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "w-[720px] mx-auto space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("h2", { className: "text-caption-1 text-fg-1", children: "THINGS I'D FIGHT FOR" }) }),
          /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
            TextBlock,
            {
              title: "The kind of craft architects put in their work",
              content: "My design experience began in Architecture. We threw sleep out the window, watching the sun rise, just to make sure our lines were straight. That's craft. And I like to bring that kind of intentionality to work I care about."
            }
          ) }),
          /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
            TextBlock,
            {
              title: "Strong relaionship with my PM and engineering partners",
              content: "The outcome of a product is directly related with how well the triad works. I learn a lot from them, and it makes buiding so much more enjoyable."
            }
          ) }),
          /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
            TextBlock,
            {
              title: "A culture of candor",
              content: "If it’s bad, please tell me. If it’s good, tell me why. If we BS each other, it won’t do us any good."
            }
          ) }),
          /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
            TextBlock,
            {
              title: "Understanding how the work impacts the business",
              content: "The money keeps the light on, and after all, they’re paying me."
            }
          ) }),
          /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
            TextBlock,
            {
              title: "Show don't tell",
              content: "It's true what people say: action speaks louder than words. I've experienced it, usually anything closer to the real deal does much better than all my yapping."
            }
          ) }),
          /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
            TextBlock,
            {
              title: "A good story",
              content: "People's attention are so valuable, get it, and don't waste it."
            }
          ) }),
          /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
            TextBlock,
            {
              title: "Ongoing relationship with people I design for",
              content: "I genuinely think it's a privilege that I get to design for people. I'll jump at any opportunity to talk to people I'm designing for."
            }
          ) })
        ] }) }) }),
        /* @__PURE__ */ jsx(AnimatedSection, { delay: 500, children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1280px] mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-8 items-start justify-between pt-[100px] pb-[100px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col gap-[8px]", children: [
            /* @__PURE__ */ jsxs("div", { className: "pb-[24px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center pb-[16px]", children: /* @__PURE__ */ jsx("h3", { className: "text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]", children: "EXPERIENCE" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Product Designer, Microsoft" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "Aug 2021 - Present" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Product Design Intern, ThredUp" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "May 2020 - Aug 2020" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Product Design Consultant, Kiva" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "Feb 2020 - May 2020" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Product Design Consultant, Ancestry" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "Sept 2019 - Dec 2019" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pb-[24px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center pb-[16px]", children: /* @__PURE__ */ jsx("h3", { className: "text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]", children: "EDUCATION" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[8px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "University of California, Berkeley" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "Aug 2017 - May 2021" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pb-[16px]", children: /* @__PURE__ */ jsxs("p", { className: "text-body-1 text-fg-2 tracking-[0.16px] leading-[22px]", children: [
                "Bachelor of Arts in Cognitive Science",
                /* @__PURE__ */ jsx("br", {}),
                "Certificate in Design Innovation"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col gap-px", children: [
            /* @__PURE__ */ jsxs("div", { className: "pb-[24px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center pb-[16px]", children: /* @__PURE__ */ jsx("h3", { className: "text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]", children: "SKILLS" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Tools" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "Figma, Lovable, Cursor, VS Code, Davinci Resolve" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Programming" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "HTML/CSS, JavaScript, React, Python" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Design" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "Interaction Design, User Research, Design Systems, UX Strategy, Prototyping, Accessibility, Mobile UX" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Other" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "Squatting 4 plates, Video Editing, Photography" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pb-[24px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center pb-[16px]", children: /* @__PURE__ */ jsx("h3", { className: "text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]", children: "LEARNING" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Motion" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "Trying to learn how to use tools like Jitter and Rive. They'll be useful in creating moments of delights for users." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Coding" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "I still feel the need to double down on learning more coding. AI makes it easier, but my understanding of coding systems/structure improves the outcomes when using AI." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col gap-[8px]", children: /* @__PURE__ */ jsxs("div", { className: "pb-[24px]", children: [
            /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center pb-[16px]", children: /* @__PURE__ */ jsx("h3", { className: "text-caption-1 text-fg-2 font-ibm-plex-mono tracking-[-0.28px]", children: "AWARDS" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "Best Website Design" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "Top 3 site in Berkeley's web development course (120+ students)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[8px] pb-[16px]", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-subtitle-1 text-fg-1 font-ibm-plex-condensed leading-[22px]", children: "The Fluegelman Bunnell Award" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-1 text-fg-2 tracking-[0.16px]", children: "For overcoming adversity and contributing to community" })
            ] })
          ] }) })
        ] }) }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const defaultSections = [
  { id: "problem", label: "PROBLEM" },
  { id: "solution", label: "SOLUTION" },
  { id: "impact", label: "IMPACT" },
  { id: "approach", label: "APPROACH" },
  { id: "challenges", label: "CHALLENGES" },
  { id: "experiment", label: "EXPERIMENT" },
  { id: "learnings", label: "LEARNINGS" }
];
const StickyNavigation = ({
  isVisible,
  activeSection,
  onSectionClick,
  sections = defaultSections
}) => {
  return /* @__PURE__ */ jsx("div", { className: "sticky top-6 bg-bg-1/95 backdrop-blur-sm z-20", children: /* @__PURE__ */ jsx("div", { className: `transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`, children: /* @__PURE__ */ jsx("div", { className: "space-y-1 py-6", children: sections.map((section) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => onSectionClick(section.id),
      className: `block w-full text-left font-['IBM_Plex_Mono'] font-semibold text-[14px] tracking-[-0.28px] transition-colors duration-200 hover:text-fg-1 py-1 ${activeSection === section.id ? "text-fg-1" : "text-fg-3"}`,
      children: section.label
    },
    section.id
  )) }) }) });
};
const useStickyNavigation = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const sections = [
    "problem",
    "solution",
    "impact",
    "approach",
    "challenges",
    "experiment",
    "learnings"
  ];
  const handleSectionClick = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, []);
  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        console.log("Hero intersection:", entry.isIntersecting, "Nav visible:", !entry.isIntersecting);
        setIsNavVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -80% 0px"
        // Trigger when hero is 80% out of view
      }
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-120px 0px -60% 0px"
      }
    );
    const setupObservers = () => {
      const heroElement = document.getElementById("hero-section");
      if (heroElement) {
        heroObserver.observe(heroElement);
      }
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          sectionObserver.observe(element);
        }
      });
    };
    setupObservers();
    const timeoutId = setTimeout(setupObservers, 100);
    return () => {
      clearTimeout(timeoutId);
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [sections]);
  return {
    isNavVisible,
    activeSection,
    handleSectionClick
  };
};
const ImageContainer = ({
  src = "",
  alt = "Case study image",
  caption = "IMAGE CAPTION",
  height = "600px",
  className = "",
  showCaption = false,
  fit = "cover",
  adaptToImage = false
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-2 items-center justify-center py-6 w-full ${className}`, children: [
    adaptToImage && src ? /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt,
        className: "rounded-[16px] w-full h-auto object-contain"
      }
    ) : /* @__PURE__ */ jsx(
      "div",
      {
        className: `bg-center ${fit === "cover" ? "bg-cover" : "bg-contain"} bg-no-repeat rounded-[16px] w-full ${src ? "bg-transparent" : "bg-bg-2"}`,
        style: {
          height,
          backgroundImage: src ? `url('${src}')` : void 0
        }
      }
    ),
    showCaption && /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: caption }) }) })
  ] });
};
const SectionHeader = ({
  title,
  className = ""
}) => {
  return /* @__PURE__ */ jsx("div", { className: `flex gap-2 items-center grow min-h-px min-w-px ${className}`, children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-semibold text-fg-2 text-[14px] tracking-[-0.28px]", children: /* @__PURE__ */ jsx("p", { className: "leading-[20px] whitespace-pre", children: title }) }) });
};
const ProjectDetails = ({
  role = "Lead Designer",
  duration = "1 month",
  tools = "Figma",
  className = ""
}) => {
  const DetailItem = ({ label, value }) => /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-2 items-start relative shrink-0 ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-3 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px] whitespace-pre", children: label }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1 items-start relative shrink-0", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Sans'] text-[14px] text-fg-1 w-full", children: /* @__PURE__ */ jsx("p", { className: "leading-[20px]", children: value }) }) })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-8 items-start px-0 py-8 relative shrink-0 w-full", children: [
    /* @__PURE__ */ jsx(DetailItem, { label: "ROLE", value: role }),
    /* @__PURE__ */ jsx(DetailItem, { label: "DURATION", value: duration }),
    /* @__PURE__ */ jsx(DetailItem, { label: "TOOLS", value: tools })
  ] });
};
const useCountAnimation = ({
  target,
  duration = 2e3,
  prefix = "",
  suffix = ""
}) => {
  const [count2, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.5,
        // Trigger when 50% of element is visible
        rootMargin: "-50px"
      }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);
  useEffect(() => {
    if (!isInView) return;
    const startTime = Date.now();
    const startValue = 0;
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
      setCount(currentValue);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [isInView, target, duration]);
  const displayValue = `${prefix}${count2}${suffix}`;
  return { displayValue, elementRef };
};
const MetricCard = ({
  label,
  value,
  className = ""
}) => {
  const parseValue = (val) => {
    const match = val.match(/^([+-]?)(\d+)(.*)$/);
    if (match) {
      const [, prefix2, number, suffix2] = match;
      return {
        target: parseInt(number, 10),
        prefix: prefix2,
        suffix: suffix2
      };
    }
    return { target: 0, prefix: "", suffix: val };
  };
  const { target, prefix, suffix } = parseValue(value);
  const { displayValue, elementRef } = useCountAnimation({
    target,
    prefix,
    suffix,
    duration: 2e3
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: elementRef,
      className: `flex flex-col gap-1 items-start text-fg-1 w-[165px] ${className}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-display w-full", children: /* @__PURE__ */ jsx("p", { children: displayValue }) }),
        /* @__PURE__ */ jsx("div", { className: "text-caption-2 text-fg-2 uppercase w-full", children: /* @__PURE__ */ jsx("p", { children: label }) })
      ]
    }
  );
};
const QuoteCard = ({
  quote,
  author,
  className = ""
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `bg-bg-2 relative rounded-[12px] h-full w-full ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 items-center justify-center p-6 text-center w-full h-full", children: [
      /* @__PURE__ */ jsx("div", { className: "text-body-1 text-fg-1 w-full", children: /* @__PURE__ */ jsxs("p", { children: [
        '"',
        quote,
        '"'
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "text-caption-2 text-fg-2 uppercase w-full", children: /* @__PURE__ */ jsxs("p", { className: "whitespace-pre-wrap", children: [
        "~ ",
        author
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute border-2 border-neutral-700 border-solid inset-0 pointer-events-none rounded-[12px]",
        "aria-hidden": "true"
      }
    )
  ] });
};
const BigCallout = ({
  text,
  className = ""
}) => {
  return /* @__PURE__ */ jsx("div", { className: `flex items-center justify-start px-0 py-8 relative w-full ${className}`, children: /* @__PURE__ */ jsx("div", { className: "text-title-2 text-fg-1 w-full text-left", children: /* @__PURE__ */ jsx("p", { className: "break-words", children: text }) }) });
};
const IOSHomeCaseStudy = ({ currentProjectTitle = "iOS Home in OneNote" }) => {
  const [isPageVisible, setIsPageVisible] = useState(false);
  const otherProjects = getOtherCaseStudyProjects(currentProjectTitle, 2);
  const iosHomeSections = [
    { id: "problem", label: "PROBLEM" },
    { id: "solution", label: "SOLUTION" },
    { id: "impact", label: "IMPACT" },
    { id: "approach", label: "APPROACH" },
    { id: "challenges", label: "CHALLENGES" },
    { id: "experiment", label: "EXPERIMENT" },
    { id: "learnings", label: "LEARNINGS" }
  ];
  const { isNavVisible, activeSection, handleSectionClick } = useStickyNavigation();
  console.log("IOSHomeCaseStudy state:", { isNavVisible, activeSection });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen bg-bg-1 transition-opacity duration-1000 ease-out ${isPageVisible ? "opacity-100" : "opacity-0"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] xl:px-[80px] py-0 w-full max-w-[1280px] mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { id: "hero-section", className: "flex flex-col items-start relative shrink-0 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-center pb-3 pt-20 px-0 relative shrink-0 w-full", children: [
          /* @__PURE__ */ jsx("header", { className: "flex flex-col gap-5 items-start max-w-[1500px] overflow-visible py-0 relative shrink-0 w-full", children: /* @__PURE__ */ jsx("div", { className: "bg-clip-text bg-gradient-to-b font-['IBM_Plex_Sans_Condensed'] font-semibold from-[#f5f5f5] text-[48px] to-[#fafafa] w-full [&]:text-transparent", children: /* @__PURE__ */ jsx("p", { className: "leading-[64px]", children: "Designed a new Home for the iOS app in OneNote, leading to an increase in usage retention" }) }) }),
          /* @__PURE__ */ jsx(ProjectDetails, {})
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: /* @__PURE__ */ jsx(
          ImageContainer,
          {
            src: "/assets/ioshome/ioshome-header-img.png",
            alt: "iOS Home in OneNote header image",
            adaptToImage: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[309px_1fr] gap-2 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
          StickyNavigation,
          {
            isVisible: isNavVisible,
            activeSection,
            onSectionClick: handleSectionClick,
            sections: iosHomeSections
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 200, children: /* @__PURE__ */ jsxs("div", { id: "problem", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "PROBLEM" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "OneNote's notebook structure is neat on desktop, but on mobile, it becomes a scavenger hunt.",
                  content: `Need your grocery list or a note during a meeting? Digging through layers wastes time. Search helps if you remember how you saved notes. 

Jotting down ideas isn't easy; users face decisions on note placement, slowing them down. We found people want to capture thoughts quickly, but our rigid structure hinders this, especially on mobile.`
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Make mobile note-taking delightful, encouraging users to stay, boosting usage and retention.",
                  content: `Need your grocery list or a note during a meeting? Digging through layers wastes time. Search helps if you remember how you saved notes. 

Jotting down ideas isn't easy; users face decisions on note placement, slowing them down. We found people want to capture thoughts quickly, but our rigid structure hinders this, especially on mobile.`
                }
              ),
              /* @__PURE__ */ jsx(BigCallout, { text: "How might we help users quickly capture their ideas and easily find their notes?" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 150, children: /* @__PURE__ */ jsxs("div", { id: "solution", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "SOLUTION" }),
            /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
              TextBlock,
              {
                title: "A new Home",
                content: "We introduced a new feature called Home, where you can view all your notes and easily create a new one with a single button."
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(
              "video",
              {
                src: "/assets/ioshome/homeview.mp4",
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                className: "rounded-[16px] w-full h-auto object-contain"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: "Grid and List views" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(
              "video",
              {
                src: "/assets/ioshome/filterview.mp4",
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                className: "rounded-[16px] w-full h-auto object-contain"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: "Filter & Sort" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(
              "video",
              {
                src: "/assets/ioshome/captureview.mp4",
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                className: "rounded-[16px] w-full h-auto object-contain"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: "Quick Capture" }) }) })
          ] }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 250, children: /* @__PURE__ */ jsxs("div", { id: "impact", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "IMPACT" }),
            /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-[60px] items-center px-0 py-2 relative shrink-0 w-full", children: [
              /* @__PURE__ */ jsx(MetricCard, { label: "STICKY NOTE USAGE", value: "+48%" }),
              /* @__PURE__ */ jsx(MetricCard, { label: "PAGE CREATION", value: "+12%" }),
              /* @__PURE__ */ jsx(MetricCard, { label: "2-DAY RETENTION", value: "+3%" })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 100, children: /* @__PURE__ */ jsxs("div", { id: "approach", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "APPROACH" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Explored existing solutions tackling this problems",
                  content: "We designed a new feature called, Home to help people see all their notes, and helping them quickly creating a new note."
                }
              ),
              /* @__PURE__ */ jsx(
                ImageContainer,
                {
                  src: "/assets/ioshome/ioshome-research.png",
                  alt: "Research on existing solutions",
                  adaptToImage: true
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 180, children: /* @__PURE__ */ jsxs("div", { id: "challenges", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "CHALLENGES" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Users created notes with multiple modalities and we wanted to make this available to them from the Home tab",
                  content: `The common usage of our mobile app revolves around creating a task list. We explored different modalities for capturing ideas, including audio, camera, and keyboard, to ensure users could choose their preferred method from the Home tab.

Our goal was to provide a quick capture solution while keeping other options easily discoverable. We aimed to design a seamless experience that would prevent any drop-off due to these changes.`
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center justify-center py-6 w-full", children: [
                /* @__PURE__ */ jsx(
                  "video",
                  {
                    src: "/assets/ioshome/1-fab.mp4",
                    autoPlay: true,
                    loop: true,
                    muted: true,
                    playsInline: true,
                    className: "rounded-[16px] w-full h-auto object-contain"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: "Iteration 1: FAB button" }) }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center justify-center py-6 w-full", children: [
                /* @__PURE__ */ jsx(
                  "video",
                  {
                    src: "/assets/ioshome/2-splitbutton.mp4",
                    autoPlay: true,
                    loop: true,
                    muted: true,
                    playsInline: true,
                    className: "rounded-[16px] w-full h-auto object-contain"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: "Iteration 2: Split Button" }) }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center justify-center py-6 w-full", children: [
                /* @__PURE__ */ jsx(
                  "video",
                  {
                    src: "/assets/ioshome/3-halfsheet.mp4",
                    autoPlay: true,
                    loop: true,
                    muted: true,
                    playsInline: true,
                    className: "rounded-[16px] w-full h-auto object-contain"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: "Iteration 3: Half sheet" }) }) })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 120, children: /* @__PURE__ */ jsxs("div", { id: "experiment", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "EXPERIMENT" }),
            /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
              TextBlock,
              {
                title: "We conducted A/B/n experiment with four treatments",
                content: "The experiment was done to help understand the most effective design that'll help us improve user engagement and retention."
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: /* @__PURE__ */ jsx(
            ImageContainer,
            {
              src: "/assets/ioshome/ioshome-experiment.png",
              alt: "Experiment display",
              caption: "DISPLAY OF EXPERIMENTS",
              adaptToImage: true
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
            TextBlock,
            {
              title: "Treatment 3 delivered the strongest results",
              content: "Treatment 3 - where we used the FAB button and defaulted users back to the Home page resulted the highest increase in page creation, 2-day retention and Sticky Note usage. Booting users into the Home view improves access to relevant content and encourages note creation."
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "IMPACT" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-11 items-stretch pb-6 pt-8 px-0 relative shrink-0 w-full", children: [
                /* @__PURE__ */ jsx(
                  QuoteCard,
                  {
                    quote: "This was a rare set of experiment where all the treatments produced positive results! Selecting the best overall performing treatment required deeper analysis of key metrics. Congratulations to the iOS crew for following an experimentation mindset from start to finish on this work and doing a great job!",
                    author: "Engineering leadership",
                    className: "flex-1"
                  }
                ),
                /* @__PURE__ */ jsx(
                  QuoteCard,
                  {
                    quote: "Kudos to the iOS crew for all the work to get here and for pushing on our PLG culture by using experiments to have the data tell us which treatment was best.",
                    author: "Product leadership",
                    className: "flex-1"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-[60px] h-[130px] items-center px-0 py-2 relative shrink-0 w-auto", children: [
                /* @__PURE__ */ jsx(MetricCard, { label: "STICKY NOTE USAGE", value: "+48%" }),
                /* @__PURE__ */ jsx(MetricCard, { label: "PAGE CREATION", value: "+12%" }),
                /* @__PURE__ */ jsx(MetricCard, { label: "2-DAY RENTENTION", value: "+3%" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 160, children: /* @__PURE__ */ jsxs("div", { id: "learnings", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "LEARNINGS" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Think in systems as you design helps teams move faster",
                  content: "On the technical side, I made sure to build reusable components as I designed, fitting everything into the larger system. This approach not only sped up development, but also set us up nicely for future updates."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Consistent design across platforms benefits from parallel work.",
                  content: "Design choices were influenced by the Android team, leaving me feeling boxed in. I wanted to innovate for iOS but had to follow existing decisions. Collaboration between teams is essential for consistency, and I could've advocated more for user-backed ideas."
                }
              )
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatedSection, { delay: 100, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-9 items-start px-0 py-20 relative shrink-0 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-semibold text-fg-2 text-[14px] tracking-[-0.28px] w-full", children: /* @__PURE__ */ jsx("p", { className: "leading-[normal]", children: "MORE CASE STUDIES" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row gap-16 items-start w-full", children: otherProjects.map((project, index) => /* @__PURE__ */ jsx("div", { className: "flex-1 w-full", children: /* @__PURE__ */ jsx(WorkCard, { ...project }) }, index)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const GifContainer = ({
  src = "",
  alt = "Case study GIF",
  caption = "GIF CAPTION",
  className = "",
  showCaption = true
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-2 items-center justify-center py-[1.375rem] w-full ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-[16px] w-full flex items-center justify-center p-4 aspect-[50/33]", children: src && /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt,
        className: "max-w-[70%] max-h-[70%] object-contain rounded-[8px]"
      }
    ) }),
    showCaption && /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: caption }) }) })
  ] });
};
const ThredupCaseStudy = ({ currentProjectTitle = "ThredUp Checkout" }) => {
  const [isPageVisible, setIsPageVisible] = useState(false);
  const otherProjects = getOtherCaseStudyProjects(currentProjectTitle, 2);
  const thredupSections = [
    { id: "overview", label: "OVERVIEW" },
    { id: "problem", label: "PROBLEM" },
    { id: "research", label: "RESEARCH" },
    { id: "insights", label: "INSIGHTS" },
    { id: "ideation", label: "IDEATION" },
    { id: "solution", label: "SOLUTION" },
    { id: "learnings", label: "LEARNINGS" }
  ];
  const { isNavVisible, activeSection, handleSectionClick } = useStickyNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen bg-bg-1 transition-opacity duration-1000 ease-out ${isPageVisible ? "opacity-100" : "opacity-0"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] xl:px-[80px] py-0 w-full max-w-[1280px] mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { id: "hero-section", className: "flex flex-col items-start relative shrink-0 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-center pb-3 pt-20 px-0 relative shrink-0 w-full", children: [
          /* @__PURE__ */ jsx("header", { className: "flex flex-col gap-5 items-start max-w-[1500px] overflow-visible py-0 relative shrink-0 w-full", children: /* @__PURE__ */ jsx("div", { className: "bg-clip-text bg-gradient-to-b font-['IBM_Plex_Sans_Condensed'] font-semibold from-[#f5f5f5] text-[48px] to-[#fafafa] w-full [&]:text-transparent", children: /* @__PURE__ */ jsx("p", { className: "leading-[64px]", children: "Revamped the checkout process in ThredUp's app to significantly decrease the drop-off rate." }) }) }),
          /* @__PURE__ */ jsx(
            ProjectDetails,
            {
              role: "Lead Designer",
              duration: "1 month",
              tools: "Figma"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: /* @__PURE__ */ jsx(
          ImageContainer,
          {
            src: "/assets/thredup/thredup-header-img.jpg",
            alt: "ThredUp checkout redesign header image",
            adaptToImage: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[309px_1fr] gap-2 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
          StickyNavigation,
          {
            isVisible: isNavVisible,
            activeSection,
            onSectionClick: handleSectionClick,
            sections: thredupSections
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 200, children: /* @__PURE__ */ jsxs("div", { id: "overview", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "OVERVIEW" }),
            /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
              TextBlock,
              {
                title: "I interned as a designer at ThredUp, the biggest online thrift store, where I experienced a significant rebranding effort.",
                content: `ThredUP is the largest fashion resale marketplace for secondhand clothing. As a product design intern, I worked with the team on their native app, focusing on improving the checkout experience.

My experience encompasses product thinking, research, visual design, and prototyping. This was my inaugural project as a company employee, and I learned immensely from the guidance of my manager, Sarah.`
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 100, children: /* @__PURE__ */ jsxs("div", { id: "problem", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "PROBLEM" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "There was a 68% drop-off rate from the cart page to the checkout page, and a 20% more before users placed orders",
                  content: `On the ThredUp native app, there was a 68% drop-off rate from the cart page to the checkout page, and even a 20% more drop-off rate from the checkout page to users placing an order.

Since the checkout funnel is an important part of the ThredUp business, we wanted to see if we could reduce the drop-off rate by optimizing the design.`
                }
              ),
              /* @__PURE__ */ jsx(BigCallout, { text: "How might we simplify the checkout process and reduce the drop-off rate?" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { id: "research", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "RESEARCH" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Conducted secondary research by doing a deep study of e-commerce",
                  content: "To tackle this problem, I conducted some secondary research, reading through a bunch of articles to understand what makes a good checkout experience, and what made it stand out. One of the things that stood out right to me was:"
                }
              ),
              /* @__PURE__ */ jsx(BigCallout, { text: "69.23% of all e-commerce visitors abandon their shopping carts" }),
              /* @__PURE__ */ jsx(
                ImageContainer,
                {
                  src: "/assets/thredup/sec-research.png",
                  alt: "Secondary research findings",
                  caption: "SECONDARY RESEARCH INSIGHTS",
                  adaptToImage: true
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Market research",
                  content: "In order to construct a concise and solid foundation for ThredUP's checkout flow, I ventured to see out to see what the other e-commerce platforms were doing well in their checkout process."
                }
              ),
              /* @__PURE__ */ jsx(
                ImageContainer,
                {
                  src: "/assets/thredup/market-research.png",
                  alt: "Market research analysis",
                  caption: "ANALYSIS OF WELL KNOWN E-COMMERCE CHECKOUT EXPERIENCES",
                  adaptToImage: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { id: "insights", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "INSIGHTS" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "People want to see the checkout steps and progress ahead of time.",
                  content: ""
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "A good checkout flow is clear, showing users the extra costs.",
                  content: ""
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Reducing frustrations and making it intuitive helps users complete checkout faster.",
                  content: ""
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Helping users through checkout speeds their progress.",
                  content: ""
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { id: "ideation", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "IDEATION" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Bringing everything to life",
                  content: `After research, I brainstormed ideas to improve the checkout experience, including new features like the ability to scan credit card, offering guest checkout, inline validation for credit cards, e.t.c.

Taking into some business considerations and technical limitations, I moved on to bringing some of these ideas to life.`
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Lo-fi sketching",
                  content: "Before moving on, I wanted to get a feel for what the new checkout flow could be. I was exploring between having all the steps displayed in one page and the steps laid out on a half-sheet."
                }
              ),
              /* @__PURE__ */ jsx(
                ImageContainer,
                {
                  src: "/assets/thredup/lofi-sketch.png",
                  alt: "Lo-fi sketches",
                  caption: "LO-FI SKETCHES",
                  adaptToImage: true
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Iterated through feedback",
                  content: "I created three mockup iterations for the new checkout flow. Feedback highlighted the need to consider new and returning users. The half-sheet was ineffective for new users, while the third iteration provided clear step-by-step guidance."
                }
              ),
              /* @__PURE__ */ jsx(
                ImageContainer,
                {
                  src: "/assets/thredup/iterations-feedback.jpg",
                  alt: "Iteration feedback",
                  caption: "ITERATIONS BASED ON FEEDBACK",
                  adaptToImage: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 200, children: /* @__PURE__ */ jsxs("div", { id: "solution", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "SOLUTION" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Adjusted to fit ThredUp's rebrand",
                  content: "During this project, ThredUP rebranded, so I focused on the new design system, incorporating feedback and creating two final iterations."
                }
              ),
              /* @__PURE__ */ jsx(
                ImageContainer,
                {
                  src: "/assets/thredup/rebranded-versions.png",
                  alt: "Rebranded versions",
                  caption: "REBRANDED CHECKOUT ITERATIONS",
                  adaptToImage: true
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Paid attention to the smallest interactions to provide delight for users and ease frustrations common in the checkout flows",
                  content: "To achieve our Checkout goal, I analyzed all interactions, from validations to button clicks. I created a prototype to visualize these interactions."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Credit card inline validation",
                  content: "I added a feature where the app tells users what kind of card they are inputing right when they type the first number."
                }
              ),
              /* @__PURE__ */ jsx(
                GifContainer,
                {
                  src: "/assets/thredup/card-validation.gif",
                  alt: "Card validation",
                  caption: "INLINE CREDIT CARD VALIDATION"
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Handling errors on the go",
                  content: "Users will be able to know when they make a mistake while filling their information instead of waiting till the end, and having to everything all over again."
                }
              ),
              /* @__PURE__ */ jsx(
                GifContainer,
                {
                  src: "/assets/thredup/inline-validation.gif",
                  alt: "Inline validation",
                  caption: "REAL-TIME ERROR VALIDATION"
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Tooltips to help educate users",
                  content: "Redesigned the tooltips to give users better information of what is required of them as they are filling out the forms."
                }
              ),
              /* @__PURE__ */ jsx(
                GifContainer,
                {
                  src: "/assets/thredup/tooltip.gif",
                  alt: "Tooltip design",
                  caption: "HELPFUL TOOLTIPS"
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Highlighted the promo code",
                  content: "The promo code was previously hidden. It incentivizes purchases, so I emphasized it more than before."
                }
              ),
              /* @__PURE__ */ jsx(
                GifContainer,
                {
                  src: "/assets/thredup/promo-code.gif",
                  alt: "Promo code feature",
                  caption: "PROMINENT PROMO CODE FIELD"
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Order confirmation page",
                  content: "I found a great oppurtunity here to add elements of the rebrand, giving users an exciting confirmation notice when they place their order and gives them option to keep navigating through the app."
                }
              ),
              /* @__PURE__ */ jsx(
                GifContainer,
                {
                  src: "/assets/thredup/order-completed.gif",
                  alt: "Order confirmation",
                  caption: "DELIGHTFUL ORDER CONFIRMATION"
                }
              ),
              /* @__PURE__ */ jsx(
                ImageContainer,
                {
                  src: "/assets/thredup/thredup-final-img.jpg",
                  alt: "Final solution",
                  caption: "FINAL CHECKOUT SOLUTION",
                  adaptToImage: true
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { id: "learnings", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "LEARNINGS" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Design needs to co-operate with business",
                  content: "The biggest challenge was designing the payment method, considering ThredUP's business guidelines and payment companies. It was tough, but I found a solution that met all constraints."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Data empowers design",
                  content: "This project arose from data on the checkout flow. We aim to create impactful products, and data helps us identify needed improvements. They inform us about user interactions. I wish I had more time to test my designs, but ThredUP will test them before public rollout."
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatedSection, { delay: 150, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-9 items-start px-0 py-20 relative shrink-0 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-semibold text-fg-2 text-[14px] tracking-[-0.28px] w-full", children: /* @__PURE__ */ jsx("p", { className: "leading-[normal]", children: "MORE CASE STUDIES" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row gap-16 items-start w-full", children: otherProjects.map((project, index) => /* @__PURE__ */ jsx("div", { className: "flex-1 w-full", children: /* @__PURE__ */ jsx(WorkCard, { ...project }) }, index)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const CopilotCanvasCaseStudy = ({ currentProjectTitle = "Copilot on Canvas" }) => {
  const [isPageVisible, setIsPageVisible] = useState(false);
  const otherProjects = getOtherCaseStudyProjects(currentProjectTitle, 2);
  const copilotCanvasSections = [
    { id: "problem", label: "PROBLEM" },
    { id: "research", label: "RESEARCH" },
    { id: "insights", label: "INSIGHTS" },
    { id: "approach", label: "APPROACH" },
    { id: "solution", label: "SOLUTION" },
    { id: "impact", label: "IMPACT" },
    { id: "learnings", label: "LEARNINGS" }
  ];
  const { isNavVisible, activeSection, handleSectionClick } = useStickyNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen bg-bg-1 transition-opacity duration-1000 ease-out ${isPageVisible ? "opacity-100" : "opacity-0"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] xl:px-[80px] py-0 w-full max-w-[1280px] mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { id: "hero-section", className: "flex flex-col items-start relative shrink-0 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-center pb-3 pt-20 px-0 relative shrink-0 w-full", children: [
          /* @__PURE__ */ jsx("header", { className: "flex flex-col gap-5 items-start max-w-[1500px] overflow-visible py-0 relative shrink-0 w-full", children: /* @__PURE__ */ jsx("div", { className: "bg-clip-text bg-gradient-to-b font-['IBM_Plex_Sans_Condensed'] font-semibold from-[#f5f5f5] text-[48px] to-[#fafafa] w-full [&]:text-transparent", children: /* @__PURE__ */ jsx("p", { className: "leading-[64px]", children: "Crafted an engaging Copilot experience on OneNote Canvas, significantly boosting user adoption." }) }) }),
          /* @__PURE__ */ jsx(
            ProjectDetails,
            {
              role: "Lead Designer",
              duration: "May - June 2024",
              tools: "Figma"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: /* @__PURE__ */ jsx(
          ImageContainer,
          {
            src: "/assets/copilotcanvas/copilotcanvas-header.png",
            alt: "Copilot on Canvas header image",
            adaptToImage: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[309px_1fr] gap-2 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
          StickyNavigation,
          {
            isVisible: isNavVisible,
            activeSection,
            onSectionClick: handleSectionClick,
            sections: copilotCanvasSections
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 200, children: /* @__PURE__ */ jsxs("div", { id: "problem", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "PROBLEM" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "The Copilot experience on the side pane wasn't intuitive for users in adopting to their workflows",
                  content: `We had an integration on the side as a chat, but we heard from user feedback that it felt disconnected, and they had to find it to use it. We wanted to meet them where they're at - right on the canvas. Capturing ideas, brainstorming, editing their content were things LLMs are good at. The side pane made it more cumbersome, we wanted to design an easier way for them to experience this value in their workflow.`
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "From a business perspective, this was needed to help increase adoption of Copilot, thereby increasing paying customers",
                  content: "Increase adoption of Copilot. If we helped people realize the value of AI in their workflow, it'll increase the chance of them using it, and paying for Copilot subscription, boosting the business of the product."
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 100, children: /* @__PURE__ */ jsxs("div", { id: "research", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "RESEARCH" }),
            /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
              TextBlock,
              {
                title: "Dedicated team of researchers, learning from users as we were building",
                content: "During the development of Copilot at Microsoft, our research team engaged with users regularly. After launching the Copilot features, they followed up with users to gather feedback, allowing product teams to make improvements."
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 150, children: /* @__PURE__ */ jsxs("div", { id: "insights", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "INSIGHTS" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Users perceived Copilot as a fragmented experience across Microsoft's productivity suite",
                  content: "New users often struggle to find and adopt Copilot, and even experienced users may feel it doesn't integrate well within apps. The different ways to access Copilot across various applications make it hard to develop consistent usage habits."
                }
              ),
              /* @__PURE__ */ jsx(
                ImageContainer,
                {
                  src: "/assets/copilotcanvas/copilotcanvas-research.png",
                  alt: "Research insights visualization",
                  caption: "IMAGE CAPTION",
                  adaptToImage: true
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Users wanted one place to find Copilot, and in places where they naturally work",
                  content: "Users prefer a single, reliable entry point to access Copilot across all applications. Additionally, Copilot features should be seamlessly integrated into the places where users already work, rather than being presented as separate, generic options."
                }
              ),
              /* @__PURE__ */ jsx(BigCallout, { text: "Improving Copilot adoption wasn't about adding more access points, but about strategically placing Copilot functionality within users' existing workflows" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 100, children: /* @__PURE__ */ jsxs("div", { id: "approach", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "APPROACH" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Participated in continual syncs with other product teams Word, Excel, Powerpoint and Outlook",
                  content: `This was a major effort amongst other product at Microsoft, like Word, Excel, Powerpoint. We need to make sure the experience was consistent for users across the board.

This meant a recurring sync with designers from those products. Where we gave feedback and showcased ideas we wanted to bring in.`
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Contributed and leveraged existing design system",
                  content: "In order to tackle the challenges identified in our research, we aimed to develop a cohesive Copilot experience that spans all Microsoft 365 applications. To achieve this, we adhered to a comprehensive Copilot design system and collaborated closely with other team members to enhance and expand upon it."
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 200, children: /* @__PURE__ */ jsxs("div", { id: "solution", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "SOLUTION" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Draft from nothing",
                  content: "During this project, ThredUP rebranded, so I focused on the new design system, incorporating feedback and creating two final iterations."
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: [
                /* @__PURE__ */ jsx(
                  "video",
                  {
                    src: "/assets/copilotcanvas/draft.mp4",
                    autoPlay: true,
                    loop: true,
                    muted: true,
                    playsInline: true,
                    className: "rounded-[16px] w-full h-auto object-contain"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: "DRAFT PROTOTYPE" }) }) })
              ] }),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Rewrite any content on your canvas",
                  content: "I added a feature where the app tells users what kind of card they are inputing right when they type the first number."
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: [
                /* @__PURE__ */ jsx(
                  "video",
                  {
                    src: "/assets/copilotcanvas/rewrite.mp4",
                    autoPlay: true,
                    loop: true,
                    muted: true,
                    playsInline: true,
                    className: "rounded-[16px] w-full h-auto object-contain"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: "REWRITE PROTOTYPE" }) }) })
              ] }),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Summarize any content on your canvas",
                  content: "Users will be able to know when they make a mistake while filling their information instead of waiting till the end, and having to everything all over again."
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: [
                /* @__PURE__ */ jsx(
                  "video",
                  {
                    src: "/assets/copilotcanvas/summary.mp4",
                    autoPlay: true,
                    loop: true,
                    muted: true,
                    playsInline: true,
                    className: "rounded-[16px] w-full h-auto object-contain"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase", children: /* @__PURE__ */ jsx("p", { className: "leading-[18px]", children: "SUMMARY PROTOTYPE" }) }) })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 250, children: /* @__PURE__ */ jsxs("div", { id: "impact", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "IMPACT" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "We saw a significant increase in Copilot adoption",
                  content: "In a recent 14-day experiment involving 50% of our production users, we observed impressive results regarding the OneNote Copilot features. Specifically, there was a remarkable 36.95% increase in the number of OneNote users who were aware of these features, and an even more significant 68% increase in users who actively tried them out. Due to these strong gains, the team decided to move forward with a full 100% production rollout. As a result, the weekly active users (WAU) of OneNote Copilot surged fivefold, climbing from 11.1K to an impressive 69.8K by the end of FY25."
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-[60px] h-[130px] items-center px-0 py-2 relative shrink-0", children: [
                /* @__PURE__ */ jsx(
                  MetricCard,
                  {
                    value: "+37%",
                    label: "USERS SAW COPILOT"
                  }
                ),
                /* @__PURE__ */ jsx(
                  MetricCard,
                  {
                    value: "+68%",
                    label: "USERS TRIED COPILOT"
                  }
                ),
                /* @__PURE__ */ jsx(
                  MetricCard,
                  {
                    value: "+68K",
                    label: "Weekly active users"
                  }
                )
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 150, children: /* @__PURE__ */ jsxs("div", { id: "learnings", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "LEARNINGS" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Dive deep into the technical aspects",
                  content: "The biggest challenge was designing the payment method, considering ThredUP's business guidelines and payment companies. It was tough, but I found a solution that met all constraints."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Do more testing with users before implementation",
                  content: "Shoot for a realistic prototype, if not settle for a dummy one. Something's better than nothing to learn from users."
                }
              )
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatedSection, { delay: 100, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-9 items-start px-0 py-20 relative shrink-0 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "font-['IBM_Plex_Mono'] font-semibold text-fg-2 text-[14px] tracking-[-0.28px] w-full", children: /* @__PURE__ */ jsx("p", { className: "leading-[normal]", children: "MORE CASE STUDIES" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row gap-16 items-start w-full", children: otherProjects.map((project, index) => /* @__PURE__ */ jsx("div", { className: "flex-1 w-full", children: /* @__PURE__ */ jsx(WorkCard, { ...project }) }, index)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-4", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 hover:text-blue-700 underline", children: "Return to Home" })
  ] }) });
};
const CopilotContext = ({ currentProjectTitle = "Copilot Scoping in OneNote" }) => {
  const [isPageVisible, setIsPageVisible] = useState(false);
  const otherProjects = getOtherCaseStudyProjects(currentProjectTitle, 2);
  const copilotSections = [
    { id: "overview", label: "OVERVIEW" },
    { id: "problem", label: "PROBLEM" },
    { id: "research", label: "RESEARCH" },
    { id: "insights", label: "INSIGHTS" },
    { id: "solution", label: "SOLUTION" },
    { id: "impact", label: "IMPACT" },
    { id: "learnings", label: "LEARNINGS" }
  ];
  const { isNavVisible, activeSection, handleSectionClick } = useStickyNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen bg-bg-1 transition-opacity duration-1000 ease-out ${isPageVisible ? "opacity-100" : "opacity-0"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] xl:px-[80px] py-0 w-full max-w-[1280px] mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { id: "hero-section", className: "flex flex-col items-start relative shrink-0 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-center pb-3 pt-20 px-0 relative shrink-0 w-full", children: [
          /* @__PURE__ */ jsx("header", { className: "flex flex-col gap-5 items-start max-w-[1500px] overflow-visible py-0 relative shrink-0 w-full", children: /* @__PURE__ */ jsx("div", { className: "text-title-1 text-fg-1 font-ibm-plex-condensed font-semibold w-full", children: /* @__PURE__ */ jsx("p", { children: "Designed a feature to help users understand the scope of Copilot, influencing other product teams" }) }) }),
          /* @__PURE__ */ jsx(
            ProjectDetails,
            {
              role: "User Research Lead, Product Strategy",
              duration: "2 months",
              tools: "Figma, Playbook UX, PowerPoint"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-center justify-center px-0 py-6 relative shrink-0 w-full", children: /* @__PURE__ */ jsx(
          ImageContainer,
          {
            src: "/assets/copilotscoping/copilotcontext-header.png",
            alt: "Copilot Context case study header image",
            adaptToImage: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[309px_1fr] gap-2 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
          StickyNavigation,
          {
            isVisible: isNavVisible,
            activeSection,
            onSectionClick: handleSectionClick,
            sections: copilotSections
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 200, children: /* @__PURE__ */ jsxs("div", { id: "overview", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "OVERVIEW" }),
            /* @__PURE__ */ jsx(ContentSection, { children: /* @__PURE__ */ jsx(
              TextBlock,
              {
                title: "Led research and design efforts to explore how users want to reference and interact with their notes through OneNote's AI-powered chat interface.",
                content: `Microsoft OneNote evolved to incorporate AI capabilities through Copilot integration. As part of this transformation, we needed to understand how users envision using AI in their note-taking workflow.

This project focused on conducting comprehensive user research to inform the design and development of how users want to reference and interact with their notes through OneNote's AI-powered chat interface.`
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 150, children: /* @__PURE__ */ jsxs("div", { id: "problem", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "PROBLEM" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "From our past research reports, we learned that users struggle with understanding the scope of Copilot in OneNote.",
                  content: `Users want clarity on what portion of their OneNote content Copilot is reasoning over and the ability to change that scope to fit their needs.

Since this affects how users interact with AI features in their daily workflow, it became crucial to understand their mental models and expectations.`
                }
              ),
              /* @__PURE__ */ jsx(BigCallout, { text: "How might we help users understand and control what content Copilot can access in OneNote?" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 100, children: /* @__PURE__ */ jsxs("div", { id: "research", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "RESEARCH" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Conducted 60-minute moderated usability studies across 5 participants",
                  content: "We conducted comprehensive user research to understand how users want to reference and interact with their notes through OneNote's AI-powered chat interface. I created 3 prototypes to validate different design approaches."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Prototype 1: Auto-scoping",
                  content: "Automatically scoping Copilot's context based on users' prompt - letting the AI determine what content to reference."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-center justify-center py-6 w-full", children: /* @__PURE__ */ jsx(
                "video",
                {
                  src: "/assets/copilotscoping/autoscope.mp4",
                  className: "rounded-[16px] w-full h-auto object-contain",
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  playsInline: true
                }
              ) }),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Prototype 2: Manual scoping",
                  content: "Using a dropdown menu to help users manually scope Copilot's context - giving users explicit control."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-center justify-center py-6 w-full", children: /* @__PURE__ */ jsx(
                "video",
                {
                  src: "/assets/copilotscoping/scopingUI.mp4",
                  className: "rounded-[16px] w-full h-auto object-contain",
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  playsInline: true
                }
              ) }),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Prototype 3: File references",
                  content: "Leveraged the existing UI for file references to help users reference external files - building on familiar patterns."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-center justify-center py-6 w-full", children: /* @__PURE__ */ jsx(
                "video",
                {
                  src: "/assets/copilotscoping/contextIQ.mp4",
                  className: "rounded-[16px] w-full h-auto object-contain",
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  playsInline: true
                }
              ) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 180, children: /* @__PURE__ */ jsxs("div", { id: "insights", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "INSIGHTS" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "4 out of 5 users preferred the dropdown menu for manual context control",
                  content: "It was the clearest and most intuitive approach for users to understand and control what Copilot could access."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Users want automatic context but don't know how to reference it",
                  content: "Users want Copilot to automatically add context based on their prompt, but were uncertain about how to reference their intended context in their prompt."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Default scope expectations varied",
                  content: "Some users expected their default scope to be the current page, not the entire notebook, since that's the content they're actively viewing."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Existing file reference UI wasn't discoverable",
                  content: "The existing UI for file references was not very discoverable and seemed complex for users in our research study."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Mental model mismatch",
                  content: "Users had different mental models of OneNote's organizational hierarchy than our internal terminology, suggesting we needed to bridge this gap in our design."
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 220, children: /* @__PURE__ */ jsxs("div", { id: "solution", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "SOLUTION" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(BigCallout, { text: "Give people the clear way to steer Copilot, and assist them automatically where we can" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 items-center justify-center py-6 w-full", children: /* @__PURE__ */ jsx(
                "video",
                {
                  src: "/assets/copilotscoping/scopingUI.mp4",
                  className: "rounded-[16px] w-full h-auto object-contain",
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  playsInline: true
                }
              ) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 160, children: /* @__PURE__ */ jsxs("div", { id: "impact", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "IMPACT" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Research findings influenced other Microsoft 365 products",
                  content: "Our research findings were applicable to other products in the Microsoft 365 suite, like Word, Excel, and PowerPoint. We collaborated with other teams on arriving at a solution for Copilot solutions across all products."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Solving a core problem for AI chat interfaces",
                  content: "This problem is fundamental for AI chat interfaces integrated into other products, because of the need for users to understand context and steer the AI system correctly. Today similar design patterns are used across different products like Cursor, ChatGPT etc."
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { delay: 140, children: /* @__PURE__ */ jsxs("div", { id: "learnings", className: "flex flex-col gap-2 items-start px-0 py-6 relative shrink-0 w-full", children: [
            /* @__PURE__ */ jsx(SectionHeader, { title: "LEARNINGS" }),
            /* @__PURE__ */ jsxs(ContentSection, { children: [
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Balance is key",
                  content: "Finding the right balance between AI assistance and user control emerged as a crucial consideration. Users want AI to enhance their workflow without taking away their agency in the note-taking process."
                }
              ),
              /* @__PURE__ */ jsx(
                TextBlock,
                {
                  title: "Collaborate early and often",
                  content: "To ensure alignment with other Microsoft teams and develop a consistent solution for all users, I learned the importance of early stakeholder involvement. This approach not only accelerated progress but also empowered team members by giving them a voice from the beginning."
                }
              )
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatedSection, { delay: 120, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-9 items-start px-0 py-20 relative shrink-0 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "text-caption-1 text-fg-2 font-ibm-plex-mono w-full", children: /* @__PURE__ */ jsx("p", { children: "MORE CASE STUDIES" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row gap-16 items-start w-full", children: otherProjects.map((project, index) => /* @__PURE__ */ jsx("div", { className: "flex-1 w-full", children: /* @__PURE__ */ jsx(WorkCard, { ...project }) }, index)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const queryClient = new QueryClient();
const App = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    setShowNavbar(true);
    setShowContent(true);
    setIsInitialLoad(false);
  }, []);
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, "data-oid": "0zkk101", children: /* @__PURE__ */ jsxs(TooltipProvider, { "data-oid": "jf228e_", children: [
    /* @__PURE__ */ jsx(Toaster$1, { "data-oid": ":1141q." }),
    /* @__PURE__ */ jsx(Toaster, { "data-oid": "mgzqa5." }),
    /* @__PURE__ */ jsxs(BrowserRouter, { "data-oid": "agrlr61", children: [
      /* @__PURE__ */ jsx(ScrollToTop, {}),
      /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-bg-1", children: [
        showNavbar && /* @__PURE__ */ jsx(Navbar, {}),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `pt-[88px] transition-transform duration-1000 ease-out ${showContent ? "translate-y-0" : "translate-y-8"}`,
            children: /* @__PURE__ */ jsxs(Routes, { "data-oid": "r2eh.zv", children: [
              /* @__PURE__ */ jsx(
                Route,
                {
                  path: "/",
                  element: /* @__PURE__ */ jsx(Index, { isInitialLoad }),
                  "data-oid": "nm6dpv6"
                }
              ),
              /* @__PURE__ */ jsx(
                Route,
                {
                  path: "/about",
                  element: /* @__PURE__ */ jsx(About, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Route,
                {
                  path: "/case-study",
                  element: /* @__PURE__ */ jsx(IOSHomeCaseStudy, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Route,
                {
                  path: "/thredup-case-study",
                  element: /* @__PURE__ */ jsx(ThredupCaseStudy, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Route,
                {
                  path: "/copilot-context",
                  element: /* @__PURE__ */ jsx(CopilotContext, { "data-oid": "1iwtzy5" }),
                  "data-oid": "v96790b"
                }
              ),
              /* @__PURE__ */ jsx(
                Route,
                {
                  path: "/copilot-canvas",
                  element: /* @__PURE__ */ jsx(CopilotCanvasCaseStudy, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Route,
                {
                  path: "*",
                  element: /* @__PURE__ */ jsx(NotFound, { "data-oid": "8ziq:n-" }),
                  "data-oid": "t3ydw-m"
                }
              )
            ] })
          }
        )
      ] })
    ] })
  ] }) });
};
const createApp = ViteSSG(App);
export {
  createApp
};
