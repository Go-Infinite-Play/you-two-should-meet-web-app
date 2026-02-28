"use client";

import { motion } from "framer-motion";

/* ─── Animation variants ─── */
const ease = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scrollReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

/* ─── Inline SVG Icons ─── */
function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function HeartHandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

/* ─── Inline Illustrations ─── */
function PhoneIllustration() {
  return (
    <svg viewBox="0 0 80 100" fill="none" className="h-24 w-auto opacity-80">
      <rect x="12" y="4" width="56" height="92" rx="12" stroke="#E8636F" strokeWidth="2" fill="#FBF7F4" />
      <rect x="18" y="14" width="44" height="62" rx="4" fill="#fff" />
      <circle cx="40" cy="86" r="4" stroke="#E8636F" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="9" r="2" fill="#F2949B" />
      {/* Heart notification */}
      <rect x="46" y="8" width="24" height="18" rx="9" fill="#E8636F" />
      <path d="M58 13.5l-.9-.8C55.2 11.2 54 10.2 54 9.2 54 8.4 54.6 7.8 55.4 7.8c.4 0 .9.2 1.2.5.3-.3.7-.5 1.2-.5.8 0 1.4.6 1.4 1.4 0 1-1.2 2-3 3.6l-.2.2z" fill="white" transform="translate(0, 6)" />
      <text x="52" y="22" textAnchor="middle" fill="white" fontSize="5" fontWeight="600">+3</text>
    </svg>
  );
}

function MessageIllustration() {
  return (
    <svg viewBox="0 0 120 70" fill="none" className="h-16 w-auto opacity-80">
      {/* Speech bubble */}
      <rect x="4" y="4" width="112" height="50" rx="16" fill="white" stroke="#E8636F" strokeWidth="1.5" />
      <polygon points="24,54 32,64 40,54" fill="white" stroke="#E8636F" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="24" y1="54" x2="40" y2="54" stroke="white" strokeWidth="3" />
      {/* Italic text lines */}
      <rect x="16" y="16" width="60" height="4" rx="2" fill="#F2949B" opacity="0.6" transform="rotate(-1, 16, 16)" />
      <rect x="16" y="26" width="80" height="4" rx="2" fill="#FBBF8A" opacity="0.5" transform="rotate(-1, 16, 26)" />
      <rect x="16" y="36" width="50" height="4" rx="2" fill="#F2949B" opacity="0.4" transform="rotate(-1, 16, 36)" />
    </svg>
  );
}

function ConnectionIllustration() {
  return (
    <svg viewBox="0 0 100 60" fill="none" className="h-16 w-auto opacity-80">
      {/* Two overlapping circles (avatars) */}
      <circle cx="36" cy="30" r="20" fill="#F2949B" opacity="0.7" />
      <circle cx="64" cy="30" r="20" fill="#FBBF8A" opacity="0.7" />
      {/* Heart in overlap */}
      <path d="M50 38l-1-.9C46.2 34.7 44 32.7 44 30.5c0-1.6 1.2-2.8 2.8-2.8.8 0 1.6.4 2.2 1 .6-.6 1.4-1 2.2-1 1.6 0 2.8 1.2 2.8 2.8 0 2.2-2.2 4.2-5 6.5l-1 .9z" fill="#E8636F" />
    </svg>
  );
}

