import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top row: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex flex-col leading-none mb-3">
              <span className="text-xs font-mono tracking-widest uppercase text-slate-500">
                B01
              </span>
              <span className="text-lg font-bold tracking-tight">Build01</span>
            </Link>
            <p className="text-sm font-semibold mb-1">
              AI Products. Built for Work.
            </p>
            <p className="text-sm text-slate-500">
              Building intelligent products for practical business needs.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-mono tracking-widest uppercase mb-4">
              Explore
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/agent-os">Agent OS</Link>
              </li>
              <li>
                <Link href="/about">About Build01</Link>
              </li>
              {/* Insights link — enable once page is live */}
              {/* <li><Link href="/insights">Insights</Link></li> */}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-mono tracking-widest uppercase mb-4">
              Connect
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <a
                  href="https://github.com/vikasdeshmukh63/AgentOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub (AgentOS) ↗
                </a>
              </li>
              {/* Add LinkedIn URL and business email once confirmed */}
              {/* <li><a href="https://linkedin.com/company/build01" target="_blank" rel="noopener noreferrer">LinkedIn</a></li> */}
              {/* <li><a href="mailto:hello@build01.com">hello@build01.com</a></li> */}
            </ul>
          </div>
        </div>

        {/* Bottom row: copyright + legal */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-black/10 text-xs text-slate-500">
          <p>© 2026 Build01. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy">Privacy</Link>
            {/* Terms link — enable once page is live */}
            {/* <Link href="/terms">Terms</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
