import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.tsx","./components/**/*.tsx"],
  theme: { extend: {
    colors: { krasny:"#C8102E", zholty:"#F2B705", stal:"#16181a", rzha:"#8a3b12", beton:"#b9b2a4" },
    fontFamily: { poster:["var(--f-poster)","sans-serif"], body:["var(--f-body)","sans-serif"], mono:["var(--f-mono)","monospace"] },
  } },
} satisfies Config;
