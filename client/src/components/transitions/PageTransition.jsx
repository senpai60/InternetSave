import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const transitionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Initial entry animation for first load
    const tl = gsap.timeline();

    tl.to(transitionRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.2,
    }).from(
      contentRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5",
    );
  }, []);

  useEffect(() => {
    // Transition on location change (except for initial)
    const tl = gsap.timeline();

    // 1. Panel wipes in
    tl.to(transitionRef.current, {
      yPercent: 0,
      duration: 0.8,
      ease: "power4.inOut",
    })
      // 2. Hide current content
      .set(contentRef.current, { visibility: "hidden" })
      // 3. Pause briefly for "data loading" feel or just sync
      .to({}, { duration: 0.1 })
      // 4. Panel wipes out
      .to(transitionRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      })
      // 5. Show new content
      .set(contentRef.current, { visibility: "visible" })
      .fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.4",
      );
  }, [location.pathname]);

  return (
    <>
      {/* The actual transitioning panel */}
      <div
        ref={transitionRef}
        className="fixed inset-0 bg-zinc-900 z-1000000 flex items-center justify-center pointer-events-none"
        style={{ transform: "translateY(0%)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-px bg-zinc-100/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-zinc-50 transition-loader w-full h-full" />
          </div>
          <span className="text-zinc-50 text-[10px] uppercase tracking-[0.2em] font-light">
            Loading Linkora
          </span>
        </div>
      </div>

      {/* The content wrapper */}
      <div ref={contentRef}>{children}</div>
    </>
  );
};

export default PageTransition;
