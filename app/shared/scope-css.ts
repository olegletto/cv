// The page text is fixed: pseudo-elements may only be empty decorative boxes.
function stripGeneratedText(css: string): string {
  return css.replace(/(?<![\w-])content\s*:\s*([^;}]*)/gi, (_match, value: string) => {
    const v = value.trim().replace(/\s*!important$/i, '');
    return /^(""|''|none|normal)$/i.test(v) ? `content:${v}` : 'content:""';
  });
}

export function cleanCss(css: string): string {
  return stripGeneratedText(css)
    .replace(/```[a-z]*/gi, '')
    .replace(/^\s*css/i, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@import[^;]*;?/gi, '')
    .replace(/@charset[^;]*;?/gi, '')
    .replace(/url\s*\([^)]*\)/gi, 'none')
    .replace(/expression\s*\(/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/<\/?\s*style/gi, '');
}

function matchBrace(css: string, open: number): number {
  let depth = 0;
  let quote: string | null = null;

  for (let i = open; i < css.length; i++) {
    const char = css[i];
    if (quote) {
      if (char === '\\') {
        i += 1;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    else if (char === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function selectorIsScoped(prelude: string): boolean {
  const parts = prelude.split(',').map((part) => part.trim()).filter(Boolean);
  return parts.length > 0 && parts.every((part) => part.startsWith('#site'));
}

function scopeBlock(css: string): string {
  let out = '';
  let i = 0;

  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i += 1;
    if (i >= css.length) break;

    const brace = css.indexOf('{', i);
    if (brace === -1) break;

    const prelude = css.slice(i, brace).trim();
    const end = matchBrace(css, brace);
    if (end === -1) break;

    const inner = css.slice(brace + 1, end);
    if (
      prelude.startsWith('@keyframes') ||
      prelude.startsWith('@-webkit-keyframes')
    ) {
      out += `${prelude}{${inner}}`;
    } else if (prelude.startsWith('@media') || prelude.startsWith('@supports')) {
      const scoped = scopeBlock(inner);
      if (scoped.trim()) out += `${prelude}{${scoped}}`;
    } else if (selectorIsScoped(prelude)) {
      out += `${prelude}{${inner}}`;
    }

    i = end + 1;
  }

  return out;
}

export function scopeCss(css: string): string {
  return scopeBlock(cleanCss(css));
}
