import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// src/templateCSS.ts
var TEMPLATE_BASELINE_CSS = `
:root {
  --font-default-obsidian: ui-sans-serif, -apple-system, BlinkMacSystemFont,
    system-ui, "Segoe UI", Roboto, "Inter", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  --font-monospace-default-obsidian: ui-monospace, SFMono-Regular,
    "Cascadia Mono", "Roboto Mono", "DejaVu Sans Mono", "Liberation Mono",
    Menlo, Monaco, "Consolas", "Source Code Pro", monospace;
  --font-default: var(--font-default-obsidian);
  --font-monospace-default: var(--font-monospace-default-obsidian);

  /* Resolved font stacks \u2014 themes override these in their base aspect.
     The baseline just ensures usable defaults before theme CSS loads. */
  --font-text: var(--font-default);
  --font-interface: var(--font-default);
  --font-monospace: var(--font-monospace-default);

  --h1-font: inherit;
  --h2-font: inherit;
  --h3-font: inherit;
  --h4-font: inherit;
  --h5-font: inherit;
  --h6-font: inherit;
}
`;
var TEMPLATE_CSS = `
/* === quartz-themes template styles (ported from v4) === */

.search {
  & > .search-button {
    font-size: 1rem;
    svg {
      color: var(--search-icon-color, var(--text-muted, var(--darkgray)));
      stroke: var(--search-icon-color, var(--text-muted, var(--darkgray)));
    }
  }
  & > .search-container {
    & > .search-space {
        margin: 12vh auto;
      & > input {
        margin-bottom: 0;
        border-bottom: none;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        font-size: 1.1rem;
        &:has(+ :not(.display-results)) {
          border-radius: inherit;
        }
      }
      & > * {
        background: transparent;
        margin-bottom: 0;
        box-shadow: none;
      }
      & > .search-layout {
        &.display-results {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
        & .highlight {
          background-color: var(--quartz-text-highlight)
        }
        & > .results-container {
          & .result-card {
            @media all and (min-width: 801px) {
              display: flex;
              &.no-match {
                display: block;
              }
            }
            &:has(~ .result-card:hover),
            &:has(~ .result-card:focus),
            &:has(~ .result-card.focus) {
              background-color: unset;
            }
            & > ul > li > p {
              background-color: transparent;
            }
          }
        }
      }
    }
  }
}

.explorer {
  @media all and (max-width: 800px) {
    &:not(.collapsed) > .explorer-content {
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
    }
  }
  .explorer-content {
    .folder-container {
      /* --folder-closed-icon: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 5h-8.586L9.707 3.293A.997.997 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"></path></svg>');
      /* --folder-open-icon: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path></svg>');

      text-overflow: ellipsis;
      position: relative;

      @media all and (max-width: 800px) {
        padding-inline-start: 0.5rem;
        padding-inline-end: 0rem;
        border-radius: 0.25rem;
      }
      & > svg {
        opacity: 0.001;
        position: absolute;
        /* height: 1.5rem; */
        /* width: 1.5rem; */
        /* top: 0; */
        /* left: -0.25rem; */
        margin: 0;
      }
      /* &:before { */
        /* width: 1rem; */
        /* height: 1rem; */
        /* min-width: 1rem; */
        /* min-height: 1rem; */
        /* display: flex; */
        /* align-self: baseline; */
        /* background: var(--quartz-icon-color); */
        /* content: ''; */
        /* margin-inline-end: 0.5rem; */
        /* margin-block-start: 0.2rem; */
      /* } */
      & > div {
        width: 100%;
      }
      &:hover {
        font-size: 1rem;
        line-height: 1.5rem;
        background-color: var(--nav-item-background-hover);
        border-radius: 0.25rem;
      }
    }
    /* li:has(> .folder-outer:not(.open)) > .folder-container:before { */
      /* background: var(--collapse-icon-color-collapsed, var(--quartz-icon-color)); */
      /* mask-image: var(--folder-closed-icon); */
      /* -webkit-mask-image: var(--folder-closed-icon); */
    /* } */
    /* li:has(> .folder-outer.open) > .folder-container:before { */
      /* background: var(--collapse-icon-color, var(--quartz-icon-color)); */
      /* mask-image: var(--folder-open-icon); */
      /* -webkit-mask-image: var(--folder-open-icon); */
    /* } */
    ul.explorer-ul li {
      text-overflow: ellipsis;
      position: relative;
      margin-left: 0;

      a {
        display: flex;
        color: inherit;
        font-size: 1rem;
        line-height: 1.5rem;
        padding: inherit;

        &.active,
        &:not(.folder-title):hover {
          font-size: 1rem;
          line-height: 1.5rem;
          background-color: var(--nav-item-background-hover);
          border-radius: 0.25rem;
        }
        &[data-for$="/index"] {
          padding-inline-start: 0.5rem;
          padding-inline-end: 0;
        }
        padding-inline-start: 0;

        @media all and (max-width: 800px) {
          padding-inline-start: 0.5rem;
          padding-inline-end: 0.5rem;
          &[data-for$="/index"] {
            padding-inline-end: 0.5rem;
          }
        }
      }
      /* > a:before { */
        /* --file-icon: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=""><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>'); */
        /* width: 1rem; */
        /* height: 1rem; */
        /* min-width: 1rem; */
        /* min-height: 1rem; */
        /* content: ''; */
        /* display: flex; */
        /* align-self: baseline; */
        /* background: var(--quartz-icon-color); */
        /* mask-image: var(--file-icon); */
        /* -webkit-mask-image: var(--file-icon); */
        /* margin-inline-end: 0.5rem; */
        /* margin-block-start: 0.2rem; */
      /* } */
    }
  }
}

.explorer svg,
button.toc-header .fold,
.global-graph-icon,
.readermode,
.darkmode {
  color: var(--quartz-icon-color);
  stroke: var(--quartz-icon-color);
}

@media all and (max-width: 1200px) {
  :root[saved-theme="dark"],
  :root[saved-theme="light"] {
    &body .page > div#quartz-body div.sidebar.right {
      background-color: transparent;
      border-left: none;
    }
  }
}

@media all and (min-width: 1200px) {
  div#quartz-root.page {
    /* workaround for reader-mode */
    display: grid;
    place-items: center;
    width: 100%;
    min-width: 100dvw;
    max-width: 100dvw;
    padding: 0;
    margin: 0;
  }
  div#quartz-root.page div#quartz-body {
    /* workaround for reader-mode */
    width: min(100%, calc(1200px + 300px));
    max-width: min(100%, calc(1200px + 300px));
    padding: 0 auto;
  }
  .page > #quartz-body {
    & div.center,
    & footer {
      min-width: calc(100% - 3rem);
      max-width: calc(100% - 3rem);
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin-left: 0;
      margin-right: 0;
    }
  }
}

@media all and (min-width: 800px) and (max-width: 1200px) {
  .page > #quartz-body {
    padding-left: 0;
    padding-right: 0;

    div.center,
    footer {
      min-width: calc(100% - 3rem);
      max-width: calc(100% - 3rem);
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    div.sidebar.left {
      padding-left: 2rem;
    }

    div.sidebar.right,
    footer {
      padding: 0 1.5rem;
    }

    div.sidebar.right {
      max-width: 100%;
    }
  }
}

@media all and (max-width: 800px) {
  .page > div#quartz-body div.sidebar.left {
    background-color: transparent;
    border-right: none;
  }
  .page > #quartz-body {
    padding: 0;

    div.center,
    footer {
      min-width: calc(100dvw - 3rem);
      max-width: calc(100dvw - 3rem);
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    div.sidebar.left,
    div.sidebar.left:has(.explorer) {
      padding: 1rem 1.5rem 1rem 1rem;
    }

    div.sidebar.right,
    footer {
      padding: 0 1.5rem;
    }

    div.sidebar.left,
    div.sidebar.right {
      max-width: 100dvw;
    }

    .explorer {
      .explorer-content {
        padding-left: 1rem;
        padding-right: 1rem;
        overflow-y: auto;
        max-height: 100vh;
        & > .explorer-ul {
          min-height: 0;
          overscroll-behavior: contain;
        }
        ul {
          overscroll-behavior: auto;
        }
      }
    }
  }
  .page-title {
    display: none;
  }

  .callout {
    z-index: auto !important;
  }
}

.callout.is-collapsed .callout-content>:first-child {
  margin-top: -4rem;
}

figure[data-rehype-pretty-code-figure] pre,
pre {
  background-color: var(--code-background);
  white-space: pre;

  & > code {
    overflow-x: auto;

    span[data-token-type="keyword"] {
      color: var(--code-keyword);
    }
    span[data-token-type="string"] {
      color: var(--code-string);
    }
    span[data-token-type="comment"] {
      color: var(--code-comment);
      font-style: italic;
    }
    span[data-token-type="function"] {
      color: var(--code-function);
    }
    span[data-token-type="value"] {
      color: var(--code-value);
    }
    span[data-token-type="operator"] {
      color: var(--code-operator);
    }
    span[data-token-type="property"] {
      color: var(--code-property);
    }
    span[data-token-type="normal"] {
      color: var(--code-normal);
    }
    span[data-token-type="tag"] {
      color: var(--code-tag);
    }
    span[data-token-type="important"] {
      color: var(--code-important);
      font-style: italic;
    }
    span[data-token-type="punctuation"] {
      color: var(--code-punctuation);
    }
    span[data-token-type="regexp"] {
      color: var(--code-string);
    }

    /* Legacy: github-light/github-dark only \u2014 remove once tokenClassification is standard */
    span[style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"] {
      color: var(--code-value);
    }
    span[style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"] {
      color: var(--code-function);
    }
    span[style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"] {
      color: var(--code-string);
    }
    span[style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"] {
      color: var(--code-property);
    }
    span[style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"] {
      color: var(--code-normal);
    }
    span[style="--shiki-light:#586069;--shiki-dark:#D1D5DA;"] {
      color: var(--code-punctuation);
    }
    span[style="--shiki-light:#F6F8FA;--shiki-dark:#2F363D;"] {
      color: var(--code-comment);
    }
    span[style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"] {
      color: var(--code-comment);
    }
    span[style="--shiki-light:#22863A;--shiki-dark:#85E89D;"] {
      color: var(--code-tag);
    }
    span[style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"] {
      color: var(--code-important);
    }
    span[style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;"] {
      color: var(--code-operator);
    }
    span[style="--shiki-light:#D73A49;--shiki-dark:#F97583;"] {
      color: var(--code-keyword);
    }

    background-color: transparent;
    color: var(--code-normal);
  }
}

/*
blockquote.callout {
  .callout-title {
    color: var(--color);
    .callout-icon {
      background-color: var(--color);
    }
  }
  .callout-title > .callout-title-inner > p {
    color: var(--color);
  }
  &[data-callout] {
    border: 1px solid var(--border);
    background-color: var(--bg);
    --color: rgb(var(--callout-info, 2, 122, 255));
    --border: rgba(var(--callout-info, 2, 122, 255), 0.267);
    --bg: rgba(var(--callout-info, 2, 122, 255), 0.063);
  }
  &[data-callout="note"] {
    --color: rgb(var(--callout-default, 2, 122, 255));
    --border: rgba(var(--callout-default, 2, 122, 255), 0.267);
    --bg: rgba(var(--callout-default, 2, 122, 255), 0.063);
  }
  &[data-callout="abstract"] {
    --color: rgb(var(--callout-summary, 83, 223, 221));
    --border: rgba(var(--callout-summary, 83, 223, 221), 0.267);
    --bg: rgba(var(--callout-summary, 83, 223, 221), 0.063);
  }
  &[data-callout="info"] {
    --color: rgb(var(--callout-info, 2, 122, 255));
    --border: rgba(var(--callout-info, 2, 122, 255), 0.267);
    --bg: rgba(var(--callout-info, 2, 122, 255), 0.063);
  }
  &[data-callout="todo"] {
    --color: rgb(var(--callout-todo, 2, 122, 255));
    --border: rgba(var(--callout-todo, 2, 122, 255), 0.267);
    --bg: rgba(var(--callout-todo, 2, 122, 255), 0.063);
  }
  &[data-callout="tip"] {
    --color: rgb(var(--callout-tip, 83, 223, 221));
    --border: rgba(var(--callout-tip, 83, 223, 221), 0.267);
    --bg: rgba(var(--callout-tip, 83, 223, 221), 0.063);
  }
  &[data-callout="success"] {
    --color: rgb(var(--callout-success, 68, 207, 110));
    --border: rgba(var(--callout-success, 68, 207, 110), 0.267);
    --bg: rgba(var(--callout-success, 68, 207, 110), 0.063);
  }
  &[data-callout="question"] {
    --color: rgb(var(--callout-question, 233, 151, 63));
    --border: rgba(var(--callout-question, 233, 151, 63), 0.267);
    --bg: rgba(var(--callout-question, 233, 151, 63), 0.063);
  }
  &[data-callout="warning"] {
    --color: rgb(var(--callout-warning, 233, 151, 63));
    --border: rgba(var(--callout-warning, 233, 151, 63), 0.267);
    --bg: rgba(var(--callout-warning, 233, 151, 63), 0.063);
  }
  &[data-callout="failure"] {
    --color: rgb(var(--callout-fail, 251, 70, 76));
    --border: rgba(var(--callout-fail, 251, 70, 76), 0.267);
    --bg: rgba(var(--callout-fail, 251, 70, 76), 0.063);
  }
  &[data-callout="danger"] {
    --color: rgb(var(--callout-error, 251, 70, 76));
    --border: rgba(var(--callout-error, 251, 70, 76), 0.267);
    --bg: rgba(var(--callout-error, 251, 70, 76), 0.063);
  }
  &[data-callout="bug"] {
    --color: rgb(var(--callout-bug, 251, 70, 76));
    --border: rgba(var(--callout-bug, 251, 70, 76), 0.267);
    --bg: rgba(var(--callout-bug, 251, 70, 76), 0.063);
  }
  &[data-callout="example"] {
    --color: rgb(var(--callout-example, 168, 130, 255));
    --border: rgba(var(--callout-example, 168, 130, 255), 0.267);
    --bg: rgba(var(--callout-example, 168, 130, 255), 0.063);
  }
  &[data-callout="quote"] {
    --color: rgb(var(--callout-quote, 158, 158, 158));
    --border: rgba(var(--callout-quote, 158, 158, 158), 0.267);
    --bg: rgba(var(--callout-quote, 158, 158, 158), 0.063);
  }
}
*/

:root[reader-mode="on"] {
  body[data-slug] {
    div#quartz-root.page {
      transition: background-color .2s;
      &:not(:has(.sidebar:hover)) {
        background-color: transparent;
        transition: background-color .2s;
        .sidebar {
          opacity: 0;
          transition: opacity .2s;
        }
      }
    }
    div#quartz-root.page:not(:has(.center:hover, footer:hover)):hover {
      .sidebar {
        opacity: 1;
        transition: opacity .2s;
      }
    }
  }
}

/* fallback for internal links */
body a.internal-link {
  background-color: rgb(from var(--highlight) r g b / 0.3);
}

:root[saved-theme="light"], :root[saved-theme="dark"] {
  body {
    a.external-link, a.internal-link, .breadcrumb-container .breadcrumb-element > a, footer a {
      text-decoration: none;
    }
    div#quartz-root.page[data-frame="canvas"] > div#quartz-body,
    div#quartz-root.page[data-frame="excalidraw"] > div#quartz-body {
      width: 100%;
      max-width: 100%;
      &> .canvas-frame,
      &> .excalidraw-frame {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}

`;
var TEMPLATE_OVERRIDE_CSS = `
/* heading sizes */
h1 { --h1-size: 1.618rem; }
h2 { --h2-size: 1.462rem; }
h3 { --h3-size: 1.318rem; }
h4 { --h4-size: 1.188rem; }
h5 { --h5-size: 1.076rem; }
h6 { --h6-size: 1rem; }
h2.page-title { font-size: 1rem; }
.backlinks > h3,
.graph > h3,
.explorer-toggle > h2 {
  font-size: 1.318rem;
  margin-bottom: 0;
}

/* icon buttons \u2014 mask-image icons need a visible background */
button.readermode {
  & > svg { display: none; }
  --readermode-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvb2stb3Blbi1pY29uIGx1Y2lkZS1ib29rLW9wZW4iPjxwYXRoIGQ9Ik0xMiA3djE0Ii8+PHBhdGggZD0iTTMgMThhMSAxIDAgMCAxLTEtMVY0YTEgMSAwIDAgMSAxLTFoNWE0IDQgMCAwIDEgNCA0IDQgNCAwIDAgMSA0LTRoNWExIDEgMCAwIDEgMSAxdjEzYTEgMSAwIDAgMS0xIDFoLTZhMyAzIDAgMCAwLTMgMyAzIDMgMCAwIDAtMy0zeiIvPjwvc3ZnPg==');
  background: var(--quartz-icon-color);
  mask-image: var(--readermode-icon);
  -webkit-mask-image: var(--readermode-icon);
  width: 24px;
  height: 24px;
}

button.global-graph-icon {
  & > svg { display: none; }
  --graph-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdpdC1mb3JrLWljb24gbHVjaWRlLWdpdC1mb3JrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjE4IiByPSIzIi8+PGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjMiLz48Y2lyY2xlIGN4PSIxOCIgY3k9IjYiIHI9IjMiLz48cGF0aCBkPSJNMTggOXYyYzAgLjYtLjQgMS0xIDFIN2MtLjYgMC0xLS40LTEtMVY5Ii8+PHBhdGggZD0iTTEyIDEydjMiLz48L3N2Zz4=');
  background: var(--quartz-icon-color);
  mask-image: var(--graph-icon);
  -webkit-mask-image: var(--graph-icon);
  width: 24px;
  height: 24px;
}

button.darkmode {
  & > svg { display: none !important; }
  --moon-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1vb24taWNvbiBsdWNpZGUtbW9vbiI+PHBhdGggZD0iTTEyIDNhNiA2IDAgMCAwIDkgOSA5IDkgMCAxIDEtOS05WiIvPjwvc3ZnPg==');
  --sun-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1bi1pY29uIGx1Y2lkZS1zdW4iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiLz48cGF0aCBkPSJNMTIgMnYyIi8+PHBhdGggZD0iTTEyIDIwdjIiLz48cGF0aCBkPSJtNC45MyA0LjkzIDEuNDEgMS40MSIvPjxwYXRoIGQ9Im0xNy42NiAxNy42NiAxLjQxIDEuNDEiLz48cGF0aCBkPSJNMiAxMmgyIi8+PHBhdGggZD0iTTIwIDEyaDIiLz48cGF0aCBkPSJtNi4zNCAxNy42Ni0xLjQxIDEuNDEiLz48cGF0aCBkPSJtMTkuMDcgNC45My0xLjQxIDEuNDEiLz48L3N2Zz4=');
  background: var(--quartz-icon-color);
  width: 24px;
  height: 24px;
}

:root[saved-theme="light"] button.darkmode {
  mask-image: var(--sun-icon);
  -webkit-mask-image: var(--sun-icon);
}
:root[saved-theme="dark"] button.darkmode {
  mask-image: var(--moon-icon);
  -webkit-mask-image: var(--moon-icon);
}

/* explorer icons */
/* .explorer .explorer-content .folder-container:before { */
  /* background: var(--quartz-icon-color); */
/* } */
/* .explorer .explorer-content ul.explorer-ul li > a:before { */
  /* background: var(--quartz-icon-color); */
/* } */

/* inline sidebar fixes */
@media all and (max-width: 1200px) {
  :root[saved-theme="dark"] body .page > div#quartz-body div.sidebar.right,
  :root[saved-theme="light"] body .page > div#quartz-body div.sidebar.right {
    background-color: transparent;
  }
}

/* reader mode fixes */
@media all and (min-width: 1200px) {
  :root[saved-theme="dark"] body[data-slug] div#quartz-root.page:not([data-frame="canvas"]):not([data-frame="excalidraw"]),
  :root[saved-theme="light"] body[data-slug] div#quartz-root.page:not([data-frame="canvas"]):not([data-frame="excalidraw"]) {
    background-color: var(--tab-container-background);
  }
  .page:not([data-frame="canvas"]):not([data-frame="excalidraw"]) {
    margin: 0;
    padding-left: calc((100% - min(1500px, 100dvw))/2);
    padding-right: calc((100% - min(1500px, 100dvw))/2);
  }
  :root[reader-mode="on"][saved-theme="dark"] body[data-slug] div#quartz-root.page,
  :root[reader-mode="on"][saved-theme="light"] body[data-slug] div#quartz-root.page {
    background-color: transparent;
    transition: opacity, background .2s;
  }
  /* hovering left sidebar */
  :root[reader-mode="on"][saved-theme="dark"] body[data-slug] div#quartz-root.page:has(div.sidebar.left:hover),
  :root[reader-mode="on"][saved-theme="light"] body[data-slug] div#quartz-root.page:has(div.sidebar.left:hover) {
    background-color: transparent;
    background-image: linear-gradient(270deg, transparent 0%, transparent 50%, var(--tab-container-background) 50%, var(--tab-container-background) 100%);
  }
  /* hovering right sidebar */
  :root[reader-mode="on"][saved-theme="dark"] body[data-slug] div#quartz-root.page:has(div.sidebar.right:hover),
  :root[reader-mode="on"][saved-theme="light"] body[data-slug] div#quartz-root.page:has(div.sidebar.right:hover) {
    background-color: transparent;
    background-image: linear-gradient(90deg, transparent 0%, transparent 50%, var(--tab-container-background) 50%, var(--tab-container-background) 100%);
  }
}

/* code blocks */
:root[saved-theme="dark"] body code,
:root[saved-theme="light"] body code {
  font-family: var(--font-monospace);
}

/* center */
@media all and (min-width: 1200px) {
  .page > #quartz-body .center,
  .page > #quartz-body footer {
    min-width: calc(100% - 3rem);
    max-width: calc(100% - 3rem);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-left: 0;
    margin-right: 0;
  }
}

:root[saved-theme="light"], :root[saved-theme="dark"] {
  body {
    a.external-link, a.internal-link, .breadcrumb-container .breadcrumb-element > a, footer a {
      text-decoration: none;
    }
    div#quartz-root.page[data-frame="canvas"] > div#quartz-body,
    div#quartz-root.page[data-frame="excalidraw"] > div#quartz-body {
      width: 100%;
      max-width: 100%;
      &> .canvas-frame,
      &> .excalidraw-frame {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
`;

