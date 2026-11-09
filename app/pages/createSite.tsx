"use client";

import { useEffect, useRef, useState } from "react";
import { scopeCss } from "../shared/scope-css";

const FONTS: Record<string, string> = {
  "Space Grotesk": "wght@300..700",
  "Playfair Display": "wght@400..900",
  Manrope: "wght@200..800",
  Unbounded: "wght@200..900",
  Syne: "wght@400..800",
  Fraunces: "wght@100..900",
  "JetBrains Mono": "wght@100..800",
  Inter: "wght@100..900",
  Caveat: "wght@400..700",
  "Bebas Neue": "",
  "Archivo Black": "",
  "DM Serif Display": "",
  "Press Start 2P": "",
};

const BASE_CSS = `
#site{position:relative;min-height:100dvh;overflow:auto;padding:12vh 7vw 8rem;background:#0f172a;color:#f8fafc;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
#site[data-blank]{height:100dvh;max-height:100dvh;overflow:hidden}
#site .wrap{position:relative;width:100%;margin:0 auto}
#site .hello,#site .contact-kicker{margin:0 0 .5rem;color:#94a3b8}
#site .name{margin:0 0 1.2rem;font-size:clamp(2.4rem,9vw,4.5rem);line-height:1.05}
#site .bio,#site .contact-text{margin:0 0 1.2rem;font-size:1.05rem;line-height:1.6;max-width:36rem}
#site .skills{margin:0 0 2rem;letter-spacing:.04em}
#site .links,#site .socials{display:flex;flex-wrap:wrap;gap:.8rem}
#site .link{padding:.7rem 1.2rem;border:2px solid currentColor;border-radius:8px;color:inherit;text-decoration:none}
#site .contact{margin-top:4rem}
#site .contact-title{margin:0 0 1rem;font-size:clamp(1.8rem,5vw,3rem);line-height:1.1}
#site[data-blank] .wrap,#site[data-blank] .deco{visibility:hidden}
#site[data-building]:not([data-has-hero]) :is(.hello,.name,.bio){visibility:hidden}
#site[data-building]:not([data-has-skills]) .skills{visibility:hidden}
#site[data-building]:not([data-has-links]) .links{visibility:hidden}
#site[data-building]:not([data-has-contact]) .contact{visibility:hidden}
#loader{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;animation:ld-in .3s both}
#loader .shapes{display:flex;gap:1.1rem;align-items:center;height:5rem}
#loader i{display:block;width:2.4rem;height:2.4rem;animation:ld-hop 1.1s cubic-bezier(.5,0,.3,1) infinite}
#loader i:nth-child(1){background:#38bdf8;border-radius:50%}
#loader i:nth-child(2){background:#f472b6;clip-path:polygon(50% 0,100% 100%,0 100%);animation-delay:.15s}
#loader i:nth-child(3){background:#facc15;border-radius:4px;animation-delay:.3s}
#loader p{margin:1.2rem 0 0;font:600 .75rem/1 system-ui,sans-serif;letter-spacing:.25em;text-transform:uppercase;color:#94a3b8}
@keyframes ld-hop{0%,100%{transform:translateY(0) rotate(0) scale(1)}40%{transform:translateY(-1.6rem) rotate(180deg) scale(1.15)}70%{transform:translateY(0) rotate(360deg) scale(.9)}}
@keyframes ld-in{from{opacity:0}to{opacity:1}}
#ui{position:fixed;z-index:2147483647;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:.6rem;transition:all .5s ease}
#ui[data-state="designing"],#ui[data-state="done"]{left:auto;top:auto;right:max(1rem,env(safe-area-inset-right,0px));bottom:calc(1rem + env(safe-area-inset-bottom,0px));transform:none;align-items:flex-end}
#ui #build{font:600 1rem/1 system-ui,sans-serif;padding:1rem 1.6rem;border:0;border-radius:999px;background:#111;color:#fff;box-shadow:0 0 0 2px #fff,0 6px 24px rgba(0,0,0,.35);cursor:pointer}
#ui #build:disabled{opacity:.7;cursor:progress}
#ui #msg{font:.8rem/1.3 system-ui,sans-serif;max-width:16rem;padding:.3rem .6rem;border-radius:6px;background:#111;color:#fff;text-align:center}
#ui #msg:empty{display:none}
#ui #tick{font:.7rem/1.3 ui-monospace,Menlo,monospace;max-width:16rem;padding:.25rem .5rem;border-radius:6px;background:#111;color:#7dd3fc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#ui #tick:empty{display:none}
`;

