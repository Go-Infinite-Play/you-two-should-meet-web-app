"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── Animation helpers ─── */
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

/* ─── Rotating Bubbe Quotes ─── */
const bubbeQuotes = [
  "You're not getting any younger, darling.",
  "I'm not saying I told you so, but...",
  "Would it kill you to meet someone nice?",
  "My neighbor's son is a DOCTOR.",
  "You'll thank me later.",
  "I just want grandchildren before I die.",
  "What's wrong with a blind date? I met your father that way.",
];

function RotatingQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bubbeQuotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 overflow-hidden sm:h-9">
      {bubbeQuotes.map((quote, i) => (
        <motion.p
          key={quote}
          className="absolute inset-0 font-handwritten text-2xl text-accent sm:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: i === index ? 1 : 0,
            y: i === index ? 0 : -20,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          &ldquo;{quote}&rdquo;
        </motion.p>
      ))}
    </div>
  );
}

/* ─── iMessage Thread ─── */
function TextThread() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const messages = [
    { sender: "mom", text: "Deborah, I met the most wonderful young man at temple today", delay: 0 },
    { sender: "mom", text: "He's a lawyer. Tall. Very respectful to his mother.", delay: 0.3 },
    { sender: "friend", text: "Mom...", delay: 0.8 },
    { sender: "mom", text: "I'm just saying! Mrs. Shapiro's daughter is PERFECT for him", delay: 1.2 },
    { sender: "mom", text: "I already told her I know someone 😏", delay: 1.6 },
    { sender: "friend", text: "You didn't.", delay: 2.2 },
    { sender: "mom", text: "I downloaded the app. It's official.", delay: 2.6 },
    { sender: "mom", text: "You're welcome. 💕", delay: 3.0 },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-sm space-y-2.5 px-2">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: msg.delay, duration: 0.4, ease: "easeOut" }}
          className={`flex ${msg.sender === "mom" ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed shadow-sm ${
              msg.sender === "mom"
                ? "rounded-bl-md bg-[#E9E9EB] text-[#1C1C1E]"
                : "rounded-br-md bg-[#007AFF] text-white"
            }`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Step Card ─── */
function StepCard({
  number,
  title,
  description,
  accent,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease } },
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 sm:p-10">
        {/* Large background number */}
        <span
          className="pointer-events-none absolute -right-2 -top-4 font-display text-[120px] leading-none"
          style={{ color: accent, opacity: 0.06 }}
        >
          {number}
        </span>

        {/* Gold accent line */}
        <div
          className="mb-6 h-1 w-12 rounded-full"
          style={{ background: accent }}
        />

        <h3 className="relative mb-3 font-display text-2xl text-text-primary sm:text-3xl">
          {title}
        </h3>
        <p className="relative text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Apple CTA ─── */
function AppleIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function CTAButton({ large = false }: { large?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex cursor-default items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-primary-deep font-semibold text-white shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30 ${
        large ? "px-10 py-5 text-lg" : "px-8 py-4 text-base"
      }`}
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
      {/* ═══════════════════════════════════════════════════
           HERO — The opening kvetch
         ═══════════════════════════════════════════════════ */}
      <section className="linen-texture relative flex min-h-[94svh] items-center justify-center px-6 py-24">
        {/* Warm background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/12 to-accent/15 blur-[100px]"
            style={{ animation: "blob-drift-1 22s ease-in-out infinite" }}
          />
          <div
            className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-accent-light/20 to-primary/10 blur-[100px]"
            style={{ animation: "blob-drift-2 28s ease-in-out infinite" }}
          />
        </div>

        <motion.div
          className="relative mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Handwritten pre-header */}
          <motion.p
            custom={0}
            variants={fadeUp}
            className="mb-6 font-handwritten text-2xl text-accent sm:text-3xl"
          >
            &ldquo;I know just the person...&rdquo;
          </motion.p>

          {/* Main headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mb-8 font-display text-5xl leading-[1.08] tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-8xl"
          >
            The matchmaking app{" "}
            <em className="bg-gradient-to-r from-primary via-primary to-primary-deep bg-clip-text text-transparent">
              for mothers who
            </em>{" "}
            <em className="bg-gradient-to-r from-primary via-primary to-primary-deep bg-clip-text text-transparent">
              know best.
            </em>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            You Two Should Meet is where Jewish mothers, grandmothers, and
            friends who just <em className="font-medium text-text-primary">know</em>{" "}
            come together to do what they do best — set people up.
            No swiping. No algorithms. Just your good instincts and
            a little <em className="font-medium text-text-primary">chutzpah</em>.
          </motion.p>

          {/* CTA */}
          <motion.div custom={3} variants={fadeUp} className="mb-5">
            <CTAButton large />
          </motion.div>

          <motion.p custom={4} variants={fadeUp} className="text-sm text-text-tertiary">
            Be the first to know when we launch. Your mother would be so proud.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
           ROTATING GUILT TRIP BAR
         ═══════════════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={scrollReveal}
        className="relative overflow-hidden border-y border-accent/20 bg-cream py-10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent/60">
            Things your mother has definitely said
          </p>
          <RotatingQuote />
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════
           THE TEXT THREAD — Show don't tell
         ═══════════════════════════════════════════════════ */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="mb-6 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary/50">
              A true story (more or less)
            </p>
            <h2 className="mb-4 font-display text-4xl text-text-primary sm:text-5xl">
              You know exactly how this goes.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
          >
            <div className="mx-auto max-w-md rounded-[2.5rem] border border-black/10 bg-white p-6 pt-10 shadow-2xl shadow-black/10">
              {/* Phone status bar */}
              <div className="mb-4 flex items-center justify-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent-light text-center text-xs font-bold leading-8 text-white">
                  M
                </div>
                <span className="text-sm font-semibold text-text-primary">Mom</span>
              </div>
              <TextThread />
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={scrollReveal}
            className="mt-10 text-center font-handwritten text-2xl text-accent"
          >
            Now imagine she had an app for this. Terrifying? Maybe. Effective? Absolutely.
          </motion.p>
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-divider mx-auto w-2/3 max-w-md" />

      {/* ═══════════════════════════════════════════════════
           HOW IT WORKS — Three Steps
         ═══════════════════════════════════════════════════ */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent/60">
              How it works
            </p>
            <h2 className="mb-4 font-display text-4xl text-text-primary sm:text-5xl">
              Three steps. Zero swiping.
              <br />
              <span className="font-handwritten text-3xl text-accent sm:text-4xl">
                Endless kvelling.
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            <StepCard
              number="01"
              title="Post someone who's looking"
              description="Know someone single? Post a little about them — their personality, what makes them special. Yes, you can mention they're a doctor. We'd be disappointed if you didn't."
              accent="#D4A574"
              delay={0}
            />
            <StepCard
              number="02"
              title="Browse & suggest a match"
              description="See someone on the feed and think 'I know JUST the person'? Suggest the match. You don't even need to know someone who's looking — just browse and jump in when inspiration strikes."
              accent="#E8636F"
              delay={0.1}
            />
            <StepCard
              number="03"
              title="Both say yes? Mazel tov!"
              description="When two yentas agree on a match, both singles get a text. If they both say yes — everyone gets to kvell. Especially you."
              accent="#C4944A"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           THE PITCH — For the born matchmaker
         ═══════════════════════════════════════════════════ */}
      <section className="linen-texture relative px-6 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-warm-bg/80 via-warm-bg to-warm-bg/80" />

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent/60">
              This app was built for you
            </p>
            <h2 className="mb-6 font-display text-4xl text-text-primary sm:text-5xl">
              You see two people and you just{" "}
              <em className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                know.
              </em>
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-text-secondary">
              You&apos;re the one at every dinner party saying &ldquo;you two should
              meet.&rdquo; You&apos;re the bubbe who has &ldquo;a lovely girl&rdquo; in
              mind for every single boy in the congregation. You&apos;re the friend
              who texts &ldquo;I have someone for you&rdquo; before dessert arrives.
            </p>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={scrollReveal}
            className="grid gap-6 sm:grid-cols-2"
          >
            {[
              {
                icon: "✍️",
                title: "Post your people",
                desc: "Your daughter, your nephew, your neighbor's lovely son who deserves someone wonderful. Tell the world — or at least the other yentas.",
              },
              {
                icon: "💡",
                title: "See a match? Say something!",
                desc: "Scroll the feed. When that lightbulb goes off and you think \"I know JUST the person\" — that's your cue.",
              },
              {
                icon: "🤝",
                title: "Two yentas. One match.",
                desc: "When you and another yenta both agree it's meant to be, both singles get a text. From there, it's bashert.",
              },
              {
                icon: "🏆",
                title: "Climb the leaderboard",
                desc: "The most active yentas earn bragging rights. Finally, competitive matchmaking with stakes your mother-in-law will respect.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-accent/10 bg-white/80 p-7 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
              >
                <span className="mb-4 block text-3xl">{item.icon}</span>
                <h4 className="mb-2 text-lg font-semibold text-text-primary">{item.title}</h4>
                <p className="text-sm leading-relaxed text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           TRUST — Your bubbe raised us right
         ═══════════════════════════════════════════════════ */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary/50">
              Built with mentshlekhkayt
            </p>
            <h2 className="mb-5 font-display text-4xl text-text-primary sm:text-5xl">
              Your bubbe raised us better than that.
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-text-secondary">
              No data selling. No creepy algorithms. No endless scrolling designed
              to keep you hooked. We want you to make a match and kvell about it
              at brunch.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={scrollReveal}
            className="grid gap-5 sm:grid-cols-2"
          >
            {[
              {
                title: "No data selling. Ever.",
                desc: "We don't sell your information. We don't share it with advertisers. We'd never.",
                icon: "🛡️",
              },
              {
                title: "Private by design",
                desc: "Token-based links. No public profiles. No one's browsing your kid's info without a yenta vouching for it.",
                icon: "🔒",
              },
              {
                title: "Singles stay in control",
                desc: "Nobody gets contacted without choosing to. Accept or decline — always their call. We're persistent, not pushy.",
                icon: "💕",
              },
              {
                title: "Built to be deleted",
                desc: "Success means you made a match and put us out of business. We're rooting for that.",
                icon: "✨",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-primary/8 bg-white p-6 shadow-sm"
              >
                <span className="mt-0.5 text-2xl">{item.icon}</span>
                <div>
                  <h4 className="mb-1 font-semibold text-text-primary">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-divider mx-auto w-2/3 max-w-md" />

      {/* ═══════════════════════════════════════════════════
           FINAL CTA — The closer
         ═══════════════════════════════════════════════════ */}
      <section className="linen-texture relative px-6 py-28 sm:py-36">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-accent/[0.03]" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={scrollReveal}
          className="relative mx-auto max-w-2xl text-center"
        >
          <p className="mb-6 font-handwritten text-2xl text-accent sm:text-3xl">
            Nu? What are you waiting for?
          </p>
          <h2 className="mb-6 font-display text-5xl text-text-primary sm:text-6xl">
            Your mother was right.
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-deep bg-clip-text text-transparent">
              She usually is.
            </span>
          </h2>
          <p className="mb-10 text-lg text-text-secondary">
            Be first to know when we launch.
            <br />
            <span className="font-medium text-text-primary">
              She&apos;ll tell everyone at temple either way.
            </span>
          </p>
          <CTAButton large />
        </motion.div>
      </section>
    </div>
  );
}
