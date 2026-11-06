import sanitizeHtml from "sanitize-html";

// Article bodies come from the Hashnode feed and are injected into the page,
// so they are cleaned first: if the feed ever carried a script or an inline
// event handler (a compromised account, an embed gone wrong), it would run
// on this domain. The allow-list matches what the articles actually use:
// text, links, images, highlighted code, tables, callouts.
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "iframe"],
  allowedAttributes: {
    "*": ["id", "class", "data-node-type", "lang", "dir"],
    a: ["href", "name", "target", "rel", "title"],
    img: ["src", "alt", "title", "width", "height", "loading", "style"],
    ol: ["start", "reversed", "type"],
    td: ["colspan", "rowspan", "align"],
    th: ["colspan", "rowspan", "align", "scope"],
    iframe: ["src", "width", "height", "title", "allow", "allowfullscreen", "loading"],
  },
  // Images are centred with an inline style in the feed; nothing else is kept.
  allowedStyles: {
    img: {
      display: [/^block$/],
      margin: [/^[\d\s.%a-z-]+$/],
    },
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: { img: ["https", "http"] },
  // Video and code embeds only, should an article ever include one.
  allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com", "codepen.io", "codesandbox.io"],
  transformTags: {
    // Links opening a new tab can't reach back into this page.
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.target === "_blank" ? { ...attribs, rel: "noopener noreferrer" } : attribs,
    }),
  },
};

export function cleanArticleHtml(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}
