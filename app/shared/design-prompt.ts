const REF_BRIEFS = [
  'playful Dutch creative-studio style (inspired by extrafazant.nl): cheeky, loud, sticker-and-badge energy. Oversized heavy sans-serif headline, tight leading, text in one or two saturated flat colors on a bold flat background. Decorative stickers (the .deco elements) as rotated starbursts (clip-path), circles, pill shapes and squiggles in contrasting colors, slightly tilted (rotate -6deg..8deg), overlapping the content edges. Links as chunky pill buttons with a hard offset shadow that jumps on hover. Bouncy overshoot animations (cubic-bezier(.34,1.56,.64,1)), elements popping in one by one. Humor in motion, not in text.',
  'deep ocean campaign style (inspired by no-fishing.net): near-black #000 to deep navy background with ONE accent color (cold cyan or signal white). Elegant, sharp display type with a slightly hooked, nautical feel (Syne or Fraunces for headings), tiny uppercase tracked labels. A fishing-net texture built from crossed repeating-linear-gradient lines at 45deg/-45deg with low opacity on .deco layers, slowly drifting. Clean minimal interface floating over a dark 3D-like space: thin 1px outlines, small circular hotspot dots with pulsing rings, subtle radial light from above like underwater. Links as thin outlined buttons that fill on hover. Slow, calm fade-and-float animations.',
];

const DIRECTIONS = [
  'neo-brutalism: thick black borders, hard offset shadows, loud flat colors',
  'editorial magazine: big serif type, lots of whitespace, thin rules',
  'glassmorphism on a vivid gradient mesh background',
  'terminal / hacker: monospace, dark, phosphor green or amber accents',
  'Swiss / International style: strict grid, huge sans-serif, red and black',
  'retro 90s web: bright colors, bevels, checkerboard patterns, chunky type',
  'soft pastel, rounded shapes, playful blobs and gentle motion',
  'dark luxury: near-black, gold hairlines, elegant serif',
  'bold poster typography: giant condensed letters, two-color palette',
  'Memphis / geometric collage: circles, triangles, squiggles in primary colors',
  'minimal paper-white with one sharp accent color and tiny precise details',
  'cyberpunk neon: dark violet, magenta and cyan glows',
  'warm earthy organic palette: terracotta, sand, olive, rounded forms',
  'blueprint / technical drawing: blue background, white grid lines, mono labels',
];

const LAYOUTS = [
  'SPLIT SCREEN: two full-height halves (about 55/45). Left half: hero text on one solid color. Right half: the contact block on a strongly contrasting panel color, with a .deco shape cutting across the seam. Stack the halves on screens under 800px.',
  'GIANT POSTER: .name is gigantic (14-22vw), uppercase or tightly set, nearly edge to edge. .hello, .bio and .skills are small and tucked around it. Shapes orbit or overlap the name. Contact is a compact strip at the bottom.',
  'DIAGONAL STAIRCASE: blocks step down and across the page like stairs (use grid with offset columns or margin-left steps), .name rotated -3deg to -6deg, each block on a different row and a different horizontal position. Nothing is centered.',
  'EDITORIAL GRID: a 12-column grid. .hello is a tiny label in the top-left corner. .name spans most columns at huge size. .bio sits in a narrow column on the right, .skills in a thin ruled row, .links and .contact in a ruled footer row. Thin 1px rules between regions.',
  'STICKER BOARD: every group (name+hello, bio, skills, links, contact) is its own card with a thick border, hard offset shadow and a different small rotation (-4deg to 5deg). Cards are laid out in a loose masonry or uneven grid with overlap. Cards use different background colors.',
  'STACKED GIANT TYPE: .first and .last are two separate display:block lines at huge size, in different colors or one in outline (-webkit-text-stroke with transparent fill). .bio is indented far right, .hello is rotated 90deg along the left edge with writing-mode.',
  'LEFT RAIL: a narrow left column holds .hello, .skills and .links stacked vertically with thin dividers; a wide right column holds a very large .name, .bio and the contact block. Rail has its own background color. Collapse to one column on mobile.',
  'ONE BIG CARD: all content sits inside a single large rounded card (glass or solid) centered on a busy full-screen background made of the .deco shapes, patterns and gradients. Inside the card use a 2-column grid: name+bio left, links+contact right.',
  'WINDOW FRAME: .wrap looks like an app window with a title bar drawn by .wrap::before (three colored dots with box-shadow, a bar), a bordered body, and a plain bar from .wrap::after (no text). Monospace-leaning typography. .deco shapes float around the window.',
  'FULL-BLEED BANDS: the page is stacked horizontal bands, each with its own background color: hero band (tall), skills band (a thin strip with large letter-spacing), links band, contact band. Set #site padding to 0 and give .hero, .links and .contact their own padding. Shapes straddle the borders between bands.',
  'CIRCULAR / ORBITAL: .name centered inside a huge circle or ring shape made with a pseudo-element on .hero; .hello above it, .bio below; .links and contact socials arranged as round badges. Shapes are concentric rings and dots.',
  'MAGAZINE COVER: a big masthead strip with .hello and .skills as small caps at the top, .name huge and overlapping a large .deco shape, .bio set in two newspaper-style columns (column-count:2), contact as a boxed "subscribe" block.',
];

