"use client";

import Script from "next/script";

export default function AdscoreScript() {
  return (
    <Script
      async
      id="adscore-script"
      src="//c.adsco.re"
      strategy="beforeInteractive"
      onLoad={() => {
        if (typeof window !== "undefined") {
          // @ts-expect-error — API появляется после загрузки
          AdscoreInit("QmY1BQAAAAAARkuLO91eVKuZ0HPPbeqUIFpTAvY", {
            async_callback: 1,
          });
        }
      }}
    />
  );
}
