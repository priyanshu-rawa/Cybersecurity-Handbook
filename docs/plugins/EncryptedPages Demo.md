---
title: Encrypted Pages Demo
password: quartz
unlisted: true
tags:
  - plugin/transformer
image:
---

Congratulations! You've successfully decrypted this page. 🎉

This is a live demo of the [[EncryptedPages]] plugin. The content you're reading was encrypted at build time using AES-256-GCM and decrypted in your browser using the Web Crypto API. This page is also `unlisted: true`, which means it was hidden from every discovery surface on the site until you entered the password.

## What just happened?

1. At build time, the plugin read the `password` field from this page's frontmatter and encrypted all content below the title.
2. Because this page is `unlisted: true`, the plugin emitted its metadata (slug, title, links, tags) to a separate `static/encryptedContentIndex.json` file, encrypted with this page's own password.
3. When you visited this page, you were shown a password prompt instead of the content. The page was absent from the sidebar graph, explorer, search, RSS, sitemap, backlinks, tag listings, and bases views.
4. After entering the correct password, the plugin derived an encryption key using PBKDF2 and decrypted the content client-side.
5. The plugin then used the cached password to unlock this page's entry in the shadow content index and patched the in-memory content index in place. A `content-index-updated` event was dispatched, so graph, explorer, and search re-initialized with the newly unlocked entry — if you navigate back to any other page now, you will see this page in the sidebar, the graph, and search results. Server-side rendered listings (backlinks, recent notes, tag pages, folder listings, and [[BasesPage|bases views]]) were baked into HTML at build time and will not update within this session; they will only reflect decrypted pages on a fresh build of the site.

## Password caching

Your password has been cached in session storage. If there were other encrypted pages on this site with the same password, the plugin would automatically try this password on each one — unlocking its content as well as its entry in the shadow content index — so you'd only need to enter it once per session.

## Try it yourself

To add encrypted pages to your own Quartz site, install the plugin and add a `password` field to any page's frontmatter. See [[EncryptedPages]] for full setup instructions.