const PALETTES = [
  'hot coral #ff5a4d, butter yellow #ffd23f, deep ink #1b1b2f, cream #fff6e5',
  'electric cobalt #1f3bff, lime #c6ff3d, white #ffffff, black #0a0a0a',
  'tangerine #ff7a00, deep teal #00424a, mint #b9f3df, off-white #f7f3ea',
  'hot pink #ff2e93, violet #5b2bff, acid yellow #f3ff3a, night #14081f',
  'forest #123524, moss #3e7c4f, sand #e8dcc2, terracotta #c8553d',
  'ice blue #cfe8ff, navy #0b1f3a, signal red #ff3b30, white #ffffff',
  'lavender #cdb4ff, sunshine #ffe066, charcoal #222222, peach #ffb4a2',
  'monochrome ink #0d0d0d on bone #ece8df with one flare color #ff4f00',
  'sky #5ec8ff, sunset #ff8f66, plum #3a1c4d, snow #fffaf5',
  'emerald #00a86b, black #0c0c0c, gold #f4c542, ivory #fffdf4',
  'burgundy #5a0f2e, rose #ff7a9c, cream #fff1e6, olive #6b6f2a',
  'graphite #1d1f24, cyan #19e3ff, magenta #ff2bd6, white #f5f7ff',
  'tomato red #e63b2e, pale pink #ffd9e0, royal blue #243bff, white #ffffff',
  'mustard #e1a100, petrol #0f3d4c, powder #e4eef0, rust #b5441f',
];

const SHAPES = [
  'a solid circle',
  'a ring (transparent with a thick border)',
  'a triangle (clip-path polygon)',
  'a 12-point starburst (clip-path polygon)',
  'a half circle',
  'a rotated square',
  'a long pill / capsule',
  'an organic blob (border-radius like 60% 40% 30% 70% / 60% 30% 70% 40%)',
  'a plus / cross made of two linear-gradients',
  'a block of diagonal stripes (repeating-linear-gradient)',
  'a dot grid (radial-gradient background-size)',
  'a zigzag / squiggle band (repeating-conic-gradient or repeating-linear-gradient)',
  'a quarter circle anchored to a corner',
  'a hexagon (clip-path polygon)',
];

const MOTIONS = [
  'bouncy overshoot pops (cubic-bezier(.34,1.56,.64,1)), blocks jump in one by one',
  'clip-path wipe reveals: blocks uncover left to right or bottom to top',
  'slide in from alternating sides with a slight rotation',
  'slow fade-and-float with long easing, calm and cinematic',
  'stepped, mechanical motion with steps() and quick snaps',
  'scale-up from zero with blur-to-sharp (filter) on the headline',
  'letter-spacing collapse: the name tightens from very wide tracking',
  'drop from above with a squash landing',
];

const FONTS = [
  'Space Grotesk',
  'Playfair Display',
  'Manrope',
  'Unbounded',
  'Syne',
  'Fraunces',
  'JetBrains Mono',
  'Inter',
  'Caveat',
  'Bebas Neue',
  'Archivo Black',
  'DM Serif Display',
  'Press Start 2P',
];

const recentByPool = new Map<string, string[]>();

function pickFresh<T extends string>(key: string, pool: readonly T[], keep: number): T {
  const recent = recentByPool.get(key) ?? [];
  const fresh = pool.filter((item) => !recent.includes(item));
  const options = fresh.length ? fresh : pool;
  const item = options[Math.floor(Math.random() * options.length)];
  recent.push(item);
  while (recent.length > keep) recent.shift();
  recentByPool.set(key, recent);
  return item;
}

function pickShapes(): string[] {
  const picked: string[] = [];
  while (picked.length < 3) {
    const shape = pickFresh('shape', SHAPES, 5);
    if (!picked.includes(shape)) picked.push(shape);
  }
  return picked;
}

function pickFonts(): { head: string; body: string } {
  const head = pickFresh('fontHead', FONTS, 3);
  let body = pickFresh('fontBody', FONTS, 3);
  if (body === head) body = FONTS[(FONTS.indexOf(head) + 3) % FONTS.length];
  return { head, body };
}

const HTML_STRUCTURE = `<div id="site"><div class="deco d1"></div><div class="deco d2"></div><div class="deco d3"></div><main class="wrap"><header class="hero"><p class="hello"></p><h1 class="name"><span class="first"></span> <span class="last"></span></h1><p class="bio"></p><p class="skills"></p></header><nav class="links"><a class="link link-cv"></a></nav><section class="contact"><p class="contact-kicker"></p><h2 class="contact-title"></h2><p class="contact-text"></p><nav class="socials"><a class="link link-mail"></a><a class="link link-gh"></a><a class="link link-tg"></a><a class="link link-in"></a></nav></section></main></div>`;