/* ─── CTA Button ─── */
function CTAButton() {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex cursor-default items-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
    >
      <AppleIcon />
      Coming Soon to iOS
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-[92svh] items-center justify-center px-6 py-20">
        {/* Animated background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/15 to-peach/20 blur-3xl"
            style={{ animation: "blob-drift-1 20s ease-in-out infinite" }}
          />
          <div
            className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-accent/10 to-primary/15 blur-3xl"
            style={{ animation: "blob-drift-2 25s ease-in-out infinite" }}
          />
          <div
            className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-br from-peach/10 to-primary-light/10 blur-3xl"
            style={{ animation: "blob-drift-1 30s ease-in-out infinite reverse" }}
          />
        </div>

        {/* Decorative floating hearts */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <HeartIcon
            className="absolute right-[15%] top-[18%] h-5 w-5 text-primary/15"
          />
          <HeartIcon
            className="absolute left-[12%] top-[35%] h-4 w-4 text-peach/30"
          />
          <HeartIcon
            className="absolute bottom-[25%] right-[22%] h-6 w-6 text-primary-light/20"
          />
        </div>

        <motion.div
          className="relative mx-auto max-w-2xl text-center md:max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div custom={0} variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/60 px-5 py-2.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md">
              <HeartIcon className="h-3.5 w-3.5" />
              The matchmaking app for mothers who know best
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mb-6 font-display text-5xl leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl"
          >
            You know someone
            <br />
            perfect for someone.{" "}
            <em className="bg-gradient-to-r from-primary to-primary-light bg-clip-text pr-2 text-transparent">
              We&apos;ll help you make the introduction.
            </em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            You Too Should Meet is where mothers, grandmothers, and friends
            who just KNOW come to play matchmaker. No profiles. No swiping.
            Just your good instincts.
          </motion.p>

          {/* CTA */}
          <motion.div custom={3} variants={fadeUp} className="mb-4">
            <CTAButton />
          </motion.div>

          <motion.p custom={4} variants={fadeUp} className="text-sm text-text-tertiary">
            Be first to know when we launch
          </motion.p>
        </motion.div>
      </section>

      {/* ═══ SOCIAL PROOF BAR ═══ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={scrollReveal}
        className="border-y border-primary/10 bg-card/50"
      >
        <div className="mx-auto grid max-w-4xl grid-cols-1 divide-y divide-primary/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { stat: "100%", label: "Mother-approved" },
            { stat: "0", label: "Algorithms" },
            { stat: "\u2665", label: "Powered by love (and a little guilt)" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 px-6 py-8">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-display text-4xl text-transparent">
                {item.stat}
              </span>
              <span className="text-sm font-medium text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══ HOW IT WORKS — BENTO GRID ═══ */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
              How it works
            </p>
            <h2 className="font-display text-4xl text-text-primary sm:text-5xl">
              Three steps. Zero swiping.
            </h2>
          </motion.div>

          {/* Bento grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Step 1 — tall card, spans 2 rows */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={scrollReveal}
              className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-8 shadow-lg backdrop-blur-sm sm:row-span-2 sm:p-10"
            >
              <span className="absolute right-6 top-4 font-display text-8xl text-primary/[0.07]">01</span>
              <div className="relative">
                <div className="mb-5">
                  <PhoneIllustration />
                </div>
                <h3 className="mb-3 font-display text-2xl text-text-primary">
                  Post someone who&apos;s looking
                </h3>
                <p className="text-base leading-relaxed text-text-secondary">
                  Know someone who&apos;s single? Post a little about them &mdash;
                  their personality, what they&apos;re looking for, what makes them
                  special. (Yes, you can mention they&apos;re a doctor.)
                </p>
              </div>
            </motion.div>

            {/* Step 2 — wide card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.7, ease } },
              }}
              className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-8 shadow-lg backdrop-blur-sm"
            >
              <span className="absolute right-6 top-4 font-display text-8xl text-primary/[0.07]">02</span>
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <MessageIllustration />
                </div>
                <div>
                  <h3 className="mb-2 font-display text-2xl text-text-primary">
                    Browse and suggest matches
                  </h3>
                  <p className="text-base leading-relaxed text-text-secondary">
                    See someone on the feed and immediately think &ldquo;I know
                    JUST the person&rdquo;? That&apos;s your cue. Suggest the match
                    and let the magic happen.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 3 — wide card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.7, ease } },
              }}
              className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-8 shadow-lg backdrop-blur-sm"
            >
              <span className="absolute right-6 top-4 font-display text-8xl text-primary/[0.07]">03</span>
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <ConnectionIllustration />
                </div>
                <div>
                  <h3 className="mb-2 font-display text-2xl text-text-primary">
                    Both say yes, mazel tov!
                  </h3>
                  <p className="text-base leading-relaxed text-text-secondary">
                    When two yentas agree on a match, both singles get a text.
                    If they both say yes &mdash; everyone gets to kvell.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ THE STORY — Before / After / Bridge ═══ */}
      <section className="relative px-6 py-20 sm:py-28">
        {/* Subtle background shift */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

        <div className="relative mx-auto max-w-3xl">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="mb-16 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary/60"
          >
            Nu? You know the feeling.
          </motion.p>

          {/* Decorative connecting line (desktop) */}
          <div className="pointer-events-none absolute bottom-20 left-1/2 top-28 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/10 via-primary/20 to-primary/5 sm:block" />

          {/* BEFORE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="relative mb-20 text-center"
          >
            <h3 className="mb-6 font-display text-3xl text-text-primary sm:text-4xl">
              Every mother has said it.
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-text-secondary">
              You&apos;re at temple, or brunch, or your weekly call, and you
              hear someone&apos;s kid is single. And you IMMEDIATELY think of
              someone perfect. You can see it so clearly. The only problem?
              There&apos;s no good way to make it happen.
            </p>
            {/* Crossed-out cliches */}
            <div className="flex flex-wrap justify-center gap-3">
              {["Swipe right", "It's a match!", "Ghosted again", "Still on the apps"].map((text) => (
                <span
                  key={text}
                  className="rounded-full bg-text-primary/[0.04] px-4 py-2 text-sm text-text-tertiary line-through decoration-primary/40 decoration-2"
                >
                  {text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="relative mb-20 text-center"
          >
            <h3 className="mb-6 font-display text-3xl text-text-primary sm:text-4xl">
              But what if you could just say...
            </h3>
            {/* iMessage bubble */}
            <div className="mb-8 flex justify-center">
              <div className="relative inline-block rotate-1 transform">
                <div className="rounded-2xl bg-gradient-to-br from-[#34C759] to-[#2DB84D] px-6 py-3.5 shadow-lg shadow-[#34C759]/20">
                  <p className="text-base font-medium text-white sm:text-lg">
                    &ldquo;I know JUST the person for your David!&rdquo;
                  </p>
                </div>
                {/* Bubble tail */}
                <div className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 transform rounded-sm bg-[#2DB84D]" />
              </div>
            </div>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-text-secondary">
              That instinct you have? The one where you just{" "}
              <em className="text-text-primary">know</em> two people belong together?
              That&apos;s what we built an app for.
            </p>
          </motion.div>

          {/* BRIDGE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="relative rounded-3xl bg-gradient-to-br from-primary/[0.04] to-peach/[0.06] p-8 text-center sm:p-12"
          >
            <h3 className="mb-6 font-display text-3xl sm:text-4xl">
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                That instinct? That&apos;s what we built an app for.
              </span>
            </h3>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-text-secondary">
              You Too Should Meet turns your matchmaking instincts into actual
              introductions. Post someone who&apos;s looking, suggest a match for
              someone else, or just browse and wait for that &ldquo;AHA!&rdquo; moment.
              <br /><br />
              <span className="font-medium text-text-primary">
                No swiping. No algorithms. Just mothers, grandmothers, and friends
                who know a bashert when they see one.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ MATCHMAKER SECTION ═══ */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent/60">
              Born to set people up?
            </p>
            <h2 className="mb-5 font-display text-4xl text-text-primary sm:text-5xl">
              Some people just <em className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">know</em>
              <br />who belongs together
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-text-secondary">
              If you&apos;re the bubbe who&apos;s always got someone in mind, the mother
              who sees connections others miss, the friend who says &ldquo;you two
              should meet&rdquo; at every dinner party &mdash; this app was built for you.
              You don&apos;t even need to have someone specific. Just browse and help others.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={scrollReveal}
            className="rounded-3xl bg-gradient-to-br from-accent/20 to-primary/15 p-px shadow-2xl shadow-accent/5"
          >
            <div className="rounded-3xl bg-card p-8 sm:p-10">
              <div className="grid gap-8 sm:grid-cols-3">
                {[
                  {
                    emoji: "\uD83D\uDCDD",
                    title: "Post your people",
                    desc: "Tell us who you want to set up \u2014 your daughter, your nephew, your neighbor\u2019s lovely son who deserves someone wonderful.",
                  },
                  {
                    emoji: "\uD83D\uDCA1",
                    title: "Suggest matches",
                    desc: "See someone on the feed and think \u201CI know JUST the person\u201D? Suggest the match. We handle the rest.",
                  },
                  {
                    emoji: "\uD83C\uDF89",
                    title: "Celebrate the wins",
                    desc: "When your match leads to a date \u2014 or a wedding \u2014 everyone gets to kvell. Especially you.",
                  },
                ].map((step) => (
                  <div key={step.title} className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 text-2xl">
                      {step.emoji}
                    </div>
                    <h4 className="mb-2 font-semibold text-text-primary">{step.title}</h4>
                    <p className="text-sm leading-relaxed text-text-secondary">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <CTAButton />
                <p className="mt-3 text-sm text-text-tertiary">
                  Join the yenta circle and start making matches
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST / PRIVACY ═══ */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
              Built different
            </p>
            <h2 className="mb-5 font-display text-4xl text-text-primary sm:text-5xl">
              Your trust is the whole point
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-text-secondary">
              We don&apos;t want you scrolling forever. We want you to make a
              match and kvell about it at brunch. That&apos;s not just a tagline
              &mdash; it&apos;s how we built this.
            </p>
          </motion.div>

          {/* Gradient-bordered card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={scrollReveal}
            className="rounded-3xl bg-gradient-to-br from-primary/20 to-accent/15 p-px shadow-2xl shadow-primary/5"
          >
            <div className="rounded-3xl bg-card p-8 sm:p-10">
              <div className="grid gap-8 sm:grid-cols-2">
                {[
                  {
                    icon: <ShieldIcon className="h-6 w-6 text-primary" />,
                    title: "No data selling",
                    desc: "We\u2019d never. Your bubbe raised us better than that.",
                  },
                  {
                    icon: <LockIcon className="h-6 w-6 text-primary" />,
                    title: "Private by design",
                    desc: "Token-based links. No public profiles. What happens in the app stays in the app.",
                  },
                  {
                    icon: <HeartHandIcon className="h-6 w-6 text-primary" />,
                    title: "Singles stay in control",
                    desc: "Nobody gets contacted without a chance to say yes or no. We\u2019re persistent, not pushy.",
                  },
                  {
                    icon: <SparklesIcon className="h-6 w-6 text-primary" />,
                    title: "Built to be deleted",
                    desc: "Success means you made a match. We\u2019re rooting for everyone.",
                  },
                ].map((badge) => (
                  <div key={badge.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                      {badge.icon}
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-text-primary">{badge.title}</h4>
                      <p className="text-sm leading-relaxed text-text-secondary">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative px-6 py-20 sm:py-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />

        {/* Floating decorative hearts */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <HeartIcon
            className="absolute left-[18%] top-[20%] h-5 w-5 text-primary/10"
          />
          <HeartIcon
            className="absolute bottom-[30%] right-[15%] h-4 w-4 text-peach/20"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={scrollReveal}
          className="relative mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-5 font-display text-4xl text-text-primary sm:text-5xl">
            Your mother was right.
            <br />She usually is.
          </h2>
          <p className="mb-10 text-lg text-text-secondary">
            Be first to know when we launch.
          </p>
          <CTAButton />
        </motion.div>
      </section>
    </div>
  );
}
