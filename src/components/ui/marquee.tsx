import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  speed?: "fast" | "normal" | "slow";
}

export function Marquee({
  children,
  direction = "left",
  pauseOnHover = false,
  reverse = false,
  fade = false,
  speed = "normal",
  className,
  ...props
}: MarqueeProps) {
  const speedClass = {
    fast: "[--duration:10s]",
    normal: "[--duration:20s]",
    slow: "[--duration:40s]",
  }[speed];

  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem]",
        {
          "flex-row": direction === "left" || direction === "right",
          "flex-col": direction === "up" || direction === "down",
          "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]":
            fade && (direction === "left" || direction === "right"),
          "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]":
            fade && (direction === "up" || direction === "down"),
        },
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)]",
          {
            "animate-marquee flex-row": (direction === "left" && !reverse) || (direction === "right" && reverse),
            "animate-marquee flex-row [animation-direction:reverse]": (direction === "left" && reverse) || (direction === "right" && !reverse),
            "animate-marquee-vertical flex-col": (direction === "up" && !reverse) || (direction === "down" && reverse),
            "animate-marquee-vertical flex-col [animation-direction:reverse]": (direction === "up" && reverse) || (direction === "down" && !reverse),
            "group-hover:[animation-play-state:paused]": pauseOnHover,
          },
          speedClass
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