export function makeDesignPrompt(): string {
  const pool = Math.random() < 0.4 ? REF_BRIEFS : DIRECTIONS;
  const direction = pickFresh('direction', pool, 4);
  const layout = pickFresh('layout', LAYOUTS, 6);
  const palette = pickFresh('palette', PALETTES, 6);
  const motion = pickFresh('motion', MOTIONS, 4);
  const shapes = pickShapes();
  const fonts = pickFonts();
  const seed = Math.floor(Math.random() * 1e6);

  return `You are a world-class web designer making a one-off, memorable personal landing page. Write ONLY raw CSS (no markdown, no comments, no explanations) that fully designs this fixed page.

HTML structure (cannot be changed):
${HTML_STRUCTURE}

Hard rules:
- Every selector MUST start with #site (e.g. "#site .name"). Never style html, body, :root, #ui or anything outside #site. #site is the full-page container: give it background, min-height:100dvh and position:relative.
- You may completely restyle the layout: #site and .wrap can be grid or flex, you can set display:contents on .wrap, .hero or .contact to place their children directly on a grid, use position:absolute, transforms, writing-mode, column-count, ::before and ::after. Do NOT keep a single centered column of text unless the composition below asks for it. Do not use overflow:hidden on #site.
- The page text is fixed and must not change: never use the content property with any text, numbers or symbols (only content:"" for empty decorative boxes), never rename, translate or add words. You style the existing words only.
- Text blocks must NEVER overlap each other. Only .deco may use position:absolute or fixed. Keep .hero, .links, .contact and everything inside them in normal flow, flex or grid, each in its own row or cell, with no negative margins and no transforms that move a text block over another one. Every grid item gets its own distinct cell: no two blocks share the same grid-area or row/column. The page can be as tall as needed, .contact always comes after .hero and .links in reading order and vertical position on narrow screens.
- Never hide, clip, or make unreadable .hello, .name, .bio, .skills, .link, .contact-kicker, .contact-title, .contact-text. Text contrast at least 4.5:1 against what is directly behind it. Whenever a block, card or band gets its own background, set the text color for that exact element and re-set the color of every text class inside it in the same group (light text on a light card is the most common mistake: check each one). Links must look clickable.
- Style .skills, .link-cv and the whole .contact block, including .link-mail, .link-gh, .link-tg and .link-in, so that none of them stays on the default browser look. Each link gets its own treatment appropriate to the design (not four identical boxes if you can avoid it).
- Layout must work from 360px to 1440px wide (clamp, flex/grid, media queries). A small fixed control sits in the bottom-right corner, about 9rem wide and 3rem tall: keep at least 6rem of padding-bottom at the end of the content so nothing is covered.
- Size every .link to its label. No fixed width or height on links, no border-radius:50% on links, never hide link text with overflow.
- No url(), no @import. Use only these fonts, by exact name, with a generic fallback: ${FONTS.join(', ')}. Use font-weight 400 only for Bebas Neue, Archivo Black, DM Serif Display, Press Start 2P.
- The three .deco elements (.d1, .d2, .d3) are empty decorative layers and are REQUIRED. Use position:absolute, display:block, explicit width/height (about 18vmin to 70vmin), positions in % or vw/vh, z-index:0. Push them toward corners and edges or across seams, partly off-screen, tilted with rotate. A shape must NEVER share the color of the text that can overlap it: use a distinct hue, or opacity .15-.4 under text. Each one has its own continuous @keyframes motion (float, spin, pulse or drift).
- Every text block (.hello, .name, .bio, .skills, .links, .contact) gets its own entrance @keyframes animation with animation-fill-mode:both. The page is revealed block by block while this CSS is still being written, so put the animation property inside each block's own rule and keep each delay short (0 to .4s). Add :hover and :focus-visible states for links.
- Write about 120 to 150 compact lines in exactly this order: 1) #site background and layout, 2) the three .deco shapes, 3) .hello/.name/.bio, 4) .skills, 5) .links and .link-cv, 6) .contact and its links, 7) responsive @media rules, 8) all @keyframes at the end.

This run's brief (follow it closely, it is what makes this page different from every other run):
- Composition: ${layout}
- Visual style: ${direction}
- Color palette (use these colors; if the visual style names other colors, the palette wins): ${palette}
- Headline font: ${fonts.head}. Body font: ${fonts.body}.
- Shapes: .d1 is ${shapes[0]}; .d2 is ${shapes[1]}; .d3 is ${shapes[2]}.
- Motion: ${motion}.
Be bold and surprising, not generic or safe. Variation seed: ${seed}.`;
}
