"use client";

export const dynamic = "force-dynamic";
import React, { createContext, useContext, useMemo, useState } from "react";
import clsx from "clsx";

type ControlsState = {
  index: number;
  total: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  visible: boolean;
  setVisible: (v: boolean) => void;
  setIndexAndTotal: (index: number, total: number) => void;
  setHandlers: (h: { onPrev?: () => void; onNext?: () => void }) => void;
};

const ControlsContext = createContext<ControlsState | null>(null);

export function useControls() {
  const ctx = useContext(ControlsContext);
  if (!ctx) throw new Error("useControls must be inside ControlsShell");
  return ctx;
}

export default function ControlsShell({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [onPrev, setOnPrev] = useState<(() => void) | undefined>();
  const [onNext, setOnNext] = useState<(() => void) | undefined>();
  const [visible, setVisible] = useState(true);

  const setIndexAndTotal = (i: number, t: number) => {
    setIndex(i);
    setTotal(t);
  };

  const setHandlers = (h: { onPrev?: () => void; onNext?: () => void }) => {
    setOnPrev(() => h.onPrev);
    setOnNext(() => h.onNext);
  };

  const ctxValue = useMemo(
    () => ({
      index,
      total,
      canPrev: index > 0,
      canNext: index < total - 1,
      onPrev,
      onNext,
      visible,
      setVisible,
      setIndexAndTotal,
      setHandlers,
    }),
    [index, total, onPrev, onNext, visible]
  );

  return (
    <ControlsContext.Provider value={ctxValue}>
      {/* Wrapper: pointer-events NONE supaya tidak blok tombol */}
      <div className="relative min-h-screen pointer-events-none">
        <div className="w-full h-full">{children}</div>

        {/* Bottom controls */}
        <div
          className={clsx(
            "pointer-events-auto fixed left-0 right-0 bottom-0 z-[99999] transition-transform duration-500",
            visible ? "translate-y-0" : "translate-y-[120%]"
          )}
          style={{ height: "10vh", maxHeight: 120 }}
        >
          <div className="h-full w-full px-6 flex items-center justify-between text-white bg-black/60 backdrop-blur-md">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onPrev) onPrev();
              }}
              disabled={!ctxValue.canPrev}
              className="px-4 py-2 bg-white/10 rounded-xl disabled:opacity-40"
            >
              Prev
            </button>

            <div className="text-lg font-medium select-none">
              {index + 1}/{total}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onNext) onNext();
              }}
              disabled={!ctxValue.canNext}
              className="px-4 py-2 bg-white/10 rounded-xl disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </ControlsContext.Provider>
  );
}
