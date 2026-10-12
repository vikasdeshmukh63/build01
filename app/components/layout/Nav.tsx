import Link from "next/link";

export default function Nav() {
  return (
    <header className="site-nav">
      <Link className="site-nav__cta" href="/contact">
        Contact <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
