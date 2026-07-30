import { useEffect, useRef } from "react";

export function VantaBackground({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const effect = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const THREE = await import("three");
      const mod = await import("vanta/dist/vanta.net.min");
      if (cancelled || !ref.current) return;
      effect.current?.destroy();
      const NET = (mod as unknown as { default: (o: Record<string, unknown>) => { destroy: () => void } }).default;
      effect.current = NET({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        points: 11.0,
        maxDistance: 22.0,
        spacing: 17.0,
        showDots: true,
        backgroundColor: dark ? 0x050505 : 0xffffff,
        color: dark ? 0x00f0ff : 0x0055ff,
      });
    })();
    return () => {
      cancelled = true;
      effect.current?.destroy();
      effect.current = null;
    };
  }, [dark]);

  return (
    <>
      <div ref={ref} aria-hidden className="fixed inset-0 z-[-2]" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[-1] bg-white/40 backdrop-blur-[2px] dark:bg-black/40"
      />
    </>
  );
}

export default VantaBackground;
