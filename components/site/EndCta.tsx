import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import AllLinks from "@/data/AllLinks";

// The dark closing band of an inner page. By default it offers the two
// site-wide actions: start a project (the services form) or send a message.
export default function EndCta({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="end" aria-labelledby="end-title">
      <div>
        <h2 id="end-title">{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-row">
        {children ?? (
          <>
            <a className="btn btn-neon" href={AllLinks.needService} target="_blank" rel="noopener noreferrer">
              Start a project<span className="sr"> (opens in a new tab)</span>
              <span className="ic">
                <HiArrowUpRight aria-hidden="true" />
              </span>
            </a>
            <Link className="btn btn-glass" href="/contact">
              Send a message
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