const GUARD_CSS = `
#site{padding-bottom:max(6rem,env(safe-area-inset-bottom,0px)) !important;overflow-x:hidden !important}
#site .wrap{position:relative;z-index:1}
#ui[data-state="designing"] #build,#ui[data-state="done"] #build{font-size:.8rem;padding:.75rem 1.1rem}
#site .deco{pointer-events:none}
#site .link{width:auto !important;height:auto !important;max-width:100% !important;overflow:visible !important;white-space:nowrap}
`;

const CV_URL =
  "https://drive.google.com/file/d/17NLEk9J7VTntfr4zLY08_GmvKQb0jxlE/view?usp=sharing";

type UiState = "idle" | "designing" | "done";

function fallbackMessage(code: string): string {
  if (code === "quota") return "API limit reached. Showing the current design.";
  if (code === "rate_limited") return "Too many requests. Showing the current design.";
  if (code === "empty") return "Could not assemble the site. Showing the current design.";
  return "AI is unavailable. Showing the current design.";
}

function isAbort(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name: string }).name === "AbortError"
  );
}

type Rgba = [number, number, number, number];

function parseColor(value: string): Rgba | null {
  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return null;
  return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
}

function luminance([r, g, b]: Rgba): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: Rgba, b: Rgba): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function backdropOf(el: HTMLElement): Rgba | null {
  const layers: Rgba[] = [];
  let node: HTMLElement | null = el;
  while (node) {
    const style = getComputedStyle(node);
    if (style.backgroundImage !== "none") return null;
    const bg = parseColor(style.backgroundColor);
    if (bg && bg[3] > 0) {
      layers.push(bg);
      if (bg[3] >= 0.95) break;
    }
    if (node.id === "site") break;
    node = node.parentElement;
  }
  if (!layers.length) return null;
  let base: Rgba = layers[layers.length - 1];
  if (base[3] < 0.95) base = [255, 255, 255, 1];
  const start = layers[layers.length - 1][3] < 0.95 ? layers.length - 1 : layers.length - 2;
  let [r, g, b] = base;
  for (let i = start; i >= 0; i--) {
    const [lr, lg, lb, la] = layers[i];
    r = lr * la + r * (1 - la);
    g = lg * la + g * (1 - la);
    b = lb * la + b * (1 - la);
  }
  return [r, g, b, 1];
}

const TEXT_SELECTOR =
  "#site .hello, #site .first, #site .last, #site .bio, #site .skills, #site .link, #site .contact-kicker, #site .contact-title, #site .contact-text";

function resetContrastFixes() {
  document
    .querySelectorAll<HTMLElement>(TEXT_SELECTOR)
    .forEach((el) => el.style.removeProperty("color"));
}

function fixContrast() {
  document.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((el) => {
    const style = getComputedStyle(el);
    const stroke = parseFloat(style.getPropertyValue("-webkit-text-stroke-width"));
    const color = parseColor(style.color);
    if (!color || color[3] < 0.5 || stroke > 0) return;
    const backdrop = backdropOf(el);
    if (!backdrop) return;
    if (contrast(color, backdrop) >= 3.2) return;
    const dark: Rgba = [17, 17, 17, 1];
    const light: Rgba = [255, 255, 255, 1];
    el.style.setProperty(
      "color",
      contrast(dark, backdrop) >= contrast(light, backdrop) ? "#111" : "#fff",
      "important",
    );
  });
}

// Text blocks must never sit on top of each other. Leaf text elements only,
// so parent/child pairs are not compared.
const BLOCK_SELECTOR =
  "#site .hello, #site .name, #site .bio, #site .skills, #site .link-cv, #site .contact-kicker, #site .contact-title, #site .contact-text, #site .link-mail, #site .link-gh, #site .link-tg, #site .link-in";

const BLOCKS = ".hello,.name,.bio,.skills,.links,.contact,.contact-kicker,.contact-title,.contact-text,.socials";

