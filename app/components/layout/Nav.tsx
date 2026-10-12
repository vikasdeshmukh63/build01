import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xs font-mono tracking-widest uppercase text-slate-500">
            B01
          </span>
          <span className="text-lg font-bold tracking-tight">Build01</span>
        </Link>

        {/* Primary navigation */}
        <nav aria-label="Primary navigation">
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li>
              <Link href="/agent-os">Agent OS</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Primary CTA */}
        <Link
          href="/contact"
          className="text-sm font-medium px-4 py-2 border border-current rounded"
        >
          Get in Touch ↗
        </Link>
      </div>
    </header>
  );
}
