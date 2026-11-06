import { describe, expect, it } from "vitest";
import { cleanArticleHtml } from "@/utils/articleHtml";

describe("cleanArticleHtml", () => {
  it("removes scripts, event handlers and javascript: links", () => {
    const html = cleanArticleHtml(
      '<p>Hi<script>alert(1)</script></p><img src="https://x.test/a.png" onerror="alert(2)"><a href="javascript:alert(3)">x</a>'
    );
    expect(html).not.toMatch(/script|onerror|javascript:/i);
    expect(html).toContain('<img src="https://x.test/a.png" />');
  });

  it("keeps what the articles use: headings, highlighted code, images, tables, callouts", () => {
    const source =
      '<h2 id="intro">Intro</h2>' +
      '<pre><code class="lang-js"><span class="hljs-string">"hi"</span></code></pre>' +
      '<img src="https://cdn.hashnode.com/a.png" alt="Diagram" class="image--center mx-auto" style="display:block;margin:0 auto" />' +
      '<div class="hn-table"><table><thead><tr><td>A</td></tr></thead></table></div>' +
      '<div data-node-type="callout"><div data-node-type="callout-text">Note</div></div>' +
      '<ol start="3"><li>Third</li></ol>';
    const html = cleanArticleHtml(source);
    expect(html).toContain('<h2 id="intro">Intro</h2>');
    expect(html).toContain('<span class="hljs-string">"hi"</span>');
    expect(html).toContain('alt="Diagram"');
    expect(html).toContain('style="display:block;margin:0 auto"');
    expect(html).toContain('<div class="hn-table"><table>');
    expect(html).toContain('data-node-type="callout-text"');
    expect(html).toContain('<ol start="3">');
  });

  it("adds rel=noopener to links opening a new tab", () => {
    expect(cleanArticleHtml('<a href="https://x.test" target="_blank">x</a>')).toContain('rel="noopener noreferrer"');
  });

  it("keeps video embeds from known hosts only", () => {
    expect(cleanArticleHtml('<iframe src="https://www.youtube.com/embed/abc"></iframe>')).toContain("youtube.com/embed/abc");
    expect(cleanArticleHtml('<iframe src="https://evil.test/x"></iframe>')).not.toContain("evil.test");
  });
});