// Level 1: take blocks out of absolute positioning. Level 2: also drop
// transforms and negative margins. Level 3: force a plain vertical flow.
const REPAIR_CSS = [
  "",
  `#site :is(${BLOCKS}){position:relative !important;inset:auto !important;translate:none !important}`,
  `#site :is(${BLOCKS}){position:relative !important;inset:auto !important;translate:none !important;transform:none !important;margin-top:0 !important;margin-bottom:.75rem !important}
#site :is(.hero,.links,.contact){position:relative !important;inset:auto !important;transform:none !important}`,
  `#site{display:block !important}
#site .wrap{display:flex !important;flex-direction:column !important;gap:2rem !important;width:min(100%,64rem) !important;max-width:none !important;margin:0 auto !important;padding:0 !important;transform:none !important}
#site :is(.hero,.links,.contact){display:block !important;position:relative !important;inset:auto !important;transform:none !important;translate:none !important;grid-area:auto !important;grid-column:auto !important;grid-row:auto !important;width:auto !important;max-width:none !important;height:auto !important;margin:0 !important}
#site .links,#site .socials{display:flex !important;flex-wrap:wrap !important}
#site :is(.hello,.name,.bio,.skills,.contact-kicker,.contact-title,.contact-text){position:relative !important;inset:auto !important;transform:none !important;translate:none !important;margin-left:0 !important;margin-right:0 !important}`,
];

async function settleAnimations() {
  const site = document.getElementById("site");
  if (!site) return;
  const pending = site
    .getAnimations({ subtree: true })
    .filter((animation) => {
      const timing = animation.effect?.getComputedTiming();
      return (
        !!timing &&
        timing.iterations !== Infinity &&
        Number(timing.endTime) < 6000
      );
    })
    .map((animation) => animation.finished.catch(() => undefined));
  await Promise.race([
    Promise.all(pending),
    new Promise((resolve) => setTimeout(resolve, 3500)),
  ]);
}

function hasOverlappingBlocks(): boolean {
  const rects = Array.from(
    document.querySelectorAll<HTMLElement>(BLOCK_SELECTOR),
  )
    .filter((el) => getComputedStyle(el).visibility !== "hidden")
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.width > 4 && r.height > 4);

  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i];
      const b = rects[j];
      const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (w <= 0 || h <= 0) continue;
      const smaller = Math.min(a.width * a.height, b.width * b.height);
      if ((w * h) / smaller > 0.15) return true;
    }
  }
  return false;
}

async function readErrorCode(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: unknown };
    if (typeof data.error === "string") return data.error;
  } catch {
    // The body was not JSON.
  }
  return response.status === 429 ? "quota" : "unavailable";
}

