import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faLock,
  faCodeBranch,
  faRocket,
} from "@fortawesome/free-solid-svg-icons"

const POINTS = [
  { icon: faCodeBranch, text: "Commit langsung ke repo dari browser" },
  { icon: faRocket, text: "Trigger deploy Vercel tanpa buka dashboard lain" },
]

export function Hero() {
  return (
    <section className="mx-auto max-w-2xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
      <h1
        data-aos="fade-up"
        className="text-3xl font-semibold leading-tight tracking-tight text-textPrimary dark:text-darkTextPrimary sm:text-4xl"
      >
        Dashboard pribadi untuk GitHub &amp; Vercel
      </h1>
      <p
        data-aos="fade-up"
        data-aos-delay="60"
        className="mt-4 text-base text-textSecondary dark:text-darkTextSecondary"
      >
        Satu layar untuk melihat statistik akun, mengunggah file ke repo, dan memicu deploy — memakai token milikmu sendiri.
      </p>

      <div data-aos="fade-up" data-aos-delay="120" className="mt-8">
        <Link
          href="/auth"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-primaryHover"
        >
          Go
          <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
        </Link>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-textMuted">
          <FontAwesomeIcon icon={faLock} className="h-3 w-3" />
          Token tidak pernah meninggalkan browser ini
        </p>
      </div>

      <div data-aos="fade-up" data-aos-delay="180" className="mt-12 space-y-3 border-t border-border pt-6 dark:border-darkBorder">
        {POINTS.map((point) => (
          <div key={point.text} className="flex items-center gap-2.5 text-sm text-textSecondary dark:text-darkTextSecondary">
            <FontAwesomeIcon icon={point.icon} className="h-3.5 w-3.5 text-primary" />
            {point.text}
          </div>
        ))}
      </div>
    </section>
  )
}
