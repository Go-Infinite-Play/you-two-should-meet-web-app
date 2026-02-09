"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ErrorScreen } from "@/components/ui/error-screen";

interface InviteData {
  matchmakerName: string;
  singleName: string;
  relationship: string | null;
}

export function SingleInviteFlow({ token }: { token: string }) {
  const [data, setData] = useState<InviteData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/single-invite/${token}`);
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || "Something went wrong");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen message={error || "Invitation not found"} />;

  const relationshipText = data.relationship
    ? `Your ${data.relationship.toLowerCase()}, ${data.matchmakerName},`
    : `${data.matchmakerName}`;

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      {/* Hero card */}
      <Card className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-peach/10 text-4xl">
          💕
        </div>

        <h1 className="mb-3 text-2xl font-bold text-text-primary">
          {relationshipText} wants to find you someone amazing!
        </h1>

        <p className="mb-6 leading-relaxed text-text-secondary">
          {data.matchmakerName} signed up on <strong>You Two Should Meet</strong> to
          help you find the right person. They&apos;ll be looking for great matches
          and making introductions on your behalf.
        </p>

        <div className="mb-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-5">
          <p className="mb-3 text-sm font-semibold text-text-primary">
            How it works
          </p>
          <div className="space-y-3 text-left text-sm text-text-secondary">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                1
              </span>
              <span>{data.matchmakerName} thinks of someone perfect for you</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                2
              </span>
              <span>You get to read their pitch and decide if you&apos;re interested</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                3
              </span>
              <span>If it&apos;s mutual, you get each other&apos;s numbers!</span>
            </div>
          </div>
        </div>

        {/* Download CTA */}
        <a
          href="https://apps.apple.com"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download the App
        </a>

        <p className="mt-4 text-xs text-text-tertiary">
          Add your preferences so {data.matchmakerName} can find your perfect match
        </p>
      </Card>
    </div>
  );
}