export default function CreateSite({
  onFallback,
}: {
  onFallback: (message: string) => void;
}) {
  const [uiState, setUiState] = useState<UiState>("idle");
  const [label, setLabel] = useState("Create a site");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [blank, setBlank] = useState(true);
  const [generatedCss, setGeneratedCss] = useState("");
  const [tail, setTail] = useState("");
  const [progress, setProgress] = useState(0);
  const [repairLevel, setRepairLevel] = useState(0);
  const [checkTick, setCheckTick] = useState(0);
  const pendingRef = useRef("");
  const rafRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const busyRef = useRef(false);
  const loadedFonts = useRef<Set<string>>(new Set());

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // After a build finishes, escalate repairs until no text blocks overlap.
  useEffect(() => {
    if (uiState !== "done") return;
    let cancelled = false;
    const run = async () => {
      await settleAnimations();
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (cancelled) return;
      if (repairLevel < REPAIR_CSS.length - 1 && hasOverlappingBlocks()) {
        setRepairLevel((level) => level + 1);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [uiState, repairLevel, checkTick]);

  // The layout can change on resize: start the check over from level 0.
  useEffect(() => {
    if (uiState !== "done") return;
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setRepairLevel(0);
        setCheckTick((tick) => tick + 1);
      }, 350);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [uiState]);

  const loadFonts = (css: string) => {
    for (const name of Object.keys(FONTS)) {
      if (loadedFonts.current.has(name) || !css.includes(name)) continue;
      loadedFonts.current.add(name);
      const link = document.createElement("link");
      link.rel = "stylesheet";
      const spec = FONTS[name];
      link.href =
        "https://fonts.googleapis.com/css2?family=" +
        name.replace(/ /g, "+") +
        (spec ? `:${spec}` : "") +
        "&display=swap";
      document.head.appendChild(link);
    }
  };

  const applyPending = () => {
    const raw = pendingRef.current;
    const css = scopeCss(raw);
    loadFonts(css);
    setGeneratedCss((prev) => (prev === css ? prev : css));
    if (css.length > 60) setBlank(false);
    const lines = raw
      .replace(/```[a-z]*/gi, "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    setTail((lines[lines.length - 1] ?? "").slice(-60));
    setProgress(Math.min(95, Math.round((raw.length / 3500) * 100)));
  };

  const scheduleApply = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      applyPending();
    });
  };

  const build = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setBlank(true);
    setGeneratedCss("");
    setUiState("designing");
    setMessage("Designing… 0%");
    setLabel("Designing…");
    setTail("");
    setProgress(0);
    resetContrastFixes();
    setRepairLevel(0);
    pendingRef.current = "";
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/design", {
        method: "POST",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(await readErrorCode(response));
      if (!response.body) throw new Error("unavailable");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        pendingRef.current = accumulated;
        scheduleApply();
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      pendingRef.current = accumulated;
      const finalCss = scopeCss(accumulated);
      loadFonts(finalCss);
      setGeneratedCss(finalCss);
      if (finalCss.length < 250 || !finalCss.includes("{")) {
        throw new Error("empty");
      }
      setBlank(false);
      setUiState("done");
      setMessage("");
      setTail("");
      setLabel("Create again");
      requestAnimationFrame(() => requestAnimationFrame(fixContrast));
    } catch (error) {
      if (!mountedRef.current || isAbort(error)) return;
      const code = error instanceof Error ? error.message : "unavailable";
      const known = ["quota", "rate_limited", "unavailable", "empty"];
      onFallback(fallbackMessage(known.includes(code) ? code : "unavailable"));
    } finally {
      busyRef.current = false;
      if (mountedRef.current) setBusy(false);
    }
  };

  return (
    <>
      <style>{BASE_CSS}</style>
      <style id="gen">{generatedCss}</style>
      <style>{GUARD_CSS}</style>
      <style id="repair">{busy ? "" : REPAIR_CSS[repairLevel]}</style>
      {busy && blank && (
        <div id="loader" aria-hidden>
          <div className="shapes">
            <i />
            <i />
            <i />
          </div>
          <p>Designing</p>
        </div>
      )}
      <div
        id="site"
        data-blank={blank ? "" : undefined}
        data-building={busy ? "" : undefined}
        data-has-hero={
          /\.(hello|name|bio|hero)\b/.test(generatedCss) ? "" : undefined
        }
        data-has-skills={/\.skills\b/.test(generatedCss) ? "" : undefined}
        data-has-links={/\.link/.test(generatedCss) ? "" : undefined}
        data-has-contact={/\.contact/.test(generatedCss) ? "" : undefined}
      >
        <div className="deco d1" />
        <div className="deco d2" />
        <div className="deco d3" />
        <main className="wrap">
          <header className="hero">
            <p className="hello">Hi, my name is</p>
            <h1 className="name">
              <span className="first">Oleg</span>{" "}
              <span className="last">Labunin</span>
            </h1>
            <p className="bio">
              I&apos;m Frontend Developer with 6 years of expertise in building
              enterprise applications using React, Next.js and TypeScript.
              Proficient in the full development cycle, from architectural
              design to final release.
            </p>
            <p className="skills">React · Next.js · TypeScript</p>
          </header>
          <nav className="links">
            <a
              className="link link-cv"
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </nav>
          <section className="contact" id="contact">
            <p className="contact-kicker">What&apos;s Next?</p>
            <h2 className="contact-title">Get In Touch</h2>
            <p className="contact-text">
              Ready to discuss your next project? I&apos;d love to hear from
              you. Let&apos;s create something amazing together.
            </p>
            <nav className="socials">
              <a className="link link-mail" href="mailto:olegletto@gmail.com">
                Email
              </a>
              <a
                className="link link-gh"
                href="https://github.com/olegletto/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="link link-tg"
                href="https://t.me/olegletto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
              <a
                className="link link-in"
                href="https://www.linkedin.com/in/olegletto/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </nav>
          </section>
        </main>
      </div>
      <div id="ui" data-state={uiState}>
        <button
          id="build"
          type="button"
          onClick={build}
          disabled={busy}
          aria-busy={busy}
        >
          {label}
        </button>
        <div id="msg" role="status">
          {uiState === "designing" ? `Designing… ${progress}%` : message}
        </div>
        <div id="tick" aria-hidden>
          {uiState === "designing" ? tail : ""}
        </div>
      </div>
    </>
  );
}
