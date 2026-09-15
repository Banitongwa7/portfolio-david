import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-700 dark:text-accent-400">
        Error 404
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        {"Sorry, the page you're looking for doesn't exist or has been moved."}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/blog" className="btn btn-secondary">
          Read the blog
        </Link>
      </div>
    </section>
  );
}
