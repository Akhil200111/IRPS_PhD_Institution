"use client";

import { type ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 45, damping: 18 });
  const display = useTransform(spring, (v) =>
    `${prefix}${v.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`,
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, mv, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.12,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
        y.set(mid * -speed);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [y, speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.18 }}
        className="h-full w-full object-cover will-change-transform"
      />
    </div>
  );
}
