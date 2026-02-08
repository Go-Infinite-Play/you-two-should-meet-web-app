import Link from "next/link";

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Step({
  number,
  title,
  description,
  icon,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-3xl">
        {icon}
      </div>
      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-xs font-bold text-white">
        {number}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
      <p className="max-w-xs text-text-secondary">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-primary/10 to-peach/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-primary shadow-sm">
            <HeartIcon className="h-4 w-4" />
            <span>The anti-dating app</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            Your friends know you{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              better than an algorithm
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-text-secondary">
            Stop swiping. Let the people who actually know and love you find someone great.
            You Two Should Meet is where your friends play matchmaker — because they&apos;ve been
            dying to set you up anyway.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-light px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on the App Store
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
              How it works
            </h2>
            <p className="text-lg text-text-secondary">
              Three simple steps. Zero awkward swiping.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            <Step
              number={1}
              icon="📱"
              title="Sign up & invite matchmakers"
              description="Download the app, tell us what you're looking for, and invite the friends who know you best."
            />
            <Step
              number={2}
              icon="🤝"
              title="Your friends find someone great"
              description="Your matchmakers think of someone perfect for you and send them a personal recommendation."
            />
            <Step
              number={3}
              icon="✨"
              title="Both say yes → you connect"
              description="If you both like what you see, you're introduced. Real connections, powered by real friendships."
            />
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 px-8 py-12 text-center sm:px-16 sm:py-16">
            <h2 className="mb-6 text-3xl font-bold text-text-primary sm:text-4xl">
              Built on trust, not tricks
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Dating apps optimize for engagement — we optimize for real connections.
              No endless swiping, no gamification, no dark patterns.
              Just friends who care about you, finding someone they genuinely think you&apos;d love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["No swiping", "No algorithms", "No ads", "Friends-first"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-card px-5 py-2 text-sm font-medium text-text-primary shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-lg text-text-secondary">
            Ready to let your friends do what they do best?
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-light px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Get the App
          </a>
        </div>
      </section>
    </div>
  );
}