// src/themes/_registry.ts
var themeMetas = {
  _baseline: {
    name: "_baseline",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "80s-neon": { name: "80s-neon", modes: ["dark"], variations: [], fonts: [] },
  aaaa: { name: "aaaa", modes: ["dark", "light"], variations: [], fonts: [] },
  abate: {
    name: "abate",
    modes: ["light"],
    variations: [],
    fonts: ["noto-sans"]
  },
  abecedarium: {
    name: "abecedarium",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  absolutegruv: {
    name: "absolutegruv",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  abyssal: {
    name: "abyssal",
    modes: ["dark", "light"],
    variations: ["colorful-headings"],
    fonts: []
  },
  acovia: {
    name: "acovia",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  adrenaline: {
    name: "adrenaline",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  adwaita: {
    name: "adwaita",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cantarell"]
  },
  aera: { name: "aera", modes: ["dark", "light"], variations: [], fonts: [] },
  agate: {
    name: "agate",
    modes: ["light"],
    variations: [],
    fonts: ["noto-serif", "pretendard", "noto-sans-kr", "itc-slimbach"]
  },
  "aged-whisky": {
    name: "aged-whisky",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  agora: { name: "agora", modes: ["dark"], variations: [], fonts: [] },
  air: { name: "air", modes: ["dark", "light"], variations: [], fonts: [] },
  "ak-sky-breeze": {
    name: "ak-sky-breeze",
    modes: ["light"],
    variations: [],
    fonts: []
  },
  "al-dente": {
    name: "al-dente",
    modes: ["light"],
    variations: [],
    fonts: ["nunito-sans", "courier-prime", "bitter"]
  },
  "alice-velvet": {
    name: "alice-velvet",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  alien: { name: "alien", modes: ["dark", "light"], variations: [], fonts: [] },
  allium: {
    name: "allium",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "amber-cathode": {
    name: "amber-cathode",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  amethyst: {
    name: "amethyst",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "amoled-serenity": {
    name: "amoled-serenity",
    modes: ["dark"],
    variations: [],
    fonts: ["bricolage-grotesque", "roboto", "montserrat"]
  },
  "an-old-hope": {
    name: "an-old-hope",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  anarchy: {
    name: "anarchy",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "another-nord": {
    name: "another-nord",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "antique-flowers": {
    name: "antique-flowers",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  anuppuccin: {
    name: "anuppuccin",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["noto-serif"]
  },
  apatheia: {
    name: "apatheia",
    modes: ["dark"],
    variations: [],
    fonts: ["roboto"]
  },
  apathy: { name: "apathy", modes: ["dark"], variations: [], fonts: [] },
  apex: { name: "apex", modes: ["dark", "light"], variations: [], fonts: [] },
  "apple-notes": {
    name: "apple-notes",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  arcadia: {
    name: "arcadia",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  arcane: {
    name: "arcane",
    modes: ["dark"],
    variations: [],
    fonts: ["roboto"]
  },
  "ars-magna": {
    name: "ars-magna",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  arzaba: {
    name: "arzaba",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["open-sans"]
  },
  atelier: {
    name: "atelier",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  atom: { name: "atom", modes: ["dark", "light"], variations: [], fonts: [] },
  atomus: { name: "atomus", modes: ["dark"], variations: [], fonts: [] },
  aubade: {
    name: "aubade",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  auger: { name: "auger", modes: ["dark", "light"], variations: [], fonts: [] },
  aura: {
    name: "aura",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ia-writer-mono", "ia-writer-duo", "ia-writer-quattro-s", "monaco"]
  },
  "aura-dark": {
    name: "aura-dark",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  aurora: { name: "aurora", modes: ["dark"], variations: [], fonts: [] },
  "aurora-twilight": {
    name: "aurora-twilight",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cabin", "quicksand"]
  },
  autotape: {
    name: "autotape",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  avatar: {
    name: "avatar",
    modes: ["dark"],
    variations: [],
    fonts: ["jetbrains-mono", "kalam"]
  },
  awareai: {
    name: "awareai",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  ayu: { name: "ayu", modes: ["dark", "light"], variations: [], fonts: [] },
  "ayu-dark": { name: "ayu-dark", modes: ["dark"], variations: [], fonts: [] },
  "ayu-light-mirage": {
    name: "ayu-light-mirage",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["lora", "monaspace-neon"]
  },
  "ayu-mirage": {
    name: "ayu-mirage",
    modes: ["dark"],
    variations: [],
    fonts: ["ia-writer-quattro-s", "monaco", "source-sans-pro"]
  },
  "ayu-palette": {
    name: "ayu-palette",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  azure: { name: "azure", modes: ["dark", "light"], variations: [], fonts: [] },
  base16: {
    name: "base16",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "base16-default-dark": {
    name: "base16-default-dark",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  base2tone: { name: "base2tone", modes: ["dark"], variations: [], fonts: [] },
  baseline: {
    name: "baseline",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "behave-dark": {
    name: "behave-dark",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "big-bold": {
    name: "big-bold",
    modes: ["dark", "light"],
    variations: [],
    fonts: [
      "eb-garamond",
      "fira-code",
      "merriweather-sans",
      "noto-serif",
      "noto-color-emoji",
      "noto-emoji",
      "nunito-sans"
    ]
  },
  "big-sur-aesthetic": {
    name: "big-sur-aesthetic",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  biggs: { name: "biggs", modes: ["dark", "light"], variations: [], fonts: [] },
  black: { name: "black", modes: ["dark"], variations: [], fonts: [] },
  "black-and-white": {
    name: "black-and-white",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  blackbird: { name: "blackbird", modes: ["dark"], variations: [], fonts: [] },
  blobob: {
    name: "blobob",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "blood-rush": {
    name: "blood-rush",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  blossom: { name: "blossom", modes: ["dark"], variations: [], fonts: [] },
  "blue-ribbon": {
    name: "blue-ribbon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "blue-topaz": {
    name: "blue-topaz",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["lucida-handwriting", "icons/boxicons"]
  },
  blur: { name: "blur", modes: ["dark", "light"], variations: [], fonts: [] },
  bolt: {
    name: "bolt",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["formular"]
  },
  border: {
    name: "border",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  borealis: {
    name: "borealis",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  bossidian: { name: "bossidian", modes: ["dark"], variations: [], fonts: [] },
  brainhack: {
    name: "brainhack",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cascadia-mono"]
  },
  "brutal-gum": {
    name: "brutal-gum",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  brutalism: {
    name: "brutalism",
    modes: ["dark"],
    variations: [],
    fonts: ["archivo"]
  },
  brutalist: {
    name: "brutalist",
    modes: ["dark", "light"],
    variations: [],
    fonts: [
      "ai-writer-duo",
      "ai-writer-quattro",
      "ai-writer-mono",
      "libre-baskerville",
      "literata",
      "marcellus",
      "montserrat",
      "sen"
    ]
  },
  "bubble-space": {
    name: "bubble-space",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "buena-vista": {
    name: "buena-vista",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  buisson: {
    name: "buisson",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  bumblebee: {
    name: "bumblebee",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  bureau: {
    name: "bureau",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "california-coast": {
    name: "california-coast",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "calm-nights": {
    name: "calm-nights",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  camena: {
    name: "camena",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["avenir", "cascadia-code"]
  },
  carbon: {
    name: "carbon",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ibm-plex-mono", "ibm-plex-sans"]
  },
  cardinal: {
    name: "cardinal",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  cardstock: {
    name: "cardstock",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  carnelian: {
    name: "carnelian",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "carpe-noctem": {
    name: "carpe-noctem",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  catppuccin: {
    name: "catppuccin",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nunito-sans", "vollkorn"]
  },
  "catppuccin.frappe": {
    name: "catppuccin.frappe",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nunito-sans", "vollkorn"]
  },
  "catppuccin.macchiato": {
    name: "catppuccin.macchiato",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nunito-sans", "vollkorn"]
  },
  catthode: { name: "catthode", modes: ["dark"], variations: [], fonts: [] },
  "celestial-night": {
    name: "celestial-night",
    modes: ["dark"],
    variations: [],
    fonts: ["bookerly", "hatolie", "merienda"]
  },
  charcoal: {
    name: "charcoal",
    modes: ["dark"],
    variations: [],
    fonts: ["ia-writer-quattro-s", "monaco", "source-sans-pro"]
  },
  chiaroscuroflow: {
    name: "chiaroscuroflow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["manrope", "nunito-sans"]
  },
  chime: {
    name: "chime",
    modes: ["dark", "light"],
    variations: [],
    fonts: [
      "archivo",
      "arima",
      "ibm-plex-sans",
      "linux-libertine",
      "icons/noto-sans-symbols-2"
    ]
  },
  christmas: { name: "christmas", modes: ["dark"], variations: [], fonts: [] },
  "cidreira-coast": {
    name: "cidreira-coast",
    modes: ["light"],
    variations: [],
    fonts: []
  },
  cinderpaper: {
    name: "cinderpaper",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "citrus-neo": {
    name: "citrus-neo",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "clair-de-lune": {
    name: "clair-de-lune",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  claude: { name: "claude", modes: ["dark"], variations: [], fonts: [] },
  "claude-code-orange": {
    name: "claude-code-orange",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "claude-cream": {
    name: "claude-cream",
    modes: ["light"],
    variations: [],
    fonts: []
  },
  "claude-notes": {
    name: "claude-notes",
    modes: ["light"],
    variations: [],
    fonts: []
  },
  "claude-paper": {
    name: "claude-paper",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "claude-warm": {
    name: "claude-warm",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  clawdia: {
    name: "clawdia",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "cloud-dancer": {
    name: "cloud-dancer",
    modes: ["light", "dark"],
    variations: [],
    fonts: []
  },
  "cobalt-peacock": {
    name: "cobalt-peacock",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  cocoa: {
    name: "cocoa",
    modes: ["dark"],
    variations: [],
    fonts: ["palatino"]
  },
  "cocoa-nook": {
    name: "cocoa-nook",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  codeazur: { name: "codeazur", modes: ["dark"], variations: [], fonts: [] },
  "coding-agent": {
    name: "coding-agent",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  coffee: {
    name: "coffee",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "cognia-noir": {
    name: "cognia-noir",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "colored-candy": {
    name: "colored-candy",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  colours: {
    name: "colours",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  comfort: { name: "comfort", modes: ["light"], variations: [], fonts: [] },
  "comfort-color-dark": {
    name: "comfort-color-dark",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "comfort-dark": {
    name: "comfort-dark",
    modes: ["dark"],
    variations: [],
    fonts: ["iosevka-web", "jetbrains-mono"]
  },
  "comfort-smooth": {
    name: "comfort-smooth",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  compline: {
    name: "compline",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  composed: { name: "composed", modes: ["light"], variations: [], fonts: [] },
  composer: {
    name: "composer",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  consolas: {
    name: "consolas",
    modes: ["dark"],
    variations: [],
    fonts: ["inconsolata"]
  },
  cordyceps: {
    name: "cordyceps",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "cosmic-events": {
    name: "cosmic-events",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  cosmical: {
    name: "cosmical",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  covert: { name: "covert", modes: ["dark"], variations: [], fonts: [] },
  crafted: {
    name: "crafted",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "cranky-goblin": {
    name: "cranky-goblin",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  creature: {
    name: "creature",
    modes: ["dark"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "creme-brulee": {
    name: "creme-brulee",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["merriweather-sans"]
  },
  crestfall: { name: "crestfall", modes: ["dark"], variations: [], fonts: [] },
  cupertino: {
    name: "cupertino",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-pro-display"]
  },
  "cyber-glow": {
    name: "cyber-glow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ballet", "oxanium", "space-wham", "orbitron"]
  },
  cyberglow: {
    name: "cyberglow",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  cybertron: {
    name: "cybertron",
    modes: ["dark"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  "cybertron-shifted": {
    name: "cybertron-shifted",
    modes: ["dark"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  cybrcore: { name: "cybrcore", modes: ["dark"], variations: [], fonts: [] },
  "dark-castle": {
    name: "dark-castle",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "dark-clarity": {
    name: "dark-clarity",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["noto-sans", "jetbrains-mono"]
  },
  "dark-graphite": {
    name: "dark-graphite",
    modes: ["dark"],
    variations: [],
    fonts: ["ia-writer-quattro-s", "monaco"]
  },
  "dark-graphite-pie": {
    name: "dark-graphite-pie",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "dark-knight": {
    name: "dark-knight",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "dark-moss": {
    name: "dark-moss",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  darkcatto: { name: "darkcatto", modes: ["dark"], variations: [], fonts: [] },
  darkember: {
    name: "darkember",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  darkrune: { name: "darkrune", modes: ["dark"], variations: [], fonts: [] },
  darkyan: { name: "darkyan", modes: ["dark"], variations: [], fonts: [] },
  dashboard: { name: "dashboard", modes: ["light"], variations: [], fonts: [] },
  dawn: { name: "dawn", modes: ["dark", "light"], variations: [], fonts: [] },
  dayspring: {
    name: "dayspring",
    modes: ["light"],
    variations: [],
    fonts: ["crimson-pro", "figtree"]
  },
  dedication: {
    name: "dedication",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "dedication-2": {
    name: "dedication-2",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "deep-submerge": {
    name: "deep-submerge",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "deeper-work": {
    name: "deeper-work",
    modes: ["dark"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  deepfield: {
    name: "deepfield",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  default: {
    name: "default",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["flow-circular"]
  },
  dekurai: { name: "dekurai", modes: ["dark"], variations: [], fonts: [] },
  delightful: {
    name: "delightful",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  densy: { name: "densy", modes: ["light"], variations: [], fonts: [] },
  desserts: {
    name: "desserts",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  didadi: {
    name: "didadi",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  discordian: {
    name: "discordian",
    modes: ["dark"],
    variations: [],
    fonts: ["catamaran"]
  },
  "dissociated-identitea": {
    name: "dissociated-identitea",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  docgen: {
    name: "docgen",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  doctorfree: {
    name: "doctorfree",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  dolch: { name: "dolch", modes: ["dark"], variations: [], fonts: [] },
  "dracula-for-obsidian": {
    name: "dracula-for-obsidian",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "dracula-gemini": {
    name: "dracula-gemini",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "dracula-lyt": {
    name: "dracula-lyt",
    modes: ["dark"],
    variations: [],
    fonts: ["monaco", "sf-mono"]
  },
  "dracula-official": {
    name: "dracula-official",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "dracula-plus": {
    name: "dracula-plus",
    modes: ["dark"],
    variations: [],
    fonts: ["jetbrains-mono", "monaco"]
  },
  "dracula-slim": {
    name: "dracula-slim",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  duality: {
    name: "duality",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  dune: { name: "dune", modes: ["dark", "light"], variations: [], fonts: [] },
  dunite: {
    name: "dunite",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  dust: {
    name: "dust",
    modes: ["dark"],
    variations: [],
    fonts: ["icons/material-icons", "fira-code"]
  },
  "dynamic-color": {
    name: "dynamic-color",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  ebullientworks: {
    name: "ebullientworks",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  ecdysis: { name: "ecdysis", modes: ["dark"], variations: [], fonts: [] },
  eldritch: { name: "eldritch", modes: ["dark"], variations: [], fonts: [] },
  electrocution: {
    name: "electrocution",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  elegance: {
    name: "elegance",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["monaco"]
  },
  elysian: {
    name: "elysian",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  ember: { name: "ember", modes: ["dark", "light"], variations: [], fonts: [] },
  "ember-graphite": {
    name: "ember-graphite",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  emerald: {
    name: "emerald",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "emerald-echo": {
    name: "emerald-echo",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "emerald-synth": {
    name: "emerald-synth",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  emrald: {
    name: "emrald",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  enchanted: {
    name: "enchanted",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  encore: {
    name: "encore",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "enhanced-canvas": {
    name: "enhanced-canvas",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "enhanced-file-explorer-tree": {
    name: "enhanced-file-explorer-tree",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "esther-inspired": {
    name: "esther-inspired",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  ethereon: {
    name: "ethereon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  evangelion: {
    name: "evangelion",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  everblush: { name: "everblush", modes: ["dark"], variations: [], fonts: [] },
  everforest: {
    name: "everforest",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["hack"]
  },
  "everforest-enchanted": {
    name: "everforest-enchanted",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "everforest-spruce": {
    name: "everforest-spruce",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "evergreen-shadow": {
    name: "evergreen-shadow",
    modes: ["dark"],
    variations: [],
    fonts: ["noto-sans-old-persian", "noto-serif-kr"]
  },
  evilred: {
    name: "evilred",
    modes: ["dark"],
    variations: [],
    fonts: ["hack"]
  },
  exotic: { name: "exotic", modes: ["dark"], variations: [], fonts: [] },
  faded: { name: "faded", modes: ["dark"], variations: [], fonts: [] },
  "fancy-a-story": {
    name: "fancy-a-story",
    modes: ["dark", "light"],
    variations: [],
    fonts: [
      "chakra-petch",
      "limelight",
      "noto-serif",
      "orbitron",
      "playfair-display",
      "walter-turncoat"
    ]
  },
  fastppuccin: {
    name: "fastppuccin",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["noto-serif"]
  },
  feather: {
    name: "feather",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  firefly: { name: "firefly", modes: ["dark"], variations: [], fonts: [] },
  fjord: { name: "fjord", modes: ["dark", "light"], variations: [], fonts: [] },
  "flamingo-noir": {
    name: "flamingo-noir",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  flatcap: { name: "flatcap", modes: ["dark"], variations: [], fonts: [] },
  flexcyon: {
    name: "flexcyon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "flexcyon.tui": {
    name: "flexcyon.tui",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  flexoki: {
    name: "flexoki",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "flexoki-warm": {
    name: "flexoki-warm",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "flexoki-warmer": {
    name: "flexoki-warmer",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  flynt: { name: "flynt", modes: ["dark", "light"], variations: [], fonts: [] },
  focus: {
    name: "focus",
    modes: ["dark"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  folio: { name: "folio", modes: ["dark", "light"], variations: [], fonts: [] },
  "football-notes": {
    name: "football-notes",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "forest-phosphor": {
    name: "forest-phosphor",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  framer: {
    name: "framer",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  freecolors: {
    name: "freecolors",
    modes: ["light", "dark"],
    variations: [],
    fonts: []
  },
  friendly: {
    name: "friendly",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  frost: {
    name: "frost",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono", "roboto"]
  },
  "frozen-kingdom": {
    name: "frozen-kingdom",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  fusion: {
    name: "fusion",
    modes: ["light", "light"],
    variations: [],
    fonts: []
  },
  future: {
    name: "future",
    modes: ["light", "light"],
    variations: [],
    fonts: []
  },
  "garden-gnome-adwaita-gtk": {
    name: "garden-gnome-adwaita-gtk",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  gastown: { name: "gastown", modes: ["light"], variations: [], fonts: [] },
  gdct: {
    name: "gdct",
    modes: ["light"],
    variations: [],
    fonts: ["ia-writer-quattro-s", "monaco"]
  },
  "gdct-dark": {
    name: "gdct-dark",
    modes: ["dark"],
    variations: [],
    fonts: ["ia-writer-quattro-s", "monaco"]
  },
  "geocities-98": {
    name: "geocities-98",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "github-dark-dimmed": {
    name: "github-dark-dimmed",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "github-flavored-markdown": {
    name: "github-flavored-markdown",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "github-theme": {
    name: "github-theme",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  githubdhc: {
    name: "githubdhc",
    modes: ["dark"],
    variations: [],
    fonts: ["fira-code", "noto-sans"]
  },
  gitsidian: {
    name: "gitsidian",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "glass-robo": {
    name: "glass-robo",
    modes: ["dark"],
    variations: [],
    fonts: ["figtree", "jetbrains-mono"]
  },
  "glass-scholar": {
    name: "glass-scholar",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  glassmind: {
    name: "glassmind",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "golden-coffee": {
    name: "golden-coffee",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "golden-topaz": {
    name: "golden-topaz",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["lucida-handwriting", "monaco"]
  },
  gothic: {
    name: "gothic",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "green-holiday": {
    name: "green-holiday",
    modes: ["light", "dark"],
    variations: [],
    fonts: []
  },
  "green-nightmare": {
    name: "green-nightmare",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "grounded-tierra": {
    name: "grounded-tierra",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "gruber-darker": {
    name: "gruber-darker",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  gummy: { name: "gummy", modes: ["dark"], variations: [], fonts: [] },
  "gummy-revived": {
    name: "gummy-revived",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["peace-sans", "space-grotesk"]
  },
  "h2-os": { name: "h2-os", modes: ["light"], variations: [], fonts: [] },
  hackthebox: {
    name: "hackthebox",
    modes: ["dark"],
    variations: [],
    fonts: ["open-sans"]
  },
  halcyon: { name: "halcyon", modes: ["dark"], variations: [], fonts: [] },
  "half-life": {
    name: "half-life",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  hanabi: {
    name: "hanabi",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "handwriting-kalam": {
    name: "handwriting-kalam",
    modes: ["light"],
    variations: [],
    fonts: ["courier-prime", "kalam"]
  },
  "happy-coding": {
    name: "happy-coding",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "harbor-dark": {
    name: "harbor-dark",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  harmonic: {
    name: "harmonic",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  hearthcode: {
    name: "hearthcode",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  heboric: {
    name: "heboric",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto": {
    name: "hidden-grotto",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.absol": {
    name: "hidden-grotto.absol",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.aegislash": {
    name: "hidden-grotto.aegislash",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.aggron": {
    name: "hidden-grotto.aggron",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.arcanine": {
    name: "hidden-grotto.arcanine",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.aromatisse": {
    name: "hidden-grotto.aromatisse",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.calyrex": {
    name: "hidden-grotto.calyrex",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.cryogonal": {
    name: "hidden-grotto.cryogonal",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.darkrai": {
    name: "hidden-grotto.darkrai",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.diancie": {
    name: "hidden-grotto.diancie",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.hisuian-typhlosion": {
    name: "hidden-grotto.hisuian-typhlosion",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.manectric": {
    name: "hidden-grotto.manectric",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.mareep": {
    name: "hidden-grotto.mareep",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.mega-lucario": {
    name: "hidden-grotto.mega-lucario",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.meloetta": {
    name: "hidden-grotto.meloetta",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.necrozma": {
    name: "hidden-grotto.necrozma",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.pirouette-meloetta": {
    name: "hidden-grotto.pirouette-meloetta",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.poltchageist": {
    name: "hidden-grotto.poltchageist",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.scolipede": {
    name: "hidden-grotto.scolipede",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.swampert": {
    name: "hidden-grotto.swampert",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "hidden-grotto.ursaluna": {
    name: "hidden-grotto.ursaluna",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  higlighter: {
    name: "higlighter",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  hipstersmoothie: {
    name: "hipstersmoothie",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  hojicha: { name: "hojicha", modes: ["dark"], variations: [], fonts: [] },
  horizon: { name: "horizon", modes: ["dark"], variations: [], fonts: [] },
  hoverpopup: {
    name: "hoverpopup",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  hulk: { name: "hulk", modes: ["dark"], variations: [], fonts: ["monaco"] },
  "hydra-pressure": {
    name: "hydra-pressure",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  hyo: { name: "hyo", modes: ["dark", "light"], variations: [], fonts: [] },
  "ia-writer": {
    name: "ia-writer",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ia-writer-duo"]
  },
  "ib-writer": {
    name: "ib-writer",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ia-writer-quattro"]
  },
  iceberg: { name: "iceberg", modes: ["dark"], variations: [], fonts: [] },
  "improved-potato": {
    name: "improved-potato",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "infosecwarrior-ui": {
    name: "infosecwarrior-ui",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  ink: { name: "ink", modes: ["light"], variations: [], fonts: [] },
  "ink-paper": {
    name: "ink-paper",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  ion: { name: "ion", modes: ["dark"], variations: [], fonts: [] },
  iridium: {
    name: "iridium",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  islands: {
    name: "islands",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "its-theme": {
    name: "its-theme",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.blue": {
    name: "its-theme.blue",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.drowned": {
    name: "its-theme.drowned",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.gray": {
    name: "its-theme.gray",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.its-dark": {
    name: "its-theme.its-dark",
    modes: ["dark"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.minimalist": {
    name: "its-theme.minimalist",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.nord": {
    name: "its-theme.nord",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.notion": {
    name: "its-theme.notion",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.rainbow": {
    name: "its-theme.rainbow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.school-days": {
    name: "its-theme.school-days",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.tangerine-dunes": {
    name: "its-theme.tangerine-dunes",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.ttrpg-dnd": {
    name: "its-theme.ttrpg-dnd",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.ttrpg-pathfinder": {
    name: "its-theme.ttrpg-pathfinder",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.ttrpg-pathfinder-remastered": {
    name: "its-theme.ttrpg-pathfinder-remastered",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "its-theme.ttrpg-wotc": {
    name: "its-theme.ttrpg-wotc",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  "jolly-holly": {
    name: "jolly-holly",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  jotter: {
    name: "jotter",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  kakano: {
    name: "kakano",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.black": {
    name: "kakano.black",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.cyan": {
    name: "kakano.cyan",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.green": {
    name: "kakano.green",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.grey": {
    name: "kakano.grey",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.orange": {
    name: "kakano.orange",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.pink": {
    name: "kakano.pink",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.purple": {
    name: "kakano.purple",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.red": {
    name: "kakano.red",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.white": {
    name: "kakano.white",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kakano.yellow": {
    name: "kakano.yellow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono"]
  },
  "kami-reader": {
    name: "kami-reader",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  kanagawa: {
    name: "kanagawa",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["hack"]
  },
  "kanagawa-hokusai": {
    name: "kanagawa-hokusai",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "kanagawa-palette": {
    name: "kanagawa-palette",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "kanagawa-paper": {
    name: "kanagawa-paper",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["hack"]
  },
  karadigm: {
    name: "karadigm",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "kiwi-mono": {
    name: "kiwi-mono",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cascadia-mono"]
  },
  kurokula: {
    name: "kurokula",
    modes: ["dark"],
    variations: [],
    fonts: ["atkinson-hyperlegible", "jetbrains-mono"]
  },
  "kxc-cipher": {
    name: "kxc-cipher",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  lagom: {
    name: "lagom",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["formular"]
  },
  lapfly: {
    name: "lapfly",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  latex: {
    name: "latex",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["computer-modern-bright"]
  },
  latsidian: {
    name: "latsidian",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  lattelogic: {
    name: "lattelogic",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "lavender-mist": {
    name: "lavender-mist",
    modes: ["light"],
    variations: [],
    fonts: ["noto-serif-kr"]
  },
  lcars: { name: "lcars", modes: ["dark"], variations: [], fonts: [] },
  lectern: {
    name: "lectern",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "lemons-theme": {
    name: "lemons-theme",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  lesswrong: {
    name: "lesswrong",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "light-bright": {
    name: "light-bright",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["lato", "roboto", "work-sans"]
  },
  likexp: {
    name: "likexp",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  listive: {
    name: "listive",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["courgette", "karla", "open-sans"]
  },
  litos: { name: "litos", modes: ["dark", "light"], variations: [], fonts: [] },
  "lizardmen-zettelkasten": {
    name: "lizardmen-zettelkasten",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  lockett: {
    name: "lockett",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  lorens: { name: "lorens", modes: ["dark"], variations: [], fonts: [] },
  love: { name: "love", modes: ["dark", "light"], variations: [], fonts: [] },
  lucid: { name: "lucid", modes: ["dark", "light"], variations: [], fonts: [] },
  lucy: { name: "lucy", modes: ["dark", "light"], variations: [], fonts: [] },
  lumen: { name: "lumen", modes: ["dark", "light"], variations: [], fonts: [] },
  lumines: {
    name: "lumines",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "lyt-mode": {
    name: "lyt-mode",
    modes: ["dark"],
    variations: [],
    fonts: ["dm-mono", "dm-sans", "fira-code"]
  },
  macos: { name: "macos", modes: ["dark", "light"], variations: [], fonts: [] },
  "mado-11": {
    name: "mado-11",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "mado-miniflow": {
    name: "mado-miniflow",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  magicuser: {
    name: "magicuser",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  makinda: {
    name: "makinda",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  mammoth: { name: "mammoth", modes: ["dark"], variations: [], fonts: [] },
  manuscript: {
    name: "manuscript",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  maple: {
    name: "maple",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["maple-mono"]
  },
  "maple.default": {
    name: "maple.default",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["maple-mono"]
  },
  "maple.minimal": {
    name: "maple.minimal",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["maple-mono"]
  },
  marathon: {
    name: "marathon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "material-3": {
    name: "material-3",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto"]
  },
  "material-3-expressive": {
    name: "material-3-expressive",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "material-flat": {
    name: "material-flat",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "roboto-mono"]
  },
  "material-gruvbox": {
    name: "material-gruvbox",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "material-ocean": {
    name: "material-ocean",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  matrix: { name: "matrix", modes: ["dark"], variations: [], fonts: [] },
  meridian: {
    name: "meridian",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  mia: { name: "mia", modes: ["dark", "light"], variations: [], fonts: [] },
  "miami-wind": {
    name: "miami-wind",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "micro-mike": {
    name: "micro-mike",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  midnight: { name: "midnight", modes: ["dark"], variations: [], fonts: [] },
  "midnight-fjord": {
    name: "midnight-fjord",
    modes: ["dark"],
    variations: [],
    fonts: ["finlandica"]
  },
  "milk-tea": {
    name: "milk-tea",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  minimal: {
    name: "minimal",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto"]
  },
  "minimal-dark-coder": {
    name: "minimal-dark-coder",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "minimal-dracula": {
    name: "minimal-dracula",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "minimal-edge": {
    name: "minimal-edge",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto"]
  },
  "minimal-red": {
    name: "minimal-red",
    modes: ["dark"],
    variations: [],
    fonts: ["geist"]
  },
  "minimal-resources": {
    name: "minimal-resources",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "minimalist-studio": {
    name: "minimalist-studio",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "minimalists-paradise": {
    name: "minimalists-paradise",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["fira-code"]
  },
  "mint-breeze": {
    name: "mint-breeze",
    modes: ["light"],
    variations: [],
    fonts: ["noto-sans-old-persian", "noto-serif-kr"]
  },
  misty: { name: "misty", modes: ["dark", "light"], variations: [], fonts: [] },
  mistymauve: {
    name: "mistymauve",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["arvo", "permanent-marker"]
  },
  "modern-dark": {
    name: "modern-dark",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "modern-genz-vibedose": {
    name: "modern-genz-vibedose",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jost", "satoshi", "syne", "jetbrains-mono"]
  },
  molecule: { name: "molecule", modes: ["dark"], variations: [], fonts: [] },
  "monkey-king": {
    name: "monkey-king",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "mono-black-monochrome-charcoal": {
    name: "mono-black-monochrome-charcoal",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "mono-high-contrast": {
    name: "mono-high-contrast",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["fira-code"]
  },
  monochroyou: {
    name: "monochroyou",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  monokai: {
    name: "monokai",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "monokai-filtersun-spectrum": {
    name: "monokai-filtersun-spectrum",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "monokai-ristretto": {
    name: "monokai-ristretto",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "monokai-syntax": {
    name: "monokai-syntax",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  moonlight: {
    name: "moonlight",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  moremonocolor: {
    name: "moremonocolor",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "mulled-wine": {
    name: "mulled-wine",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "museifu-basic": {
    name: "museifu-basic",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  mushin: {
    name: "mushin",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  "muted-blue": {
    name: "muted-blue",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  myst: {
    name: "myst",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/material-symbols-outlined", "s-core-dream-3-light"]
  },
  nebula: {
    name: "nebula",
    modes: ["dark"],
    variations: [],
    fonts: ["montserrat"]
  },
  nebulux: {
    name: "nebulux",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  neo: {
    name: "neo",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  "neo-sploosh": {
    name: "neo-sploosh",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "neon-acid": {
    name: "neon-acid",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "neon-dracula": {
    name: "neon-dracula",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "neon-dreams": {
    name: "neon-dreams",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "neon-synthwave": {
    name: "neon-synthwave",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  neovim: {
    name: "neovim",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  nerv: { name: "nerv", modes: ["dark", "light"], variations: [], fonts: [] },
  neuborder: { name: "neuborder", modes: ["light"], variations: [], fonts: [] },
  neumorphism: {
    name: "neumorphism",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "neutral-academia": {
    name: "neutral-academia",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cormorant", "manrope"]
  },
  nichneumor: {
    name: "nichneumor",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  nier: { name: "nier", modes: ["dark"], variations: [], fonts: [] },
  "night-owl": {
    name: "night-owl",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "night-owl-native": {
    name: "night-owl-native",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "night-ridge": {
    name: "night-ridge",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  nightfox: {
    name: "nightfox",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  nightingale: {
    name: "nightingale",
    modes: ["dark"],
    variations: [],
    fonts: ["inconsolata", "noto-sans"]
  },
  "nightly-wolf": {
    name: "nightly-wolf",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  nobb: { name: "nobb", modes: ["dark"], variations: [], fonts: [] },
  noctilux: { name: "noctilux", modes: ["dark"], variations: [], fonts: [] },
  noctis: { name: "noctis", modes: ["dark"], variations: [], fonts: [] },
  "noctis-family": {
    name: "noctis-family",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "noctis-viola": {
    name: "noctis-viola",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  nord: { name: "nord", modes: ["dark", "light"], variations: [], fonts: [] },
  nordic: {
    name: "nordic",
    modes: ["light"],
    variations: [],
    fonts: ["deadhead-script", "gentium-book-basic", "norwester"]
  },
  "northern-sky": {
    name: "northern-sky",
    modes: ["light"],
    variations: [],
    fonts: ["finlandica"]
  },
  nostromo: {
    name: "nostromo",
    modes: ["dark"],
    variations: [],
    fonts: ["share-tech-mono", "vt323"]
  },
  "nota-limonada-light": {
    name: "nota-limonada-light",
    modes: ["light"],
    variations: [],
    fonts: []
  },
  notation: {
    name: "notation",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "notation-2": {
    name: "notation-2",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["lyons-serif", "ia-writer-duospace"]
  },
  nothing: {
    name: "nothing",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "notion-style": {
    name: "notion-style",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  notswift: {
    name: "notswift",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto", "sf-mono", "sf-pro-display"]
  },
  "nott-dagr": {
    name: "nott-dagr",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  nous: { name: "nous", modes: ["dark", "light"], variations: [], fonts: [] },
  novadust: { name: "novadust", modes: ["dark"], variations: [], fonts: [] },
  novel: { name: "novel", modes: ["dark", "light"], variations: [], fonts: [] },
  "nu-ayu": {
    name: "nu-ayu",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  nyan: { name: "nyan", modes: ["dark", "light"], variations: [], fonts: [] },
  "oat-latte": {
    name: "oat-latte",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "ob-everforest": {
    name: "ob-everforest",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "obsdn-dark-rmx": {
    name: "obsdn-dark-rmx",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "obsiddy-in-terminal": {
    name: "obsiddy-in-terminal",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  obsidian: {
    name: "obsidian",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  obsidian_ia: {
    name: "obsidian_ia",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ia-writer-mono", "ia-writer-quattro"]
  },
  obsidian_vibrant: {
    name: "obsidian_vibrant",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "obsidian-boom": {
    name: "obsidian-boom",
    modes: ["light"],
    variations: [],
    fonts: []
  },
  "obsidian-gruvbox": {
    name: "obsidian-gruvbox",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "obsidian-nord": {
    name: "obsidian-nord",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "obsidian-nord-enhanced": {
    name: "obsidian-nord-enhanced",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "obsidian-windows-98-edition": {
    name: "obsidian-windows-98-edition",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "obsidian-you": {
    name: "obsidian-you",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  obsidianite: {
    name: "obsidianite",
    modes: ["dark"],
    variations: [],
    fonts: ["rubik", "space-mono"]
  },
  obsidianotion: {
    name: "obsidianotion",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["fira-code", "ia-writer-quattro", "ibm-plex-sans"]
  },
  obuntu: {
    name: "obuntu",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  oistnb: {
    name: "oistnb",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  okudagram: {
    name: "okudagram",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "old-world": {
    name: "old-world",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "oldsidian-purple": {
    name: "oldsidian-purple",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  oledblack: { name: "oledblack", modes: ["dark"], variations: [], fonts: [] },
  "oliviers-theme": {
    name: "oliviers-theme",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ibm-plex-mono"]
  },
  omega: { name: "omega", modes: ["dark"], variations: [], fonts: [] },
  "one-dark-pro": {
    name: "one-dark-pro",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "one-oracle-developer": {
    name: "one-oracle-developer",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  onenice: {
    name: "onenice",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "ono-sendai": {
    name: "ono-sendai",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cairo", "fira-code"]
  },
  opal: { name: "opal", modes: ["dark", "light"], variations: [], fonts: [] },
  opendian: {
    name: "opendian",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  opus: { name: "opus", modes: ["dark", "light"], variations: [], fonts: [] },
  orange: {
    name: "orange",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "orange-book-cloth": {
    name: "orange-book-cloth",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  oreo: { name: "oreo", modes: ["dark", "light"], variations: [], fonts: [] },
  origami: {
    name: "origami",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "origami.abaddon": {
    name: "origami.abaddon",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "origami.dracula": {
    name: "origami.dracula",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "origami.eidolon": {
    name: "origami.eidolon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "origami.gruvbox": {
    name: "origami.gruvbox",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "origami.heckhound": {
    name: "origami.heckhound",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "origami.linking-your-thinking": {
    name: "origami.linking-your-thinking",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "origami.minimum": {
    name: "origami.minimum",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "origami.nano": {
    name: "origami.nano",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "origami.shadow": {
    name: "origami.shadow",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "origami.shark-time": {
    name: "origami.shark-time",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "origami.siren": {
    name: "origami.siren",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "origami.soft": {
    name: "origami.soft",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "origami.solarized": {
    name: "origami.solarized",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "origami.sorcery": {
    name: "origami.sorcery",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "origami.umbra": {
    name: "origami.umbra",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  origin: {
    name: "origin",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "osaka-jade": {
    name: "osaka-jade",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  oscura: {
    name: "oscura",
    modes: ["dark"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  ouroboros: {
    name: "ouroboros",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  overcast: { name: "overcast", modes: ["dark"], variations: [], fonts: [] },
  "owen-graphite": {
    name: "owen-graphite",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  oxygen: {
    name: "oxygen",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  palatinate: {
    name: "palatinate",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  pale: { name: "pale", modes: ["dark", "light"], variations: [], fonts: [] },
  palenight: {
    name: "palenight",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "panda-syntax": {
    name: "panda-syntax",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "panic-mode": {
    name: "panic-mode",
    modes: ["dark"],
    variations: [],
    fonts: ["ia-writer-quattro-s", "monaco"]
  },
  panorama: {
    name: "panorama",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "paper-source": {
    name: "paper-source",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  paperglow: {
    name: "paperglow",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "papyrus-nox": {
    name: "papyrus-nox",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  parfait: { name: "parfait", modes: ["light"], variations: [], fonts: [] },
  "pastel-dusk": {
    name: "pastel-dusk",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "pastel-yumekawa": {
    name: "pastel-yumekawa",
    modes: ["light"],
    variations: [],
    fonts: []
  },
  pensea: {
    name: "pensea",
    modes: ["light", "dark"],
    variations: [],
    fonts: []
  },
  penumbra: {
    name: "penumbra",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  perch: { name: "perch", modes: ["dark", "light"], variations: [], fonts: [] },
  perso: { name: "perso", modes: ["light"], variations: [], fonts: [] },
  "phantom-flow": {
    name: "phantom-flow",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  phoenix: {
    name: "phoenix",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono", "sf-pro-display"]
  },
  phosphor: {
    name: "phosphor",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "phosphor-crt": {
    name: "phosphor-crt",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "phosphor-mono": {
    name: "phosphor-mono",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "pine-forest-berry": {
    name: "pine-forest-berry",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["inconsolata"]
  },
  "pink-muted-rose": {
    name: "pink-muted-rose",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "pink-topaz": {
    name: "pink-topaz",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["lucida-handwriting", "monaco"]
  },
  pisum: { name: "pisum", modes: ["dark"], variations: [], fonts: ["monaco"] },
  "pitch-black": {
    name: "pitch-black",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  planetary: {
    name: "planetary",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ibm-plex-sans"]
  },
  "planetz-roller": {
    name: "planetz-roller",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  playground: {
    name: "playground",
    modes: ["dark"],
    variations: [],
    fonts: ["bricolage-grotesque"]
  },
  pln: { name: "pln", modes: ["dark", "light"], variations: [], fonts: [] },
  poimandres: {
    name: "poimandres",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "poimandres-extended": {
    name: "poimandres-extended",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  polka: {
    name: "polka",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["rubik", "ibm-plex-mono"]
  },
  "pomme-notes": {
    name: "pomme-notes",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "powered-by-lancer": {
    name: "powered-by-lancer",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["arimo", "anonymous-pro"]
  },
  "powered-by-lancer-retouched": {
    name: "powered-by-lancer-retouched",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["arimo"]
  },
  praxis: {
    name: "praxis",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  primary: {
    name: "primary",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cascadia-code"]
  },
  "primary-simplified": {
    name: "primary-simplified",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  prime: { name: "prime", modes: ["dark", "light"], variations: [], fonts: [] },
  prism: {
    name: "prism",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono", "source-sans-3"]
  },
  "programming-mono": {
    name: "programming-mono",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "proper-dark": {
    name: "proper-dark",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  prose: { name: "prose", modes: ["dark", "light"], variations: [], fonts: [] },
  protocolblue: {
    name: "protocolblue",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "prussian-blue": {
    name: "prussian-blue",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  publisher: {
    name: "publisher",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["lato"]
  },
  pure: { name: "pure", modes: ["dark", "light"], variations: [], fonts: [] },
  "purple-aurora": {
    name: "purple-aurora",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "purple-owl": {
    name: "purple-owl",
    modes: ["dark"],
    variations: [],
    fonts: ["monaspace-argon"]
  },
  pxld: { name: "pxld", modes: ["dark", "light"], variations: [], fonts: [] },
  qlean: {
    name: "qlean",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ia-writer-mono", "noto-sans-jp"]
  },
  "quest-journal": {
    name: "quest-journal",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  quietus: {
    name: "quietus",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  quillcode: {
    name: "quillcode",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  radiance: {
    name: "radiance",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  "rain-washed-sky": {
    name: "rain-washed-sky",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  rationale: {
    name: "rationale",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  ravenloft: {
    name: "ravenloft",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["literata", "open-sans", "ruslan-display", "vollkorn"]
  },
  rbr: { name: "rbr", modes: ["dark"], variations: [], fonts: [] },
  "red-graphite": {
    name: "red-graphite",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  "red-shadow": {
    name: "red-shadow",
    modes: ["dark"],
    variations: [],
    fonts: ["fira-code", "montserrat"]
  },
  "red-solitude": {
    name: "red-solitude",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "redshift-oled-blue-light-filter": {
    name: "redshift-oled-blue-light-filter",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "refined-default": {
    name: "refined-default",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  reshi: {
    name: "reshi",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono", "noto-sans"]
  },
  "retro-larper": {
    name: "retro-larper",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "retro-terminal": {
    name: "retro-terminal",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "retro-windows": {
    name: "retro-windows",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  retroma: {
    name: "retroma",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "retroma.analogous-reversed": {
    name: "retroma.analogous-reversed",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "retroma.monochromatic": {
    name: "retroma.monochromatic",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "retroma.monochromatic-reversed": {
    name: "retroma.monochromatic-reversed",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "retroma.split-complementary": {
    name: "retroma.split-complementary",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "retroma.split-complementary-reversed": {
    name: "retroma.split-complementary-reversed",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "retroma.triadic": {
    name: "retroma.triadic",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "retroma.triadic-reversed": {
    name: "retroma.triadic-reversed",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  retronotes: {
    name: "retronotes",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ibm-plex-mono"]
  },
  "retronotes.blueprint": {
    name: "retronotes.blueprint",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ibm-plex-mono"]
  },
  "retronotes.carbon-ink": {
    name: "retronotes.carbon-ink",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ibm-plex-mono"]
  },
  "retronotes.forest-green": {
    name: "retronotes.forest-green",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ibm-plex-mono"]
  },
  "retronotes.misty-mirage": {
    name: "retronotes.misty-mirage",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ibm-plex-mono"]
  },
  "retronotes.pinot-noir": {
    name: "retronotes.pinot-noir",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ibm-plex-mono"]
  },
  "retroos-98": {
    name: "retroos-98",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["libre-franklin"]
  },
  reverie: {
    name: "reverie",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  rezin: { name: "rezin", modes: ["dark"], variations: [], fonts: [] },
  ribbons: {
    name: "ribbons",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["icons/its"]
  },
  rift: { name: "rift", modes: ["dark"], variations: [], fonts: [] },
  rmaki: {
    name: "rmaki",
    modes: ["dark"],
    variations: [],
    fonts: ["fira-code"]
  },
  robsi: {
    name: "robsi",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  "rose-pine": {
    name: "rose-pine",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "rose-pine-2": {
    name: "rose-pine-2",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "rose-pine-minimal": {
    name: "rose-pine-minimal",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "rose-pine-moon": {
    name: "rose-pine-moon",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "rose-red": {
    name: "rose-red",
    modes: ["dark"],
    variations: [],
    fonts: ["hack"]
  },
  "royal-velvet": {
    name: "royal-velvet",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["fira-sans", "fira-code"]
  },
  ruby: { name: "ruby", modes: ["dark", "light"], variations: [], fonts: [] },
  "sacred-geometry-systems": {
    name: "sacred-geometry-systems",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "sad-machine-druid": {
    name: "sad-machine-druid",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["hack"]
  },
  safi: { name: "safi", modes: ["dark", "light"], variations: [], fonts: [] },
  "saint-red-paper": {
    name: "saint-red-paper",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  sakurajima: {
    name: "sakurajima",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  salem: { name: "salem", modes: ["dark", "light"], variations: [], fonts: [] },
  sanctum: {
    name: "sanctum",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn": {
    name: "sanctum-reborn",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.blue": {
    name: "sanctum-reborn.blue",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.cyan": {
    name: "sanctum-reborn.cyan",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.green": {
    name: "sanctum-reborn.green",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.lavender": {
    name: "sanctum-reborn.lavender",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.orange": {
    name: "sanctum-reborn.orange",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.pink": {
    name: "sanctum-reborn.pink",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.pistachio": {
    name: "sanctum-reborn.pistachio",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.red": {
    name: "sanctum-reborn.red",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.viridian": {
    name: "sanctum-reborn.viridian",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum-reborn.yellow": {
    name: "sanctum-reborn.yellow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.blue": {
    name: "sanctum.blue",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.cyan": {
    name: "sanctum.cyan",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.green": {
    name: "sanctum.green",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.lavender": {
    name: "sanctum.lavender",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.orange": {
    name: "sanctum.orange",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.pink": {
    name: "sanctum.pink",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.pistachio": {
    name: "sanctum.pistachio",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.red": {
    name: "sanctum.red",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.viridian": {
    name: "sanctum.viridian",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  "sanctum.yellow": {
    name: "sanctum.yellow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono"]
  },
  sandover: {
    name: "sandover",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["special-elite"]
  },
  sandstorm: {
    name: "sandstorm",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["flow-circular"]
  },
  sanguine: {
    name: "sanguine",
    modes: ["dark"],
    variations: [],
    fonts: ["slasher-film"]
  },
  "sazure-glass": {
    name: "sazure-glass",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  scanline: {
    name: "scanline",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  scriptorium: {
    name: "scriptorium",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["slasher-film"]
  },
  "sea-glass": {
    name: "sea-glass",
    modes: ["dark"],
    variations: [],
    fonts: ["euclid-circular-a", "hack"]
  },
  "seamless-view": {
    name: "seamless-view",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  sei: { name: "sei", modes: ["dark", "light"], variations: [], fonts: [] },
  sequoia: {
    name: "sequoia",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  serendipity: {
    name: "serendipity",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  serenity: {
    name: "serenity",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ia-writer-duo", "ia-writer-mono", "ia-writer-quattro-s"]
  },
  serif: { name: "serif", modes: ["dark", "light"], variations: [], fonts: [] },
  serika: {
    name: "serika",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "shade-sanctuary": {
    name: "shade-sanctuary",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["computer-modern-bright", "jetbrains-mono"]
  },
  shadeflow: {
    name: "shadeflow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["geist", "geist-mono"]
  },
  "shiba-inu": {
    name: "shiba-inu",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "shimmering-focus": {
    name: "shimmering-focus",
    modes: ["dark", "light"],
    variations: [],
    fonts: [
      "ia-writer-quattro-s",
      "eb-garamond",
      "optima",
      "recursive",
      "icons/material-icons"
    ]
  },
  silence: { name: "silence", modes: ["dark"], variations: [], fonts: [] },
  silver: {
    name: "silver",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  simple: {
    name: "simple",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ia-writer-quattro", "fira-code", "ibm-plex-sans"]
  },
  "simple-color": {
    name: "simple-color",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  simplicity: {
    name: "simplicity",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "simply-colorful": {
    name: "simply-colorful",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto"]
  },
  slatewave: { name: "slatewave", modes: ["dark"], variations: [], fonts: [] },
  slytherin: { name: "slytherin", modes: ["dark"], variations: [], fonts: [] },
  sodalite: { name: "sodalite", modes: ["dark"], variations: [], fonts: [] },
  "soft-paper": {
    name: "soft-paper",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  solace: {
    name: "solace",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  solarized: {
    name: "solarized",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "soli-deo-gloria": {
    name: "soli-deo-gloria",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cormorant", "germania-one"]
  },
  solitude: {
    name: "solitude",
    modes: ["dark"],
    variations: [],
    fonts: ["fira-code"]
  },
  soloing: {
    name: "soloing",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  soothe: {
    name: "soothe",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  sora: { name: "sora", modes: ["dark"], variations: [], fonts: [] },
  space: {
    name: "space",
    modes: ["dark"],
    variations: [],
    fonts: ["bai-jamjuree", "orbitron", "unbounded"]
  },
  "sparkling-day": {
    name: "sparkling-day",
    modes: ["light"],
    variations: [],
    fonts: []
  },
  "sparkling-night": {
    name: "sparkling-night",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "sparkling-wisdom": {
    name: "sparkling-wisdom",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["flow-circular", "open-sans"]
  },
  spectrum: {
    name: "spectrum",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  "spectrum-blue": {
    name: "spectrum-blue",
    modes: ["dark"],
    variations: [],
    fonts: ["jetbrains-mono", "roboto"]
  },
  spectrumplus: {
    name: "spectrumplus",
    modes: ["dark"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  spring: {
    name: "spring",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["apercu-pro"]
  },
  "spy-terminal": {
    name: "spy-terminal",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["sf-mono", "roboto-mono"]
  },
  sqdthone: {
    name: "sqdthone",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cascadia-code", "source-sans-pro"]
  },
  srcery: { name: "srcery", modes: ["dark"], variations: [], fonts: [] },
  "standard-plus": {
    name: "standard-plus",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "starlit-abyss": {
    name: "starlit-abyss",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  steam: { name: "steam", modes: ["dark"], variations: [], fonts: [] },
  stratus: {
    name: "stratus",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  strict: { name: "strict", modes: ["dark"], variations: [], fonts: [] },
  subtlegold: {
    name: "subtlegold",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["flow-circular", "sf-mono"]
  },
  suddha: {
    name: "suddha",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["monaco", "roboto"]
  },
  sugar: { name: "sugar", modes: ["dark", "light"], variations: [], fonts: [] },
  sunbather: {
    name: "sunbather",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["roboto"]
  },
  sunflex: {
    name: "sunflex",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  superflat: {
    name: "superflat",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  synthwave: { name: "synthwave", modes: ["dark"], variations: [], fonts: [] },
  "synthwave-84": {
    name: "synthwave-84",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "synthwave-pro": {
    name: "synthwave-pro",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  tech001: {
    name: "tech001",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  termina: {
    name: "termina",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  terminal: {
    name: "terminal",
    modes: ["dark"],
    variations: [],
    fonts: ["fira-code"]
  },
  "terminal-workbench": {
    name: "terminal-workbench",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  terminal2k: {
    name: "terminal2k",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  terraflow: {
    name: "terraflow",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "theme-that-shall-not-be-named": {
    name: "theme-that-shall-not-be-named",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  things: {
    name: "things",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono", "roboto"]
  },
  "things-3": {
    name: "things-3",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["formular"]
  },
  tiniri: {
    name: "tiniri",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "tokyo-night": {
    name: "tokyo-night",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono"]
  },
  "tokyo-night-simple": {
    name: "tokyo-night-simple",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "tokyo-night-storm": {
    name: "tokyo-night-storm",
    modes: ["dark"],
    variations: [],
    fonts: ["anonymous-pro", "jetbrains-mono"]
  },
  "tokyo-terminal-obsd": {
    name: "tokyo-terminal-obsd",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  tomorrow: { name: "tomorrow", modes: ["dark"], variations: [], fonts: [] },
  "tomorrow-night-blue": {
    name: "tomorrow-night-blue",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "tomorrow-night-bright": {
    name: "tomorrow-night-bright",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "toms-theme": {
    name: "toms-theme",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "trace-labs": {
    name: "trace-labs",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "traffic-lights": {
    name: "traffic-lights",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  trailmark: {
    name: "trailmark",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  transient: { name: "transient", modes: ["dark"], variations: [], fonts: [] },
  transparent: {
    name: "transparent",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "true-black": {
    name: "true-black",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "ttrpg-rathgar-gold": {
    name: "ttrpg-rathgar-gold",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  typewriter: {
    name: "typewriter",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["ia-writer-mono", "ia-writer-quattro-s", "jetbrains-mono"]
  },
  typomagical: {
    name: "typomagical",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["alegreya", "amiri", "bitter", "playfair-display", "spectral"]
  },
  "typora-vue": {
    name: "typora-vue",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "tyrone-neon": {
    name: "tyrone-neon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  ukiyo: {
    name: "ukiyo",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cmu-typewriter-text", "jetbrains-mono"]
  },
  "ukiyo.alchemy": {
    name: "ukiyo.alchemy",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cmu-typewriter-text", "jetbrains-mono"]
  },
  "ukiyo.golden-book": {
    name: "ukiyo.golden-book",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cmu-typewriter-text", "jetbrains-mono"]
  },
  "ukiyo.golden-coffee": {
    name: "ukiyo.golden-coffee",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cmu-typewriter-text", "jetbrains-mono"]
  },
  "ukiyo.rose-shadow": {
    name: "ukiyo.rose-shadow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cmu-typewriter-text", "jetbrains-mono"]
  },
  "ukiyo.ukiyo": {
    name: "ukiyo.ukiyo",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["cmu-typewriter-text", "jetbrains-mono"]
  },
  "ultra-lobster": {
    name: "ultra-lobster",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.abaddon": {
    name: "ultra-lobster.abaddon",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.abaddon-glass": {
    name: "ultra-lobster.abaddon-glass",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.architect": {
    name: "ultra-lobster.architect",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.blahaj": {
    name: "ultra-lobster.blahaj",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.blueprint": {
    name: "ultra-lobster.blueprint",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.bunny": {
    name: "ultra-lobster.bunny",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.chameleon": {
    name: "ultra-lobster.chameleon",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.control": {
    name: "ultra-lobster.control",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.creation": {
    name: "ultra-lobster.creation",
    modes: ["light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.cyan": {
    name: "ultra-lobster.cyan",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.demon-queen": {
    name: "ultra-lobster.demon-queen",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.dracula": {
    name: "ultra-lobster.dracula",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.eidolon": {
    name: "ultra-lobster.eidolon",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.green": {
    name: "ultra-lobster.green",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.gruvbox": {
    name: "ultra-lobster.gruvbox",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.linking-your-thinking": {
    name: "ultra-lobster.linking-your-thinking",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.lobster-time": {
    name: "ultra-lobster.lobster-time",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.orange": {
    name: "ultra-lobster.orange",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.pink": {
    name: "ultra-lobster.pink",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.purple": {
    name: "ultra-lobster.purple",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.red": {
    name: "ultra-lobster.red",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.shadow": {
    name: "ultra-lobster.shadow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.soft": {
    name: "ultra-lobster.soft",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.solarized": {
    name: "ultra-lobster.solarized",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.sorcery": {
    name: "ultra-lobster.sorcery",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.succubus": {
    name: "ultra-lobster.succubus",
    modes: ["dark"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.timberwolf": {
    name: "ultra-lobster.timberwolf",
    modes: ["light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.umbra": {
    name: "ultra-lobster.umbra",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.white": {
    name: "ultra-lobster.white",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  "ultra-lobster.yellow": {
    name: "ultra-lobster.yellow",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["nightingale", "monaspace-neon"]
  },
  umbra: { name: "umbra", modes: ["dark"], variations: [], fonts: [] },
  underwater: {
    name: "underwater",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["lexend"]
  },
  universitario: {
    name: "universitario",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "unsent-letters": {
    name: "unsent-letters",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  ursa: { name: "ursa", modes: ["dark", "light"], variations: [], fonts: [] },
  "utility-materials": {
    name: "utility-materials",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-amoled": {
    name: "vanilla-amoled",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "vanilla-amoled-color": {
    name: "vanilla-amoled-color",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes": {
    name: "vanilla-palettes",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.atom-one": {
    name: "vanilla-palettes.atom-one",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.catppuccin-frappe": {
    name: "vanilla-palettes.catppuccin-frappe",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.catppuccin-macchiato": {
    name: "vanilla-palettes.catppuccin-macchiato",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.catppuccin-mocha": {
    name: "vanilla-palettes.catppuccin-mocha",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.dracula": {
    name: "vanilla-palettes.dracula",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.dracula-soft": {
    name: "vanilla-palettes.dracula-soft",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.gruvbox-hard": {
    name: "vanilla-palettes.gruvbox-hard",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.gruvbox-medium": {
    name: "vanilla-palettes.gruvbox-medium",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.gruvbox-soft": {
    name: "vanilla-palettes.gruvbox-soft",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.horizon": {
    name: "vanilla-palettes.horizon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.kanagawa-dragon": {
    name: "vanilla-palettes.kanagawa-dragon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.kanagawa-wave": {
    name: "vanilla-palettes.kanagawa-wave",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.rose-pine": {
    name: "vanilla-palettes.rose-pine",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.rose-pine-moon": {
    name: "vanilla-palettes.rose-pine-moon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.tokyo-night": {
    name: "vanilla-palettes.tokyo-night",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.tokyo-night-moon": {
    name: "vanilla-palettes.tokyo-night-moon",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vanilla-palettes.tokyo-night-storm": {
    name: "vanilla-palettes.tokyo-night-storm",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vaporwave-void": {
    name: "vaporwave-void",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  vauxhall: {
    name: "vauxhall",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vauxhall.blue": {
    name: "vauxhall.blue",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vauxhall.magenta": {
    name: "vauxhall.magenta",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vauxhall.purple": {
    name: "vauxhall.purple",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vauxhall.red": {
    name: "vauxhall.red",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vauxhall.teal": {
    name: "vauxhall.teal",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vauxhall.white": {
    name: "vauxhall.white",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  vellum: {
    name: "vellum",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  velocity: {
    name: "velocity",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "velocity.british-racing-green": {
    name: "velocity.british-racing-green",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "velocity.jet-black-matte": {
    name: "velocity.jet-black-matte",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "velocity.midnight-purple": {
    name: "velocity.midnight-purple",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "velocity.nordblau-metalic": {
    name: "velocity.nordblau-metalic",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "velocity.obsidian-gray": {
    name: "velocity.obsidian-gray",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "velocity.touring-bronze": {
    name: "velocity.touring-bronze",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "velvet-moon": {
    name: "velvet-moon",
    modes: ["dark"],
    variations: [],
    fonts: ["finlandica"]
  },
  venom: { name: "venom", modes: ["dark"], variations: [], fonts: [] },
  "vercel-geist": {
    name: "vercel-geist",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["geist", "geist-mono"]
  },
  vermilion: {
    name: "vermilion",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vesnea-vibe": {
    name: "vesnea-vibe",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["josefin-sans", "work-sans"]
  },
  vesper: {
    name: "vesper",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vesper-golden": {
    name: "vesper-golden",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vesper-sandstorm": {
    name: "vesper-sandstorm",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  vibrant: { name: "vibrant", modes: ["dark"], variations: [], fonts: [] },
  vicious: {
    name: "vicious",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  vileplume: {
    name: "vileplume",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vintage-theme": {
    name: "vintage-theme",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "violet-evening": {
    name: "violet-evening",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  virgo: { name: "virgo", modes: ["dark", "light"], variations: [], fonts: [] },
  viridian: {
    name: "viridian",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  vision: {
    name: "vision",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  vitela: {
    name: "vitela",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  void: { name: "void", modes: ["dark"], variations: [], fonts: [] },
  vortex: {
    name: "vortex",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["rubik"]
  },
  "vscode-2026": {
    name: "vscode-2026",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "vscode-dark-modern": {
    name: "vscode-dark-modern",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "vscode-light-modern": {
    name: "vscode-light-modern",
    modes: ["light"],
    variations: [],
    fonts: []
  },
  w95: { name: "w95", modes: ["light"], variations: [], fonts: [] },
  "wake-up-samurai": {
    name: "wake-up-samurai",
    modes: ["dark"],
    variations: [],
    fonts: []
  },
  "warm-burnout": {
    name: "warm-burnout",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "warm-springs": {
    name: "warm-springs",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  warmth: { name: "warmth", modes: ["dark"], variations: [], fonts: [] },
  wasp: { name: "wasp", modes: ["dark", "light"], variations: [], fonts: [] },
  weiya: { name: "weiya", modes: ["dark", "light"], variations: [], fonts: [] },
  "wide-view": {
    name: "wide-view",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  wikipedia: {
    name: "wikipedia",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["archivo", "linux-libertine"]
  },
  wilcoxone: {
    name: "wilcoxone",
    modes: ["dark"],
    variations: [],
    fonts: ["lato", "fira-code"]
  },
  willemstad: {
    name: "willemstad",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["crimson-pro", "dm-mono", "dm-sans", "manrope", "icons/remixicon"]
  },
  "winter-spices": {
    name: "winter-spices",
    modes: ["light"],
    variations: [],
    fonts: ["myriad-apple"]
  },
  wiselight: {
    name: "wiselight",
    modes: ["light"],
    variations: [],
    fonts: ["karla", "open-sans"]
  },
  wolai: { name: "wolai", modes: ["dark", "light"], variations: [], fonts: [] },
  wombat: { name: "wombat", modes: ["dark"], variations: [], fonts: [] },
  word_2019: {
    name: "word_2019",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  "wy-console": {
    name: "wy-console",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["audiowide", "dotgothic16"]
  },
  wyrd: {
    name: "wyrd",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["architects-daughter", "neucha", "space-mono"]
  },
  xscriptor: {
    name: "xscriptor",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["eb-garamond"]
  },
  "yin-and-yang": {
    name: "yin-and-yang",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  yue: {
    name: "yue",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono", "roboto"]
  },
  zario: {
    name: "zario",
    modes: ["dark", "light"],
    variations: [],
    fonts: ["jetbrains-mono", "roboto"]
  },
  zen: { name: "zen", modes: ["dark", "light"], variations: [], fonts: [] },
  "zen-forest": {
    name: "zen-forest",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  zenburn: {
    name: "zenburn",
    modes: ["dark"],
    variations: [],
    fonts: ["inconsolata"]
  },
  zenith: {
    name: "zenith",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  },
  zocean: {
    name: "zocean",
    modes: ["dark", "light"],
    variations: [],
    fonts: []
  }
};

// src/registry.ts
var __dirname$1 = dirname(fileURLToPath(import.meta.url));
var themesDir = resolve(__dirname$1, "themes");
var themeCache = /* @__PURE__ */ new Map();
function resolveThemeId(theme, variation) {
  if (variation) {
    const variantId = `${theme}.${variation}`;
    if (variantId in themeMetas) return variantId;
  }
  if (theme in themeMetas) return theme;
  throw new Error(
    `[QuartzTheme] Unknown theme: "${theme}"${variation ? ` (variation: "${variation}")` : ""}. Available themes: ${Object.keys(themeMetas).join(", ")}`
  );
}
function loadTheme(themeId) {
  const cached = themeCache.get(themeId);
  if (cached) return cached;
  if (!(themeId in themeMetas)) {
    throw new Error(`[QuartzTheme] No theme data for "${themeId}".`);
  }
  const fileName = themeId.replace(/[^a-zA-Z0-9-_]/g, "-") + ".json";
  const filePath = resolve(themesDir, fileName);
  try {
    const raw = readFileSync(filePath, "utf8");
    const theme = JSON.parse(raw);
    themeCache.set(themeId, theme);
    return theme;
  } catch (err) {
    throw new Error(
      `[QuartzTheme] Failed to load theme "${themeId}" from ${filePath}: ${err}`
    );
  }
}
function getThemeMeta(themeId) {
  return themeMetas[themeId];
}
function getAvailableThemes() {
  return Object.keys(themeMetas);
}
function registerTheme(id, meta, loader) {
  loader().then((mod) => {
    themeCache.set(id, mod.theme);
  });
  themeMetas[id] = meta;
}

// src/icons/generated.ts
var CALLOUT_ICON_URIS = {
  note: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'/%3E%3Cpath d='m15 5 4 4'/%3E%3C/svg%3E")`,
  abstract: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3Cpath d='M12 11h4'/%3E%3Cpath d='M12 16h4'/%3E%3Cpath d='M8 11h.01'/%3E%3Cpath d='M8 16h.01'/%3E%3C/svg%3E")`,
  info: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 16v-4'/%3E%3Cpath d='M12 8h.01'/%3E%3C/svg%3E")`,
  todo: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E")`,
  tip: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4'/%3E%3C/svg%3E")`,
  success: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")`,
  question: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'/%3E%3Cpath d='M12 17h.01'/%3E%3C/svg%3E")`,
  warning: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3'/%3E%3Cpath d='M12 9v4'/%3E%3Cpath d='M12 17h.01'/%3E%3C/svg%3E")`,
  failure: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6 6 18'/%3E%3Cpath d='m6 6 12 12'/%3E%3C/svg%3E")`,
  danger: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z'/%3E%3C/svg%3E")`,
  bug: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 20v-9'/%3E%3Cpath d='M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z'/%3E%3Cpath d='M14.12 3.88 16 2'/%3E%3Cpath d='M21 21a4 4 0 0 0-3.81-4'/%3E%3Cpath d='M21 5a4 4 0 0 1-3.55 3.97'/%3E%3Cpath d='M22 13h-4'/%3E%3Cpath d='M3 21a4 4 0 0 1 3.81-4'/%3E%3Cpath d='M3 5a4 4 0 0 0 3.55 3.97'/%3E%3Cpath d='M6 13H2'/%3E%3Cpath d='m8 2 1.88 1.88'/%3E%3Cpath d='M9 7.13V6a3 3 0 1 1 6 0v1.13'/%3E%3C/svg%3E")`,
  example: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 5h.01'/%3E%3Cpath d='M3 12h.01'/%3E%3Cpath d='M3 19h.01'/%3E%3Cpath d='M8 5h13'/%3E%3Cpath d='M8 12h13'/%3E%3Cpath d='M8 19h13'/%3E%3C/svg%3E")`,
  quote: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'/%3E%3Cpath d='M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'/%3E%3C/svg%3E")`
};
var CALLOUT_ALIASES = {
  summary: "abstract",
  tldr: "abstract",
  hint: "tip",
  important: "tip",
  check: "success",
  done: "success",
  help: "question",
  faq: "question",
  caution: "warning",
  attention: "warning",
  fail: "failure",
  missing: "failure",
  error: "danger",
  cite: "quote"
};
var CHECKBOX_ICON_URIS = {
  "!": `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' x2='12' y1='8' y2='12'/%3E%3Cline x1='12' x2='12.01' y1='16' y2='16'/%3E%3C/svg%3E")`,
  "*": `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'/%3E%3C/svg%3E")`,
  "-": `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E")`,
  "/": `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 6v6l4 2'/%3E%3C/svg%3E")`,
  ">": `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3Cpath d='m12 5 7 7-7 7'/%3E%3C/svg%3E")`,
  "?": `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'/%3E%3Cpath d='M12 17h.01'/%3E%3C/svg%3E")`,
  I: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 16v-4'/%3E%3Cpath d='M12 8h.01'/%3E%3C/svg%3E")`,
  S: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' x2='12' y1='2' y2='22'/%3E%3Cpath d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/%3E%3C/svg%3E")`,
  b: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z'/%3E%3C/svg%3E")`,
  c: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='6' cy='6' r='3'/%3E%3Cpath d='M8.12 8.12 12 12'/%3E%3Cpath d='M20 4 8.12 15.88'/%3E%3Ccircle cx='6' cy='18' r='3'/%3E%3Cpath d='M14.8 14.8 20 20'/%3E%3C/svg%3E")`,
  d: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 14v2.2l1.6 1'/%3E%3Cpath d='M16 2v4'/%3E%3Cpath d='M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5'/%3E%3Cpath d='M3 10h5'/%3E%3Cpath d='M8 2v4'/%3E%3Ccircle cx='16' cy='16' r='6'/%3E%3C/svg%3E")`,
  f: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4'/%3E%3C/svg%3E")`,
  i: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5'/%3E%3Cpath d='M9 18h6'/%3E%3Cpath d='M10 22h4'/%3E%3C/svg%3E")`,
  k: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4'/%3E%3Cpath d='m21 2-9.6 9.6'/%3E%3Ccircle cx='7.5' cy='15.5' r='5.5'/%3E%3C/svg%3E")`,
  l: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E")`,
  p: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5'/%3E%3C/svg%3E")`,
  u: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z'/%3E%3Cpath d='M7 10v12'/%3E%3C/svg%3E")`,
  w: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978'/%3E%3Cpath d='M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978'/%3E%3Cpath d='M18 9h1.5a1 1 0 0 0 0-5H18'/%3E%3Cpath d='M4 22h16'/%3E%3Cpath d='M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z'/%3E%3Cpath d='M6 9H4.5a1 1 0 0 1 0-5H6'/%3E%3C/svg%3E")`
};

// src/icons/callout-icons.ts
function generateCalloutIconCSS() {
  const iconVars = Object.entries(CALLOUT_ICON_URIS).map(([type, uri]) => `  --callout-icon-${type}: ${uri};`).join("\n");
  const typeSelectors = Object.entries(CALLOUT_ICON_URIS).map(
    ([type]) => `  &[data-callout="${type}"] { --callout-icon: var(--callout-icon-${type}); }`
  ).join("\n");
  const aliasSelectors = Object.entries(CALLOUT_ALIASES).map(
    ([alias, canonical]) => `  &[data-callout="${alias}"] { --callout-icon: var(--callout-icon-${canonical}); }`
  ).join("\n");
  return `.callout {
${iconVars}

  &[data-callout] { --callout-icon: var(--callout-icon-note); }
${typeSelectors}
${aliasSelectors}
}`;
}
function resolveCalloutIcon(calloutType) {
  const canonical = CALLOUT_ALIASES[calloutType] ?? calloutType;
  return CALLOUT_ICON_URIS[canonical];
}

// src/icons/checkbox-icons.ts
function generateCheckboxIconCSS() {
  const resetChecked = `body .page article li:has(> input[type="checkbox"]:checked):not([data-task="x"]):not([data-task="X"]) {
  text-decoration: none;
  color: inherit;
}

body .page article li.task-list-item.is-checked:not([data-task="x"]):not([data-task="X"]) {
  text-decoration: none;
  color: inherit;
}`;
  const checkedTaskStyle = `body .page article li.task-list-item[data-task="x"],
body .page article li.task-list-item[data-task="X"] {
  text-decoration: line-through;
  text-decoration-color: var(--checkbox-color, var(--secondary));
  color: var(--checkbox-color, var(--secondary));
}`;
  return [resetChecked, checkedTaskStyle].join("\n\n");
}
function resolveCheckboxIcon(taskChar) {
  return CHECKBOX_ICON_URIS[taskChar];
}

// src/fonts/generated-fonts.ts
var FONT_CSS = {
  "icons/its": `@font-face {
  font-family: "its";
  src:
    url("data:application/octet-stream;base64,d09GRgABAAAAAC9QAA8AAAAASkgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABWAAAADsAAABUIIslek9TLzIAAAGUAAAARAAAAGA+LE5zY21hcAAAAdgAAAHiAAAFLlFa0LpjdnQgAAADvAAAAAsAAAAOAAAAAGZwZ20AAAPIAAAG7QAADgxiLvl6Z2FzcAAACrgAAAAIAAAACAAAABBnbHlmAAAKwAAAHwkAACySMa7oLmhlYWQAACnMAAAAMwAAADYi+C0yaGhlYQAAKgAAAAAgAAAAJAgxBHlobXR4AAAqIAAAAEkAAAD88V3/5mxvY2EAACpsAAAAgAAAAIBQh1xFbWF4cAAAKuwAAAAgAAAAIAHyEBJuYW1lAAArDAAAAXIAAAKRd9LnyXBvc3QAACyAAAACUQAAA4Ylh57ucHJlcAAALtQAAAB6AAAAnH62O7Z4nGNgZGBg4GIwYLBjYHJx8wlh4MtJLMljkGJgYYAAkDwymzEnMz2RgQPGA8qxgGkOIGaDiAIAJjsFSAB4nGNgYb7KOIGBlYGBqYppDwMDQw+EZnzAYMjIBBRlYGVmwAoC0lxTGA68YHhjzBz0P4shinkNw3ygMCOKIiYAnEMNIXic5dRbUlNBFIXh/yQhXAQMBEgCiuEOKhqI4p0HyiE4BsfgkPep2gPwDVdn9TMT8Jz6cumupDvVawVYArryVnrQuaPRK5qZRpvFeJe1xXiv0TyHDDSyGWuxEYMYxkEcxjSu227bz9Wc5FXOHx8hiPXF/KjO0y5lk4Oc5qzMP3E1WuOWD4v7e70f+MkvfvNnMd/RDnraeZ9lVljV/p6xzgabPNfutthmyA677DFizIR9DnjBS33vK6YcccwJp5xxzgWXXPGaN/qd17zjPTNutPpca3/kjk985gtf+aY9/OBei/ef3Pv/ca2Xh87f+u6+nLaVxESlUyKqkrCoSsqiKumLSqdJVDpXotIJE5XOmqhKKqPS+StvVnYXG0Z5HpjSQQxNOSFGRpkfm7JDTEwpIvaN8rkDU7KIQ1PGiKkpbcS1KXe0mBJI25iySNsxpZK2a8qn+mFKKm3flFmyMaWX7JhyTHZNiSZ7pmyTS6aUk31T3sllU/LJFVMHyFVTG8iBqRfklqkh5LapK+TQ1Bpyx9QfctfKP0numTpFjkztIsemnpETU+PIqal75JGpheSxqY/kiamZ5Kmpo+SZqa3kuam35IWpweSlqcvklanV5MzUb/LG1HTy1tR5cm7c/wNQSrAGAAB4nGNgQAYAAA4AAQB4nK1Xa1sbxxWe1Q2MAQNC2M267ihjUZcdySRxHGIrDtllURwlqcC43XVuu0i4TZNekt7oNb1flD9zVrRPnW/5aXnPzEoBB9ynz1M+6Lwz886c65xZSGhJ4n4UxlJ2H4n5nS5V7j2I6IZL1+LkoRzej6jQSD+bFtOi31f7br1OIiYRqK2RcESQ+E1yNMnkYZMKWtVVvUlFLQdHxeWa8AOqBjJJ/KywHPhZoxhQIdg7lDSrAIJ0QKXe4ahQKOAYqh9crvPsaL7m+JcloPJHVaeKNUWiFx3EoxWnYBSWNBU9qgUR66OVIMgJrhxI+rxHpdUHo2vOXBD2Q6qEUZ2KjXj3rQhkdxhJ6vUwtQk2bTDaiGOZWTYsuoapfCRpndfXmfl5L5KIxjCVNNOLEsxIXpthdJPRzcRN4jh2ES2aDfokdiMSXSbXMXa7dIXRlW76aEH0mfGoLPbjeJDG5HhxnHsQywH8UX7cpLKWsKDUSOHTVNCLaEr5NK18ZABbkiZVTLgRCTnIpvZ9yYvsrmvN518SSdin8lodi4EcyiF0ZevlBiK0EyU9N92NIxXXY0mb9yKsuRyX3JQmTWk6F3gjUbBpnsZQ+QrlovyUCvsPyenDEJpaa9I5LdnaebhVEvuST6DNJGZKsmWsndGjc/MiCP21+qRwzuuThTRrT3E8mBDA9USGQ5VyUk2whcsJIenCyLGVSK1Kt6yKuTO201XsEu6Xrh3fNK+NQ0dzs6IYQour6vEaiviCzgqFkAbpVpMWNKhS0oXgNT4AABmiBR7tYrRg8rWIgxZMUCRi0IdmWgwSOUwkLSJsTVrS3b0oKw224qs0d6AOm1TV3Z2oe89OunXMV838ss7EUnA/ypaWAnJSnxY9vnIoLT+7wD8L+CFnBbkoNnpRxuGDv/4QGYbahbW6wrYxdu06b8FN5pkYnnRgfwezJ5N1RgozIaoK8UJB3Rk5jmOyVdMiE4VwL6Il5cuQ5lF+c4hw4svkP5cuOWJRVIXv+xyBZaw5abY87dGnnvs0wrUCH2teky7qzGF5CfFm+TWdFVk+pbMSS1dnZZaXdVZh+XWdTbG8orNplt/Q2TmWnlbj+FMlQaSVbJHzDt+WJuljiyuTxY/sYvPY4upk8WO7KLWgC96ZfsKpf1tX2c/j/tXhn4RdT8M/lgr+sbwK/1g24B/LVfjH8pvwj+U1+MfyW/CP5Rr8Y9nSsm0K9rqG2kuJRNNzksCkFJewxTW7rum6R9dxH5/BVejIM7Kp0g3Fjf2JDJe9f3ac4my+EnLF0TNrWdmphRGaInv53LHwnMW5oeXzxvLncZrlhF/ViWt7qi08L1b+Jfhv647ayG44Nfb1JuIBB063H5cl3WjSC7p1sd2kjf9GRWH3QX8RKRIrDdmSHW4JCO3d4bCjOughER4+dF28SBuOU1tGhG+hd63QRdBKaKcNQ8tmhU/nA+9g2FJStoc48/ZJmmzZ86ii/DFbUsI9ZXMnOirJsnSPSqvlp2KfO+0MmrYyO9R2QpXg8euacLezr1IpSAaKynhUsVwKUhc44U73+J4UpqH/q23kWEHDNr9YM4HRgvNOUaJsT62giSAZZRRc+Sun4kQ2osFGFPGbd9IvdaEQ2uNYSMyWV/NYqDbC9NJkiWbM+rbqsFLO4p1JCNkZG2kSe1FLtvGgs/X5pGS78lRQpYHR3ePfLjaJp1V7ni3FJf/yMUuCcboS/sB53OVxijfRP1ocxW26GEQ9F2+qbMetbN1Zxr195cTqrts7seqfuvdJOwJNt7wnKdzSdNsbwjauMTh1JhUJbdE6doTGZa7PVRv5FB9ovnWdC1Th+rRw8+z52zqbwVsz3vI/lnTn/1XF7BP3sbZCqzpWL/U4t7ODBnzLG0flVYxue3WVxyX3ZhKCuwhBzV57fI3ghldbdBO3/LUz5rs4zlmu0gvAr2t6EeINjmKIcMttPLzjaL2puaDpDcBv65EQ2wA9AIfBjh45ZmYXwMzcY04HYI85DO4zh8F3mMPgu/oIvTAAioAcg2J95Ni5B0B27i3mOYzeZp5B7zDPoHeZZ9B7rDMESFgng5R1MthnnQz6zHkVYMAcBgfMYfCQOQy+Z+zaAvq+sYvR+8YuRj8wdjH6wNjF6ENjF6MfGrsY/cjYxejHiHF7ksCfmBFtAn5k4SuAH3PQzcjH6Kd4a3POzyxkzs8Nx8k5v8Dmlyan/tKMzI5DC3nHryxk+q9xTk74jYVM+K2FTPgduHcm5/3ejAz9EwuZ/gcLmf5H7MwJf7KQCX+2kAl/AfflyXl/NSND/5uFTP+7hUz/B3bmhH9ayIShhUz4VI/Omy9bqrijUqEY4p8mtMHY92j6gIpXe4fjx7r5BSXaAUEAAAAAAQAB//8AD3ictXp7mBxXld8999a7u6u7q6q7+v1+Tc+7n6MZaab18EgajTwaSdZIsjSyjJAsyXaEMLYxRmi9kjcY2xivLVgeGyAQm9e3EGdjCYSdYIhNPuM4WTCY/dgQIMSYXYd8MbCraEo5t7pnJLOw35c/Mt1zu+rWqapz7znnd37nVhEg5Moxdi/bTgRidywBgMAsIUDOEoA7gwEqRfohG8wG6aNLP2QBtv1yhDqEC5ArP2Gv0Z8RkSQ7MUIoOcuAAnXPQwGRiMGgwM8u89PhB/ucMyh/832XHXraPR/P+Xt6M2FEeooB1PpVRv/euexcBgEWQeBbKCLhfQ4K42wXaZIz5FlIwgV4hhCz1A7brbZkt1v8Y4ftsCzJ5dIw8G+7VS6VS5Is8V47ZMmlsmRjj4j/KKZDaRKmoNXO53BP8oNUwr0pKEvy8vXqUh6PyLmQHObXtusjze590tDqiTRz/F78ArKUz5V43xTwy6NacqnVbpT5oTbfk/gl2qU2v1T37OIQyCmww3isnCvzHlQNlQyFpd4ghoCPwf2V8K5h+5rGDqPOuIkCrZWLToFUrofbk3geHmjZfIbcT9q9Uhk1nKKtdqjX517JvQM2U9DtTOF4wvVwqNUO6yA3W10VWnw+cSw1G49OoQi/Rruu03KrLZe7uuOou6Ild0bwWu7YW2U+DjnfnbRJsFPQLn2KxqlkrJWBGb5wutx/e8yX9McEgcXyTGUsKjEzNBlKqwCaBFOhmC/kUdmfZoaqBTsn+yVF0jRKRUotyxs1dB/TQKAwn6E00b+mJXoVSWgO75wC8PoU3a8CLTdGN6uGrMpmNmrYIerUE+GckG0YuhGcWhfQ4noEYhEzzKxNLfCgN8RSATmqB0UllVE86I6e3MSGnbMT9QqDWT2r+f2yKdmZAREkhfo0S9AApFTECJ0MhuMqujEV7ZgZEmTFJ/nRvfBPivvbcUtEP6eFtOxnzOOh+vDg6nqWSbQ+IqwdSho++/K3PZmhtKn5snqsqIuKJHqyAlVlEAQQGIiqHcjZaS9u+/LemKlQ5mVMCvn6fYWUgMFnmj7BFw9SQY6oRlClzJctZdVoyMs8miwCqKJXoJmK31aKoEu+VCYRNoZ0j18ttqRIMpY1fbbWGacYxzi5ATMueg1POO5T2a+FWECnHxovJPT54ZDO/DgyWU2cnJguZAWRRnKChwnVgYxpg52rC0K1jCPNTI/VQsnoyzkjyMCD4/CIkkwBmFcx/R5BMRmOqb2bsmwsh8pROVnbDSCoktcngbhrou2nKpOpBzWnIjhfiBgJaTzvEeVbr6uWrAgoimxV05mWcj1VpHJxYFA0lOHM2L0VTQMrHBiIpXVfa3hO2i8IVNKUUCMQFvEkMYowp+AII2WAwGIA501WdCnKGDXNQNoreiSPoXqlmO0dtIMRf87Ktbw0GDYLireTSnq0JFOoNyuWo9O5Nrw9ZFE135eyVX/YJ2iyNx5mUroq+7xUYYLlj0eCaTsRpBLNp322ofhyUdlOxIMVb2YiAUyxpLA5UlEEQzVERE9D1akkCpJU9PhlMS5RL3qTJ+oHvyVSLZAaZNQ3GMZQobaIFlc9YSpQs4bq4plBnCevR/b6VdlbjcRoDvFTcPH9I4jvjMjEQ/xkXWdKQZSXJZCPILzizcQjKMaowI4gihO6QCglBziizxHi131ej6YqMmqFl2BBVbL7TQ7o2Wa2jf/8s41tch66gpj+587N4P7zPMFeWzJOzuHHhXrU4+PsNZbBi6hE+UtJoIRyzBdtFdoivAlvOl7Hy9b9K/7zBGxlGee7zndh4IVDvD30gptS+Fhew7F0R2ISm9zY2U0BByES4TSORkbYOUJA9/iYqoB6RAPFCyJR+BAZExYITt0Bgo43Z1mBgKJYtmWHQwEzYBpBPlTFo3iMYDAY8Evx/nYex5kPZbvDDWXlUL1Zx/8XXmCvvbD05CF4xPHS3biBfzWu/wvYg8rS3ZfO8T7Sm/9b2Otsp6uzSWKk1hmOGpSn2ZifkpmIGQzoPpxiPsOMQgA2r6RfVM2iUhhTqErLchnKYLdtlWJTrMv50CDAXRudl6EPRjb+6mN0w0bnixsvb4QR5/vOy9ix9OwvP7nF+RvIwT0o5XzflYKDG50vbfw8SkGfK/WlT77zuef+sJ6oxuw/VnGGq74Z1YSzOMarenaVAxtQW1dlMd+uN31A33mNWl/fCDtQz6uKr0U9IYearruqlvMvuNTnryre05P9jp7a034fZgdgtd8zS//k9PyTs0Jgxdc8yE9El5/g8EBW8TbQRn/d+oTzlNs4T6G7YoMgde0ubMVdzl9Q6cfpF1bij3vtjs427PUw4jlNQIH7vTIViURFCSNQAEYohqKHaKpHO0JURVEXiKoqB4iiKnNeL59tdNeA1+/1c19Fb/VJyX6zHspDPlTP1pt5dNYm4C8Pzh2XLtFNly4tnb90Ca7nXoq/2IIHf3Ze2rFj6fCOHTvd+OyOVyAKMTsBjHgBI2eG29cADHq0ar4JbVumf/LE0rufoN943xPvox9Z2exxwhPsM2weI1x6SuFzloZisCyWi2Vx6RTtW+NY6+Enm5wBz9n76H8vfnrtB8tnODZcuYSz8X/o00RD3JnqrJ4ERlfX436fCAyTH7BZnBFklmjms9xV7yc8I+5B3xQOEkyN8/v3TqyqVoYKIvJNk/Oqeq3d5XuS7FLDvORyoFa71hxtNRsuK8nnXIo3GuLEkdOjeg0ppUsRl4kT/+GXS1O+MwG1duvP1ZtmZhc2rz/xwFn6760hxVcMeDDfZxvBkE8PB2CIugJjxwfbOQh4au7hSLYeirX798b8auCGRDwUSQeC6xYSY4nWdF0rmXTrKOuE4jC+66FKX2pwbmstMZDLlJIhTH0+QRbEaALm9pnGDXi4kKuuhmR6iB+VfIlIQPQM2dn2fDxkGLbXM1QPpPREyhJw7uziIIErV64cd+0qklDHwLQ8sxK2RpCze9ssAss+97qznRXegKceh0eB7nQOk2WOrrgxMNIZ7MISo+x+iacqCgv8F+gBTj0o5goU87j+KCN4QjMfQm/kkNmEuXMXLpy7QB975pkH8dvLB71re0mU9HcqAvASAlP9iqERAHUfEMv0RfWoLBEveCUOMrUUWDrkhqCBfPLaHRA23jU9fddDd09P3z2dX53Pr57mDdve63vorun7en3YuFiCzRfpF/HOYtfrcYuexeyIk4OsRYpi0GfxC2YWI/785UfgfLd92bmJfnHpEP340iG44Hyz6/v/kv2cRdGHBzp9iojjQOgkODVne86L91ogjPHUysicYRgBQYr1i1mcfWbny3KW/fxyDN79Ev3498//3fj98Op+OgwbnX/35rYXuvh8N/sS20ACJEzyZIjMd66vABFMhIshy0Cz6GgLYbZcKjJhJuCnmEcEIpzlNzvL1bgfTUfZHtSAHnSneT5i9/elknY+ki+GJPSEIkbGEOR0sFKAAWS3BzHcQ5bYnd3uTHP0kzF0sDxg2XR7/4nFdntxbLz2UGfpq873Nj8PlXQjnW6s4c3SmzPwEfizYxu2rLlte2jDyJoxLnxifzv94NT7Xl/1Md9ULV2f7InDg+Mw6XxjR2l4Z6uHJf+cjbIGYkm0E8Z8OeOSEJFs7pqnW5nm23Y+hPD/whN/9VdPQNB5znkOgvS255//sPM/cXMNBF18uXLlB/Qk1qoW6eO+lkKipALOxywRqdi1D4dd1jU9cgLbCktSAq0ftrDUyvE6D5tSow2ITSBZiAY1XjRh02qUoZSDvaDq+oCvrF/8OjYDuo775abzW+zUy76LX8cGO53f+MpwgLdcBEV9g3gARQGOrvRe7J4Dmk56uHyKrSchkuO6L0cIKoshs0IUgCSxqLFzHo2EwFqOkyRYvBzLcXxbw41Yf0v0MCXTygyP7lr828Vdo8O4DdbEofHxQ3fyBtZjR2Vu0+aB4eGBzZvmKrhLCR582/j421Ciy8eOurp50CujqF+LNDs1D8eGXDwaCfiROErIGHzIKGdl0aUMbjxgkHEAatSrfUmGuaWIacWWMXm3y22cbmxc3RGYs/IQWrGB1e0QNLteGLKwpsIhlMrw5rM3Pbv8hcLIsZG3w65IIp8953zyXDafiJxPpN3RpBNqavaGranXrpFfelFVUTxQT1WG9vWdO9e3b6iSbASeTM1W3UmYqM6m1EQ6nfjDNnBRCsFUcL3m99jAzrna8+K3xjNKks99/i02+HHPBH+3v2sC52+vmuDcVQv0z3QtwF691gJdPvQSO0PfwC2u3URnjCAL5nz4KBqIUZEdlYDD9ILE7XKAW2DODotCV1efVwiJVjCg9NZ5ijnuKK6+XRPk2Vs85szlH7PM0ovJvlX1sQfH6qv6kp/JT+TzE9O8oW9c/vGtfUl7eFcskYjtGraTfXRz7xg2y3XAMXYP4v7/D38WM83M8MgN+1/fv3N0KN1KQ7Cxu17ffctCo7EAa7CjPDc9Ux0ers5Mz5Vxl4bwoCuxu95da3qSfZ5ZJIi6DZMO2U5uIYc6BzesopoHwZwr6QNF9IgKEjePJnq0U0TTOIcBZMpHMRESVaLqES8gUkkL+COJB2UQJXF+3drRkSOHbty7dcva7eu2t5sjndFOKBIq9Zk6Ao254tqcq+RxOGK4jixmErqIHLLC8uQ1Yy3XJStscwZTKvPAaIk1vh42iZulfgjz69hu68YJl8Bj9WwtfDG3asOqXBwBNdWfW5WDJyhkqrjhdse+FRjfMJ51t//6CS0aDtTmA5l4odymse5WpV1+whMLH5ErhdzeQ3tzhYrsGU7CWHKYfti9Si7VCNJIbtVa3mzo9RxL5PNj7s6GRHx6bXR8yBdK7qiX219b2Upl8p3Yu/2h+o5kPInfHfWgGctk3DzwBvshfQmxO9mJqXyeZ3sMBvkCAgvCdZhnahHhGdG4lga3CVtYC+Zgt/MtXd+g9+nfg+ex3aDrS/9F72PQ8ffp07r+A3jJ778Ot5e+7e/yHfYa/BINbXcsl+9g5LjLmbz05UjVxFqQvfafIeb83NXtbvZDzMkWiXRCFtC3LJ72FdwUVQw2OLNERENzAF8qbAbpjqWv5SK6l+3WDUO//KRXt/OwOA4nIznJ2akkMgnF2SnlIrBSO59hz7DrMBfGSV+nhB6FaQtL6JXQubpiGwzmzXwd4znVb2aDGL9ZvCGmc8SeLPrJBGAJm23Wq+yxmHn5eTNO/+K8Gbt8a9x8eh+YN8LbnTkrkbDYaML61a+sxE033dS9/zvZAtuMcXELXz9YAwIbyVMqYAJFeGcCPU0ocnY4xSFHQMjhcwMLqBBnO0DmFvdePzu9vlpp1l2igZ7ZD12kQVIdDo2altyW5JDkp5yT53HTkkddmfJoqdychPZoq11vYVseRe4+WpLrJTzDz+ezXC9zKS6BV8vX7HIYv+gBIXrI8J73GYbvvC/4vytgRMwIKHYga4LBVEU/L3moTCFmD07RfCpEqekvDsFQCYbymHs9KpzCVCY19u6/zQedSbq6CaNpyMxc8BqG123gxZkpiFoQCICgq2Y6GgPd41EkzcjnJiONtD8RzxgpJU5pFMoj1CvdpHi82mJrLArhKlRWwdg60uM6d7C/YZswj2Y7KdeWfEGMJ5auhdmd3TqPcxJ3Nb73oX/i/ND5HCxACRacz7FNzueW95f95i72n9Bv4qTC6yoVbaR7uaVmfQCbEW85+hJ6FFMZuNQQDhLkN/PJBJB8LlFJVowAiUO8i788g3FMseqYq5t85hGG3eRmd0ljF67gwjsOLrZXZdPwlx/92o2H3Z1V7cWD75g6Njl57BRv2HVux5oToyhzEYb53k+43AUUOD45eRyluvqfpB9iM1g1p0mhk+XFB4a8+5Dhrf7VbDbrnE3/rmeZyIpdL2Ild5/eEzOeMmOJ4FOBRMiEOO7EwYSY8WMjNvEJIxYzPmHGYvTlpf9hxOMGjWJPV493saNsI8mSMhnvtEt5Kogchhh0w48vQZGzEoiCIGKeFUXhABFEYS6Xy5VzZTOYSgV4TVTMuwvxXTxe5gQu5ruffDNvhuR8uQnfeliO+NOGXKnWazcsfHthZ61erUhG2h+VH178xf6v7l9MZo2sqdTu6hziB+u1nQuHOnfXZCNjZVK/cL46vH//sMsN7mB/jH7Fa6wKmexMKCBQ4ayM/BfnUCQIIuDWB8sFVzzGS65cNlaJV64tvFR0gOK1qfYtO25icvOyu0ufrayvVNZv440z1dzbaOw9zht4ZfO9mzatmXp0as3mzfd+tCeBzTebe4/tbboNvL753kffUygWC+959N7N3bl/if2IrUXsK3DsIyuYJ7p0QeAADSSTDJnIZTD/gsq91awHXaRFKoOUnT/Z8EOWg6Alo0u4oBhsjJ09i9Z2ICEFpVJAF+uQKDbk94u27qSNGPx06ZcxEy4asXGUADHhLVnfbhQX/Ybzr33+mElpsKvfe9iPkH/19HOfoHHdWLdYdlPUP9avmA8iJoeCPCfowB/zTEHW9du22c3UeIx9uaug8zMpIHMFG85PC035AcHW4b8ZsVdpKGY6G1A/FLhGPxO2cv2WnGCvzmav0C8gu/GRfCejUmSBWwQXXjD6kYkzzl6DRjBouPjSrvP1zjp0f/a89IDztpfgEy+93zn0UhA0eMQ54fym+7uMXZ9lrzIbGdOtW76sbdvdKUk9HididIgM6ysmCOwEwXQl7CGCQG8imDm2xTvF3yOI8/U7cns6JieDkbAR9GmSSHKQlVfoYD5oudbkNDuLJMmu17BUaGaDnBuyG/JrCrsLa/JL53CDfiMckIJRgKVJ7GI2NruX3sADuLFnTzBK7YD4FbiAHcvjupPdzqax2kZM9rnPRRmsUAJKgljdkDANC9zbXHuNjFocFIui1HO9z9FzZkLXZNH5vPN5RdD0BJtOmJfv0nThlVcEXWPvNxM9nL6Dfg/jNEAaZFtn6/BQKolZFBEGq1LMtacJE5HcYnalmPlPYfjSM3zugOyROBAe5IRo3ggC6e8r5mORYMNoqDIJANKALnCH+DTlSm0XdliOP/GbBPfxZ9l9NIe+KDMJi/5W23bBiB4fjkfyqwvDNdAD8cynB3UziuiheivVRGz1dWtWtTKlgLUhEPKni7nkqnXt1jDblIz1ZVbl6kPxeMqwLg/kqgf/IR0NGtZAvYLAvHPGuTTpD8Yr49WCFezNcXfNkfK1KRxOt7Z3p4TyBWW0Fj/OnyX0ap0n2XHk536SJIOk1Mkzvmp0P3FXo3A+6EGeHeYpyWY0mfipnxtH7AZ7qxdUkgruY0ws3LGiz7XLpZx/paJvNZhvab7cbpfpX2DrfML5rRcCnn8GqiDcKqjfmcASfdDdFAb13Sj1ZS67tA0Z8pzz2xOeAHhRVEWB8LiuDzKN3cYYlvi9OJygH3bXIDCXpVR3bX05m0FvoQZTfcJOGDyXqdBdc5iCcpfZ2khqi7CsrtzVuY06w791fquX9QGf7+JFn6+3dgBHf6eTr0jAGuc33Z2LF1FssLsi0UBxfUAv6V+/eHXtgq+bLF35CjvAPG6tNtIZlMFd0+ouK0F3WYmvnjC6B+3FDnK8mw/ZtmWJfAXQnV8/XDPBqKztZg3qFjP0O1rdk/D87BQ2dU37j1rKA8Pagyf/w2sv3C7dc/HNr56C8wGt5vH89JTHU9PSKKGhwJZ3ffOOO775Om/c9c0j9A30oQTRnuaLCgm+WC3+wTSrI1eab8zfnBpM89z64sINtXp6MHVwvqGmkvdtueMDwxsPTB7mvfzw4ckD0yMPvGuLT9PQPnivr7BP4XxwLN1IruusQ4JI0hihSIQVWcFsSglfvT+NPoauTGVyBAMX0W8P/jBOCpgwN72hXg6XiqVYyNCkdD+UmnlErmIzb2GJ18ZIpa6aVpgHZajL4DmfQWhruMNibSTy7Tpv3JSGckCqHzxGn/xg39wtm0dm71xjp0KBXLG6DjTFGVG0dX2lXCCUsjsnrx+BTPiTrQKsLTY+Fc7A22+8ozmw+EDzjhsDi+/cWNm2riqkbLM6Ua2VC4qmKYVyrTo+YNgpNtDZXt5op6BZbECr0Mzw+biM8Wuw9Yha15MF/lRjDiR5HfJLOotcE7YQUaKSSE9zHitRdgp5hsSwSpCJJMpSt0rgy/jkIPen+V03bJ/fOnPd+s7k+Fg6ZSnckDgd6C7txiRtt1J4dV2QU+IkKze670YMAX+pgDFu3rzbIMo181cZYNlyX/dIATOmTzz48MO3zgqFdesq/ogYCGRaqYgCNNGYPXzvoW0jGVC8cf9YWjekiL+8oVN4xfIXwvoH9TAU9HA19Uqq2po5PCtsuH2dnB/PGEZmPB8fSFkyDaQiTAx4dYVJhmFoVNfDAZkpkk/WJRZJGky2UgPw6it+C/h/WH8Fv8lq9UJjE509dL20zsW2LhZ2nxNpT3tUSXCfa6ksqNIs5u3e2zGOlz8tvXwPPAp/6ty2/K4MHvW6R7DPuY2IVy7h9X7BdiNzXkNuJO8mf0bWdzrHQWSPIQeky2Wqy2BFzlJEQaTCaUwxgriHIIM9yBns/KOPnD515x23HN6yeXSY85b2aJ4/O3Hf5aiF0B3QU933W/hbNOVc0xxtrrzpEcJj5bzkSuS4tdrF0fryIxXMPLnl10+66cg2R0dGuyEqS6Vh6t7ETU42Ajfwg/mc++SGo2Hv5ZY2L/X5oskQeExJD2aoipwBByh7mOI1mbxNUBncHYomw+s/cr0ooo2FSkyvH6gwhc1heqXXQyQWSI3NBtBTDwsYwbKoSiN7ZJoGVfyNpHq17NH1gka5CwmBrG9LjCk3i5Izk0rlolsfGheE7XgLyxv2Lh5TWZJXBvSRyOrklo9s5A9LJ6giBPqs2pERRRxjSGgQ+kzD8pTSiBHiTQKGBlX6s5SOU01YpxveWOP+WRHRQxQ0Uw9pi2OCug9Ns/RaKp6xp99R4mX3oqBQLe7bfEQBSXROMkGdajJVmMDSLoAuNywp+1ACVtbbZtGv+kmb7OzMF2TMlRrSiCCeyh+sAX+9Au2ODFI6RSQeoRin7IzsEowF2SUYLqudB9JsDA+Vi7GozysJpB+qXX4R5kVXCK2KWMsXzPlC1so6nbv05IYkQpjZKOUkJOHhWqtJzVixGEu33latmvWiOZzJtVv7DvzowL7m2NDAJw6m+dEH46VEohRn2wuN4nplMFc1Cg1jZOTEmtsP7Gu1ufzth3bfcNK/vtgoOO+34nHrkpmIW9e+b2AhL9/QWcuL3RTH5FkNS18ZMVvoej6OG+sg4g6Wk5KD1B1rOJRJJ+OhQjhfzJWQR2Ftma216259KTd7BG8C6yCXU+Dwy1nOMSAHi1QQxquXztUqq1dXnqE3V8fHq7VzzqdXV35F91VWnzu3ugID1fFL41Xnu3wXHqmOu7n2sPATtoMMkVVka2dGBEEsedEcAp3lRZrIiHiaL+yiY8BpzkHPIFSIbtUuHuT0eX5kmHIDrRpZNVBNI4qTITrkGggTBPIFtAlGlh3W+etlOVS5t4l0egiwTOLL6yhpy2gbbiZMSuzKzf3rPcrXCvl7r98u+wsF+UYQYNus7M8X5Rudyx8K1TOyRZ8emhsuXxc5Y8UTpUSchVrV5PCDO7fOHAs/bxR1v/Ff6QWj4PcbPzoRkPvqARpeNTw3lE1+DDNgMmmEYj1ud4z9NfppBGegzVlwF6EkLFUl8bSGoUQoRucRGe0lqKJwzZPxgx5QVAXHT0ijPtweaQ9U+yrlYiqOF7PbuZxXiva7CTQcyrpLg3zdaDmrgpthu0QLOSJfHuNww49ya8O/KUYTRej3aouquqj6lpLRYinChouxpbRP5X0eD1TfB2OxorMpWnxfkVnRYiGm7dei2n61EHtvrLj0nVhB3a/F1P2eqali1NGK0YsXYwWX/34FfdSL3AVrjCAPuFnX+7o1GRA75POQBCRcGpsrY7pjPOvXUtSeZIiKfI0T3tQ9zmf8WjUXe/i9uU2TQ6Y10JnOv/fh085ntTkNtvm1Vmtb8T0PQKSaC1mFSgwe/PVp5yuaGyP/QP8Y+YyMWaLaKYuMckpH+HIePYPFB7iFGK8vBJjPm8WW6ZaIZhYdRAdb5OUrzmMZPd/mfIQTFpzlpyC5886dAC9nwku/QLTPhIOPvXiOIouAz946sZNuW/Mp55kw9odgHXKQWw8/9tjhW1O9d5V4DlRIllTJevLRbkVZ96Dfy7JwUkN+pRCqHFU5KkkEjnqh+wrTUSIzJu8hssxuJkxm2+OdhnuWKMin/x9O29MpDvTncxpKTq6u1/rXD6xH/lrNV8MhNatlRYEooPh4UOUkjmLIyHJuwrLcrFZzU1b3/QLGEY9jY7n3SPXqelm99zD1zVih0CgUYof37/lAqVwufWDP/hevbh7uHa3vqtd2Na5yUtyv76K7ERIR9S797lndzSUDj6HEpdquw7vqK0zX3Vt+bnQbzvUYco0IVlN9nVIyEY8sv1vi15df+sK4i/bqskSCL2ibVx/V2awOK0/uoMiXBf/XhZmZmfsem3nsj2ZmHrhAj89s4Tv3zcwsPU5/fQG+dwFsLvFHj808jhL0+NLjuPO4K06PXzj/va/+X9C4grUAAAB4nGNgZGBgAGK5+o9z4/ltvjLwM78AijDcryk5BaP///qfyPKIOQLI5WBgAokCAIrDDp0AeJxjYGRgYA76n8XAwPLo/6//b1keMQBFUIA9ALQSB7F4nGN+wcDAjIRZUlH5uDCLOoj+/wuI/+NSw1SIW45UzKKMRTwbiiP//2V6B7RrARBH/v8DkQe6LRuq99H/v3A3NSH0AwCVl0XxAAAAAAAAAAAcADwAUALwAzQDVgOwBAQEWASMBLAFBAUmBUIF8AYOBjwGfgakBtQHTAdyB9AIHgiSCOAJOAmGClAKhgqeCtILEgvCC+4MTgySDO4NUA2gDfAOIA6MDsIPPg9WD7QQDhBgEJYRHhHEEewS8BNsE8QURBS+FP4VRhX8FkkAAQAAAD8BvwAGAAAAAAACAB4ARQCNAAABAQ4MAAAAAHicdY/NSsNAFIXP9E9sQUHRjZtZSYuQtgFRurFYbLdSofu0TZOUNFMmU6Eb38CFL+iLuPE0uYgIZjIz3z33njszAM7wCYXyu+UsWaHKqOQKjnAvXOV4EK6RH4XraOFJuEH9WbiJG7wIt3CON+ZU7ZjRGh/Cio4v4QpOlBKuoqFOhWvkC+E6LtWVcIN6X7iJmboTbuFavY/Mdm+TKHa6Pepov+f7er7XhlKSBakOdi42NtdDvTKZC9PUeAuzSVw+DaNdGlgS/1lo88Rkuu/1GE3CLLSBC5eHTvlr5Du30itrNnosPfTWmnW4cF7s3HbQ7f7ujREMttjDIkGEGA4abaod7j56nD5pzgrNyrIqQYYAKZUAOzriIpMzHnKuGGVUQ1akZA8Lrhu6HGum1CO6UnqtaOU6Y8YW0cGv0aezJ7kJc1mRD4rOy5875XhlP5+q48mH021xmsb4zz0033nIraksqHvFax3VAboc/9z7G5egcrIAAHicbVLZdtMwEM2FbE2apCktpexL2RHQtJSd8ic5sjxOdCJLRpKb5O8Z2/DAOehB0miWe+eOWtdazRq0/r8ucQ3X0UYHXfTQxw4GGGIXI4wxwR6m2McNHOAQN3GEWzjGbdzBXdzDfTzAQzzCYzzBCZ7iGZ7jBV7iFV7jDQTe4h3e4xQznOEcH3CBj/iEz/iCr/iG7/iBS/xstTNtqJs5k5LvJqUxFMepkDYVqUg8n6FrXSQx6xq5JR96hdc2ku8nUq2MtqueK2N1tquto4wLtJc5n8sojA5RRNrEfkFWaSNOu4lzK3G2WxhpKYqwlL7YMXqxjFbbxagqITievJWmsWowtrimizWTtdeRg4eGRELSitSmvUDSq+Ws/zdoIu2C/akrEz7KYkcxksiltpP6Jm2UC2eZX+MJOqVBfWN0L+tHqRj5RKt5ZkqycV6QKwzNlcvz0uq4nZ9ezFk8Q+k4k0ItSa1EcEannVzbMhxlJOOSvNDKWVHIgq9V2yMlDdmUoarkaeZsZBpO/CopRO3sYeI2VUrg6DKInFLNGQfEhr4i0biafo+rZCHXFFxO50xdGcm6c5FGUx5nMk3KpNKg6ijWkKO4LPOERamtSWOlbm0bb0Oo4sM6Tqvf8Yf8rPFXE8ylX9XWkIXZFo6nlLn2UpqsRxuZs0z7/wzAV2wGPHmlvWLBBrksRFWEfEeupU+HIXriD3GlaT1qfiH3aEjFTii0nbWjzqnNPcS28m49CHpRCeRC7CxZitg2Tq36W23FloHHYe18WhPkbdNq/Qb9Vxd3AAAAeJxj8N7BcCIoYiMjY1/kBsadHAwcDMkFGxnYnTYyMGhBaC4UeicDAwM3EmsnAzMDg8tGFcaOwIgNDh0RIH6Ky0YNEH8HBwNEgMElUnqjOkhoF0cDAyOLQ0dyCEwCBDYy8GntYPzfuoGldyMTg8tm1hQ2BhcXAJQcKgcAAA==")
      format("woff"),
    url("data:application/octet-stream;base64,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AREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAARmaWxlBmZvbGRlcgZidWxsZXQOZC1hbmQtZC1icmFuZHMGbm90ZS0yBmxheWVycwdwcmludGVyCGJhY2tsaW5rB291dGxpbmsEbGluawVjbG9zZRBmb3JtYXQtbGlzdC10ZXh0CHBlbmNpbC0xBmJvb2stMwxwbGFuZXQtc2hhcnAJbGlnaHRuaW5nDWxpbmstZXh0ZXJuYWwNbGluay1pbnRlcm5hbBBmb290bm90ZS13cml0aW5nC2xlLWJlYW4tZG5kB3NlYXJjaDIIZm9vdG5vdGUPYW5nbGUtZG91YmxlLXVwCWNoYXItbWFpbg9jaGFyLWFudGFnb25pc3QJY2hhci1zaWRlCmNoYXItZXh0cmEJY2hhcmFjdGVyJGljX2ZsdWVudF9wZW9wbGVfY29tbXVuaXR5XzE2X2ZpbGxlZA5mYS1jaGVjay1zb2xpZAVtaW51cxdmZWF0aGVyLWljb24tcGFwZXItcGxhbg1jYWxlbmRhci1maWxsEWZvbnRpc3RvLXF1ZXN0aW9uFWJveGljb25zLXBsdXMtbWVkaWNhbBRlbHVzaXZlLWljb25zLXNlYXJjaBlmb250LWF3ZXNvbWU0LWV4Y2xhbWF0aW9uCWxpZ2h0YnVsYhFidWJibGUtY2hhcnQtZmlsbA10aHVtYi11cC1maWxsD3RodW1iLWRvd24tZmlsbA1mb250aXNvLXF1b3RlEWZpbGUtcGFwZXItMi1maWxsDWJvb2ttYXJrLWZpbGwLZW50eXBvLWluZm8EaGFsZgdleGFtcGxlEmFuZ2xlLWRvdWJsZS1yaWdodApvay1jaXJjbGVkCm1hcC1tYXJrZXIFYXdhcmQLc3RyZWV0LXZpZXcNYnVsbGV0LXNlbGVjdAVzcGluMgR0aW1lBGNoYXQEY3JvdwpzaWducy1wb3N0BWhlYXJ0BGxvY2sIeWluLXlhbmcOc3dvcmQtZmlsbC1maXgAAAAAAAEAAf//AA8AAAAAAAAAAAAAAAAAAAAAsAAsILAAVVhFWSAgS7gADlFLsAZTWliwNBuwKFlgZiCKVViw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")
      format("truetype");
}
`
};

// src/fonts/font-tag.ts
var FONT_TAG = "v4.0.12";
var FONT_BASE_URL = `https://cdn.jsdelivr.net/gh/saberzero1/quartz-themes@${FONT_TAG}/fonts`;

// src/composer.ts
var ASPECT_ORDER = [
  "base",
  "headings",
  "typography",
  "links",
  "lists",
  "blockquotes",
  "tables",
  "code",
  "images",
  "embeds",
  "checkboxes",
  "callouts",
  "cards",
  "search",
  "scrollbars",
  "explorer",
  "toc",
  "graph",
  "popover",
  "footer",
  "recentNotes",
  "listPage",
  "darkmode",
  "breadcrumbs",
  "misc"
];
function generateFontFaceCSS(fontFiles, themeName) {
  if (!fontFiles || fontFiles.length === 0) return "";
  return fontFiles.map(
    (font) => `@font-face {
  font-family: "${font.family}";
  font-style: ${font.style};
  font-weight: ${font.weight};
  src: url("${FONT_BASE_URL}/${themeName}/${font.file}") format("${font.format}");
` + (font.unicodeRange ? `  unicode-range: ${font.unicodeRange};
` : "") + `}`
  ).join("\n");
}
function composeCSS(options) {
  const baseThemeId = resolveThemeId(options.theme, options.variation);
  const baseTheme = loadTheme(baseThemeId);
  const effectiveMode = resolveEffectiveMode(options.mode, baseTheme);
  const includedAspects = resolveIncludedAspects(options, baseTheme);
  const parts = [];
  if (effectiveMode === "dark" || effectiveMode === "both") {
    const darkCSS = collectAspectCSS(
      "dark",
      includedAspects,
      baseTheme,
      options
    );
    if (darkCSS) parts.push(darkCSS);
  }
  if (effectiveMode === "light" || effectiveMode === "both") {
    const lightCSS = collectAspectCSS(
      "light",
      includedAspects,
      baseTheme,
      options
    );
    if (lightCSS) parts.push(lightCSS);
  }
  if (baseTheme.extras) {
    parts.push("/* extras */\n" + baseTheme.extras);
  }
  const iconFontCSS = baseTheme.meta.fonts.filter((f) => f.startsWith("icons/")).map((name) => FONT_CSS[name]).filter(Boolean).join("\n\n");
  const regularFontCSS = generateFontFaceCSS(
    baseTheme.meta.fontFiles,
    baseTheme.meta.fontDir ?? baseTheme.meta.name
  );
  const legacyFontCSS = !regularFontCSS ? baseTheme.meta.fonts.filter((f) => !f.startsWith("icons/")).map((name) => FONT_CSS[name]).filter(Boolean).join("\n\n") : "";
  const fontCSS = [iconFontCSS, regularFontCSS || legacyFontCSS].filter(Boolean).join("\n\n");
  const checkboxCSS = generateCheckboxIconCSS();
  const iconCSS = generateCalloutIconCSS() + "\n\n" + checkboxCSS;
  const css = (fontCSS ? fontCSS + "\n\n" : "") + iconCSS + "\n\n" + TEMPLATE_BASELINE_CSS + "\n" + parts.join("\n") + "\n" + TEMPLATE_CSS;
  return {
    css,
    effectiveMode,
    styleSettingsId: baseTheme.meta.styleSettingsId,
    classSettings: baseTheme.classSettings,
    brokenVarLinks: baseTheme.brokenVarLinks,
    themeMeta: {
      name: baseTheme.meta.name,
      fontFiles: baseTheme.meta.fontFiles,
      fontDir: baseTheme.meta.fontDir ?? baseTheme.meta.name
    }
  };
}
function resolveEffectiveMode(requestedMode, theme) {
  const availableModes = theme.meta.modes;
  const fallback = availableModes[0] ?? "dark";
  if (requestedMode === "both") {
    if (availableModes.length === 1) {
      console.warn(
        `[QuartzTheme] Theme "${theme.meta.name}" only supports ${fallback} mode. Defaulting to "${fallback}". Consider disabling Component.Darkmode() from your quartz.config.ts.`
      );
      return fallback;
    }
    return "both";
  }
  if (!availableModes.includes(requestedMode)) {
    console.warn(
      `[QuartzTheme] Theme "${theme.meta.name}" does not support "${requestedMode}" mode (available: ${availableModes.join(", ")}). Falling back to "${fallback}".`
    );
    return fallback;
  }
  return requestedMode;
}
function resolveIncludedAspects(options, baseTheme) {
  let aspects;
  if (options.include && options.include.length > 0) {
    aspects = options.include;
  } else {
    aspects = ASPECT_ORDER.filter(
      (key) => baseTheme.dark[key] !== void 0 || baseTheme.light[key] !== void 0
    );
  }
  if (!aspects.includes("base")) {
    aspects = ["base", ...aspects];
  }
  if (options.aspects) {
    aspects = aspects.filter((key) => options.aspects?.[key] !== false);
  }
  if (options.aspects) {
    for (const [key, value] of Object.entries(options.aspects)) {
      if (typeof value === "string" && !aspects.includes(key)) {
        aspects.push(key);
      }
    }
  }
  return ASPECT_ORDER.filter((key) => aspects.includes(key));
}
function transformCheckboxCSS(css, iconFonts) {
  const hasIconFont = iconFonts.length > 0;
  const fontFamily = hasIconFont ? iconFonts.map((f) => f.replace(/^icons\//, ""))[0] : null;
  if (hasIconFont) {
    const iconSelectors = [];
    let transformed2 = css.replace(
      /([^\n{}]*li\.task-list-item\[data-task[^\]]*\])\s*input\[type=["']?checkbox["']?\]::after\s*\{([^}]*)\}/g,
      (block, fullSelector, body) => {
        const hasGlyph = /content:\s*"[^"]+"/i.test(body);
        if (!hasGlyph) {
          return "";
        }
        iconSelectors.push(fullSelector.trim());
        return `${fullSelector.trim()}::before {${body}}`;
      }
    );
    const beforeProps = [
      "  display: inline-block",
      "  vertical-align: middle",
      "  width: var(--checkbox-size, 16px)",
      "  height: var(--checkbox-size, 16px)",
      "  margin-inline: -1.4rem 0.2rem",
      "  text-align: center",
      "  line-height: var(--checkbox-size, 16px)",
      "  font-size: var(--checkbox-size, 16px)",
      "  pointer-events: none",
      fontFamily ? `  font-family: "${fontFamily}", system-ui, sans-serif` : ""
    ].filter(Boolean).join(";\n");
    transformed2 = transformed2.replace(
      /(::before\s*\{[^}]*content:\s*"[^"]*")/g,
      `$1;
${beforeProps}`
    );
    const uniqueSelectors = [...new Set(iconSelectors)];
    const inputHiding = uniqueSelectors.map(
      (sel) => `${sel} input[type="checkbox"] {
  mask-image: none !important;
  -webkit-mask-image: none !important;
  background-color: transparent;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
}`
    ).join("\n\n");
    return transformed2 + "\n\n" + inputHiding;
  }
  const nonAfterSelectors = /* @__PURE__ */ new Set();
  const selectorPattern = /([^\n{}]+input\[type=["']?checkbox["']?\])\s*\{/g;
  for (const match of css.matchAll(selectorPattern)) {
    const sel = match[1]?.trim();
    if (sel && !sel.includes("::after")) {
      nonAfterSelectors.add(sel);
    }
  }
  const afterSuppressionSelectors = [];
  const afterColorMap = /* @__PURE__ */ new Map();
  let transformed = css.replace(
    /([^\n{}]+input\[type=["']?checkbox["']?\])::after\s*\{([^}]*)\}/g,
    (block, baseSel, body) => {
      const colorMatch = body.match(/(?:^|;\s*|\n\s*)color:\s*([^;]+)/);
      if (nonAfterSelectors.has(baseSel.trim())) {
        if (colorMatch) {
          afterColorMap.set(baseSel.trim(), colorMatch[1].trim());
        }
        return "";
      }
      if (body.includes("mask-image")) {
        return `${baseSel.trim()} {${body}}`;
      }
      if (colorMatch) {
        return `${baseSel.trim()} {
  color: ${colorMatch[1].trim()};
}`;
      }
      return "";
    }
  );
  transformed = transformed.replace(/^\s*content:\s*""\s*;?\s*$/gm, "");
  transformed = transformed.replace(
    /([^\n{}]+input\[type=["']?checkbox["']?\])\s*\{([^}]*)\}/g,
    (block, selector, body) => {
      if (!body.includes("mask-image")) {
        return block;
      }
      afterSuppressionSelectors.push(selector.trim());
      const hasBackgroundColor = /(?:^|;\s*|\n\s*)background-color\s*:/.test(
        body
      );
      const injectedProps = [
        "  appearance: none;",
        "  -webkit-appearance: none;",
        "  border: none;",
        "  border-radius: 0px;",
        hasBackgroundColor ? null : "  background-color: currentColor !important;",
        "  -webkit-mask-size: 100%;",
        "  mask-size: 100%;"
      ].filter((line) => line !== null).join("\n");
      let newBody = body;
      if (!body.includes("appearance:")) {
        newBody = body.trimEnd() + "\n" + injectedProps + "\n";
      }
      const extractedColor = afterColorMap.get(selector.trim());
      if (extractedColor && !/(?:^|;\s*|\n\s*)color:/m.test(newBody)) {
        newBody = newBody.trimEnd() + `
  color: ${extractedColor};
`;
      }
      return `${selector} {${newBody}}`;
    }
  );
  if (afterSuppressionSelectors.length > 0) {
    const afterRules = afterSuppressionSelectors.map((sel) => `${sel}::after { content: none; }`).join("\n");
    transformed += "\n\n" + afterRules;
  }
  return transformed;
}
function collectAspectCSS(mode, aspects, baseTheme, options) {
  const overrideCache = /* @__PURE__ */ new Map();
  const cssChunks = [];
  for (const aspect of aspects) {
    const overrideThemeName = options.aspects?.[aspect] !== void 0 && typeof options.aspects[aspect] === "string" ? options.aspects[aspect] : null;
    let css;
    if (overrideThemeName) {
      let overrideTheme = overrideCache.get(overrideThemeName);
      if (!overrideTheme) {
        const overrideId = resolveThemeId(overrideThemeName);
        overrideTheme = loadTheme(overrideId);
        overrideCache.set(overrideThemeName, overrideTheme);
      }
      css = overrideTheme[mode][aspect];
    }
    if (css === void 0) {
      css = baseTheme[mode][aspect];
    }
    if (css) {
      if (aspect === "checkboxes") {
        const iconFonts = baseTheme.meta.fonts.filter(
          (f) => f.startsWith("icons/")
        );
        css = transformCheckboxCSS(css, iconFonts);
      }
      cssChunks.push(`/* aspect: ${aspect} */
${css}`);
    }
  }
  return cssChunks.join("\n\n");
}
var OBSIDIAN_TO_QUARTZ = [
  // Explorer / file tree (specific before general)
  [/\.nav-folder:not\(\.is-collapsed\)/g, "li:has(> .folder-outer.open)"],
  [/\.nav-folder\.is-collapsed/g, "li:has(> .folder-outer:not(.open))"],
  [
    /\.nav-folder-title-content::before/g,
    ".explorer .folder-container::before"
  ],
  [/\.nav-folder-title-content/g, ".explorer .folder-container > div"],
  [
    /\.nav-file-title-content::before/g,
    ".explorer ul.explorer-ul li > a::before"
  ],
  [/\.nav-file-title-content/g, ".explorer .nav-files-container a"],
  [
    /\.nav-folder-title:not\(:hover\)/g,
    ".explorer .nav-folder-title:not(:hover)"
  ],
  [/\.nav-folder-title(?=[\s,:{]|$)/g, ".explorer .nav-folder-title"],
  [/\.nav-file-title(?=[\s,:{]|$)/g, ".explorer .nav-file-title"],
  [/\.nav-folder-children/g, ".explorer .tree-item-children"],
  [/\.nav-files-container/g, ".explorer .nav-files-container"],
  [/\.nav-folder\.mod-root/g, ".explorer"],
  [/\.nav-folder(?=[\s,:{]|$)/g, ".explorer li"],
  [/\.nav-file(?=[\s,:{]|$)/g, ".explorer li"],
  [/\.is-collapsed(?=[\s,:{]|$)/g, "li:has(> .folder-outer:not(.open))"],
  [/\.collapse-icon/g, ".explorer .collapse-icon"],
  // Metadata / properties
  [/\.metadata-container/g, ".note-properties"],
  [/\.metadata-property-key/g, ".note-properties-key"],
  [/\.metadata-property-value/g, ".note-properties-value"],
  // Reading view → Quartz rendered content
  [/\.markdown-preview-view/g, "body"],
  [/\.markdown-reading-view/g, "body"],
  // Inline title → article title
  [/\.inline-title/g, "h1.article-title"],
  // Status bar → footer
  [/\.status-bar/g, "footer"],
  // Canvas (Quartz has canvas support)
  [/\.canvas-node-container/g, ".canvas-node-content"],
  [/\.canvas-node(?=[\s,:{]|$)/g, ".canvas-node"],
  // Generic element translations
  [/\.svg-icon/g, "svg"],
  // Obsidian-only UI — drop rules containing these
  [/\.markdown-source-view/g, null],
  [/\.cm-editor/g, null],
  [/\.cm-s-obsidian/g, null],
  [/\.cm-hmd-/g, null],
  [/\.cm-contentContainer/g, null],
  [/\.cm-scroller/g, null],
  [/\.cm-formatting-/g, null],
  [/\.cm-line/g, null],
  [/\.cm-active/g, null],
  [/\.workspace-tab-header/g, null],
  [/\.workspace-tabs/g, null],
  [/\.workspace-tab-container/g, null],
  [/\.workspace-leaf/g, null],
  [/\.workspace-split/g, null],
  [/\.workspace-ribbon/g, null],
  [/\.workspace(?=[\s,:{]|$)/g, null],
  [/\.mod-left-split/g, null],
  [/\.mod-right-split/g, null],
  [/\.mod-root\)/g, null],
  [/\.mod-root(?=[\s,:{]|$)/g, null],
  [/\.mod-cm6/g, null],
  [/\.mod-top/g, null],
  [/\.mod-vertical/g, null],
  [/\.mod-horizontal/g, null],
  [/\.mod-left(?=[\s,:{]|$)/g, null],
  [/\.mod-right(?=[\s,:{]|$)/g, null],
  [/\.mod-sidedock/g, null],
  [/\.mod-active/g, null],
  [/\.mod-settings/g, null],
  [/\.mod-linux/g, null],
  [/\.mod-macos/g, null],
  [/\.mod-windows/g, null],
  [/\.mod-ios/g, null],
  [/\.view-header/g, null],
  [/\.view-content/g, null],
  [/\.pdfViewer/g, null],
  [/\.pdf-thumbnail-view/g, null],
  [/\.horizontal-tab-nav-item/g, null],
  [/\.vertical-tab-nav-item/g, null],
  [/\.HyperMD-/g, null],
  [/\.mk-sidebar-/g, null],
  [/\.file-explorer-flat/g, null],
  [/\.is-live-preview/g, null],
  [/\.is-mobile/g, null],
  [/\.is-tablet/g, null],
  [/\.is-focused/g, null],
  [/\.is-popout-window/g, null],
  [/\.app-container/g, null],
  [/\.sidebar-toggle-button/g, null],
  [/\.titlebar-button-container/g, null],
  [/\.style-settings-container/g, null],
  [/\.css-settings-manager/g, null],
  [/\.setting-item/g, null],
  [/\.markdown-preview-sizer/g, null],
  [/\.print(?=[\s,:{]|$)/g, null],
  [/\.is-checked/g, null],
  [/\.is-phone/g, null],
  [/\.clickable-icon/g, null],
  [/\.modal-container/g, null],
  [/\.modal-bg/g, null],
  [/\.modal(?=[\s,:{]|$)/g, null],
  [/\.dataview/g, null],
  [/\.cm-header/g, null]
];
function rewriteClassSelectors(css, className) {
  const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const classRe = new RegExp(`\\.${escapedClass}(?=[.\\s:{]|$)`, "g");
  return css.replace(
    /([^\n{}]+)\{([^}]*)\}/g,
    (_block, selectorGroup, body) => {
      const rewritten = selectorGroup.split(",").map((sel) => {
        let s = sel.trim();
        s = s.replace(
          /\.theme-dark(?=[.\s,:{]|$)/g,
          ':root[saved-theme="dark"]'
        );
        s = s.replace(
          /\.theme-light(?=[.\s,:{]|$)/g,
          ':root[saved-theme="light"]'
        );
        s = s.replace(classRe, ":root");
        s = s.replace(/\bbody:root\b/g, ":root");
        s = s.replace(/(:root(?:\[[^\]]*\])?)\s+:root\b/g, "$1");
        return s.trim();
      }).filter((sel) => {
        for (const [pattern, replacement] of OBSIDIAN_TO_QUARTZ) {
          if (replacement === null && pattern.test(sel)) {
            pattern.lastIndex = 0;
            return false;
          }
          pattern.lastIndex = 0;
        }
        return true;
      }).map((sel) => {
        let s = sel;
        for (const [pattern, replacement] of OBSIDIAN_TO_QUARTZ) {
          if (replacement !== null) {
            s = s.replace(pattern, replacement);
          }
        }
        return s;
      }).join(", ");
      if (!rewritten) return "";
      return `${rewritten} {${body}}`;
    }
  ).replace(/\n{3,}/g, "\n\n").trim();
}
function processStyleSettings(settings, themeId, classSettingsMap, brokenVarLinks) {
  const themeIds = Array.isArray(themeId) ? themeId : [themeId];
  const lightVars = [];
  const darkVars = [];
  const classCSS = [];
  const overriddenVarNames = /* @__PURE__ */ new Set();
  const suppressedVarNames = /* @__PURE__ */ new Set();
  if (classSettingsMap) {
    for (const [key, value] of Object.entries(settings)) {
      const matchedId = themeIds.find((id) => key.startsWith(`${id}@@`));
      if (!matchedId) continue;
      const settingId = key.slice(matchedId.length + 2);
      if (typeof value === "boolean" && !value) {
        const entry = classSettingsMap[settingId];
        if (entry) {
          const allCSS = [entry.general, entry.dark, entry.light].filter(Boolean).join(" ");
          const varRefs = allCSS.matchAll(/var\(--([a-zA-Z0-9_-]+)/g);
          for (const match of varRefs) {
            suppressedVarNames.add(`--${match[1]}`);
          }
        }
      }
    }
    for (const [key, value] of Object.entries(settings)) {
      const matchedId = themeIds.find((id) => key.startsWith(`${id}@@`));
      if (!matchedId) continue;
      const settingId = key.slice(matchedId.length + 2);
      if (typeof value === "boolean" && value) {
        const entry = classSettingsMap[settingId];
        if (entry) {
          const allCSS = [entry.general, entry.dark, entry.light].filter(Boolean).join(" ");
          const varRefs = allCSS.matchAll(/var\(--([a-zA-Z0-9_-]+)/g);
          for (const match of varRefs) {
            suppressedVarNames.delete(`--${match[1]}`);
          }
        }
      }
      if (typeof value === "string" && value) {
        const entry = classSettingsMap[value];
        if (entry) {
          const allCSS = [entry.general, entry.dark, entry.light].filter(Boolean).join(" ");
          const varRefs = allCSS.matchAll(/var\(--([a-zA-Z0-9_-]+)/g);
          for (const match of varRefs) {
            suppressedVarNames.delete(`--${match[1]}`);
          }
        }
      }
    }
  }
  const settingIdToValue = /* @__PURE__ */ new Map();
  const classSelectValues = /* @__PURE__ */ new Set();
  for (const [key, value] of Object.entries(settings)) {
    const matchedId = themeIds.find((id) => key.startsWith(`${id}@@`));
    if (!matchedId) continue;
    const settingId = key.slice(matchedId.length + 2);
    settingIdToValue.set(settingId, value);
    if (typeof value === "boolean") continue;
    if (typeof value === "string" && !value) continue;
    if (typeof value === "string" && classSettingsMap) {
      const entry = classSettingsMap[value];
      if (entry !== void 0) {
        classSelectValues.add(value);
        continue;
      }
    }
    if (settingId.endsWith("@@dark")) {
      const varName = settingId.slice(0, -6);
      if (suppressedVarNames.has(`--${varName}`)) continue;
      darkVars.push(`  --${varName}: ${value};`);
      overriddenVarNames.add(`--${varName}`);
    } else if (settingId.endsWith("@@light")) {
      const varName = settingId.slice(0, -7);
      if (suppressedVarNames.has(`--${varName}`)) continue;
      lightVars.push(`  --${varName}: ${value};`);
      overriddenVarNames.add(`--${varName}`);
    } else {
      if (suppressedVarNames.has(`--${settingId}`)) continue;
      lightVars.push(`  --${settingId}: ${value};`);
      darkVars.push(`  --${settingId}: ${value};`);
      overriddenVarNames.add(`--${settingId}`);
    }
  }
  if (classSettingsMap) {
    for (const [classId, entry] of Object.entries(classSettingsMap)) {
      if (settingIdToValue.get(classId) === true) {
        emitClassSettingCSS(entry, classId, classCSS);
      }
    }
    for (const [classId, entry] of Object.entries(classSettingsMap)) {
      if (classSelectValues.has(classId)) {
        emitClassSettingCSS(entry, classId, classCSS);
      }
    }
  }
  if (brokenVarLinks) {
    const bridgeLight = [];
    const bridgeDark = [];
    for (const targetVar of overriddenVarNames) {
      const dependents = brokenVarLinks[targetVar];
      if (!dependents) continue;
      for (const dep of dependents) {
        if (overriddenVarNames.has(dep)) continue;
        const bridge = `  ${dep}: var(${targetVar});`;
        bridgeLight.push(bridge);
        bridgeDark.push(bridge);
      }
    }
    lightVars.push(...bridgeLight);
    darkVars.push(...bridgeDark);
  }
  const cssParts = [];
  if (lightVars.length) {
    cssParts.push(`:root {
${lightVars.join("\n")}
}`);
  }
  if (darkVars.length) {
    cssParts.push(`:root[saved-theme="dark"] {
${darkVars.join("\n")}
}`);
  }
  if (classCSS.length) {
    cssParts.push(...classCSS);
  }
  return { css: cssParts.join("\n") };
}
function emitClassSettingCSS(entry, className, out) {
  if (entry.general) {
    const result = rewriteClassSelectors(entry.general, className);
    if (result) out.push(result);
  }
  if (entry.dark) {
    const rewritten = rewriteClassSelectors(entry.dark, className);
    if (rewritten) out.push(wrapInDarkScope(rewritten));
  }
  if (entry.light) {
    const rewritten = rewriteClassSelectors(entry.light, className);
    if (rewritten) out.push(wrapInLightScope(rewritten));
  }
}
function wrapInDarkScope(css) {
  return css.replace(/^([^\n{]*)\{/gm, (match, selectorGroup) => {
    const scoped = selectorGroup.split(",").map((sel) => {
      const s = sel.trim();
      if (s.includes("[saved-theme=")) return s;
      if (s === ":root" || s.startsWith(":root ")) {
        return s.replace(":root", ':root[saved-theme="dark"]');
      }
      return `:root[saved-theme="dark"] ${s}`;
    }).join(", ");
    return scoped + " {";
  });
}
function wrapInLightScope(css) {
  return css.replace(/^([^\n{]*)\{/gm, (match, selectorGroup) => {
    const scoped = selectorGroup.split(",").map((sel) => {
      const s = sel.trim();
      if (s.includes("[saved-theme=")) return s;
      if (s === ":root" || s.startsWith(":root ")) {
        return s.replace(":root", ':root[saved-theme="light"]');
      }
      return `:root[saved-theme="light"] ${s}`;
    }).join(", ");
    return scoped + " {";
  });
}
function loadStyleSettings(input) {
  if (typeof input === "string") {
    return JSON.parse(readFileSync(input, "utf-8"));
  }
  return input;
}

// src/transformer.ts
var defaultOptions = { theme: "tokyo-night", mode: "both" };
var FONT_VAR_NAMES = [
  "--font-text",
  "--font-text-theme",
  "--font-interface",
  "--font-interface-theme",
  "--font-monospace",
  "--font-monospace-theme",
  "--h1-font",
  "--h2-font",
  "--h3-font",
  "--h4-font",
  "--h5-font",
  "--h6-font"
];
function extractFontVars(css) {
  const result = {};
  for (const varName of FONT_VAR_NAMES) {
    const pattern = new RegExp(
      `${varName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:\\s*([^;]+)`
    );
    const match = css.match(pattern);
    if (match?.[1]) {
      const value = match[1].trim();
      if (value && !value.startsWith("var(") && value !== "inherit") {
        result[varName] = value;
      }
    }
  }
  return result;
}
var QuartzTheme = (userOptions) => {
  const options = { ...defaultOptions, ...userOptions };
  let cssResources;
  let jsResources;
  function buildResources() {
    if (cssResources && jsResources)
      return { css: cssResources, js: jsResources };
    const css = [];
    const js = [];
    const {
      css: resolvedCSS,
      effectiveMode,
      styleSettingsId,
      classSettings,
      brokenVarLinks,
      themeMeta
    } = composeCSS(options);
    if (resolvedCSS && themeMeta) {
      const fontVars = extractFontVars(resolvedCSS);
      globalThis.__quartzFonts = {
        themeName: options.theme,
        fonts: fontVars,
        fontFiles: themeMeta.fontFiles,
        fontDir: themeMeta.fontDir
      };
    }
    const isSingleMode = effectiveMode !== "both";
    if (resolvedCSS) {
      css.push({
        content: `@layer quartz-base, obsidian-theme, quartz-themes-base, obsidian-theme-overrides;
@layer obsidian-theme {
${resolvedCSS}
}`,
        inline: true
      });
      css.push({
        content: `@layer quartz-themes-base {
${TEMPLATE_OVERRIDE_CSS}
}`,
        inline: true
      });
    }
    if (isSingleMode) {
      css.push({
        content: `button.darkmode { display: none !important; }
:root { color-scheme: ${effectiveMode}; }
`,
        inline: true
      });
      js.push({
        loadTime: "beforeDOMReady",
        contentType: "inline",
        script: `document.documentElement.setAttribute("saved-theme", "${effectiveMode}");
localStorage.setItem("theme", "${effectiveMode}");`
      });
    }
    if (options.styleSettings) {
      if (styleSettingsId && (!Array.isArray(styleSettingsId) || styleSettingsId.length > 0)) {
        const settings = loadStyleSettings(options.styleSettings);
        const { css: overrideCSS } = processStyleSettings(
          settings,
          styleSettingsId,
          classSettings,
          brokenVarLinks
        );
        if (overrideCSS) {
          css.push({
            content: `@layer obsidian-theme-overrides {
${overrideCSS}
}`,
            inline: true
          });
        }
      } else {
        console.warn(
          `[QuartzTheme] styleSettings provided but theme "${options.theme}" has no Style Settings id. Style Settings overrides will be ignored.`
        );
      }
    }
    cssResources = css;
    jsResources = js;
    return { css, js };
  }
  return {
    name: "QuartzTheme",
    textTransform(_ctx, src) {
      return src;
    },
    externalResources() {
      const { css, js } = buildResources();
      return { css, js, additionalHead: [] };
    }
  };
};

// src/index.ts
console.warn(
  "[quartz-themes] This package is deprecated. Install per-theme packages instead:\n  npm install @quartz-themes/core @quartz-themes/<your-theme>\n  See: https://github.com/quartz-themes/core#migration"
);

export { CALLOUT_ALIASES, CALLOUT_ICON_URIS as CALLOUT_ICON_MAP, CHECKBOX_ICON_URIS as CHECKBOX_ICON_MAP, QuartzTheme, QuartzTheme as QuartzThemes, QuartzTheme as default, generateCalloutIconCSS, generateCheckboxIconCSS, getAvailableThemes, getThemeMeta, loadTheme, QuartzTheme as quartzThemes, registerTheme, resolveCalloutIcon, resolveCheckboxIcon, resolveThemeId, QuartzTheme as transformer };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map