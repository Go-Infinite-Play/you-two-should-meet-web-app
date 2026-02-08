import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You've Been Invited to Be a Matchmaker!",
  description:
    "A friend thinks you'd be a great matchmaker. Open this link to help them find someone special.",
  openGraph: {
    title: "You've Been Invited to Be a Matchmaker! 💕",
    description:
      "A friend thinks you'd be a great matchmaker. Open this link to help them find someone special.",
  },
};

export default function MatchmakerPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <div className="rounded-3xl bg-card p-8 shadow-sm sm:p-10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-4xl">
            🤝
          </div>
          <h1 className="mb-3 text-2xl font-bold text-text-primary">
            You&apos;ve been invited to be a matchmaker!
          </h1>
          <p className="mb-6 text-text-secondary leading-relaxed">
            A friend trusts you to help find them someone great.
            This feature is launching soon — we&apos;ll text you when it&apos;s ready.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-primary-light/10 px-5 py-2.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Coming Soon
          </div>
        </div>
        <p className="mt-6 text-sm text-text-tertiary">
          💕 You Two Should Meet — your friends know you better than an algorithm.
        </p>
      </div>
    </div>
  );
}
