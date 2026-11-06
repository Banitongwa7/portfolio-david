// The header every inner page opens with: a tag, the page title and one line.
export default function PageHead({
  tag,
  title,
  text,
  className = "",
}: {
  tag: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`phead ${className}`} aria-labelledby="page-title">
      <div className="wrap">
        <span className="tag">{tag}</span>
        <h1 id="page-title">{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}
