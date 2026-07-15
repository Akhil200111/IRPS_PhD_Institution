"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  light = false,
}: {
  items: { id: string; question: string; answer: string }[];
  light?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div
      className={cn(
        "divide-y",
        light ? "divide-paper-50/12 border-paper-50/12" : "divide-ink-900/10 border-ink-900/10",
        "border-y",
      )}
    >
      {items.map((item, i) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(open ? null : item.id)}
              className="group flex w-full items-start gap-5 py-6 text-left"
              aria-expanded={open}
            >
              <span
                className={cn(
                  "mt-1 font-display text-sm font-semibold tabular-nums",
                  light ? "text-gold-400" : "text-gold-700",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "flex-1 font-display text-lg leading-snug font-medium transition-colors sm:text-xl",
                  light
                    ? "text-paper-50 group-hover:text-gold-300"
                    : "text-ink-900 group-hover:text-gold-700",
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "mt-0.5 grid size-9 shrink-0 place-items-center border transition-all duration-400",
                  open
                    ? "rotate-45 border-gold-500 bg-gold-500 text-ink-950"
                    : light
                      ? "border-paper-50/25 text-paper-50"
                      : "border-ink-900/20 text-ink-900 group-hover:border-ink-950",
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "max-w-3xl pb-7 pl-[3.4rem] text-[15px] leading-[1.8]",
                      light ? "text-paper-200/80" : "text-ink-600",
                    )}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
