"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ErrorScreen } from "@/components/ui/error-screen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Step =
  | "loading"
  | "error"
  | "pitch"
  | "accepting"
  | "accepted"
  | "mutual_match"
  | "declined"
  | "already_responded";

interface CandidatePageData {
  introduction: {
    id: string;
    matchmaker_name: string;
    candidate_name: string;
    candidate_description: string;
    reason_why_great: string;
    your_description: string;
    candidate_status: string;
    overall_status: string;
  };
  single: {
    first_name: string;
    age: number | null;
    gender: string | null;
    city: string | null;
  };
}

export function CandidateFlow({ token }: { token: string }) {
  const [step, setStep] = useState<Step>("loading");
  const [data, setData] = useState<CandidatePageData | null>(null);
  const [error, setError] = useState("");
  const [connectionId, setConnectionId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/candidate/${token}`);
        if (!res.ok) throw new Error("not found");
        const json = await res.json();
        setData(json);

        // Check if already responded
        if (json.introduction.candidate_status !== "pending") {
          if (json.introduction.overall_status === "mutual_match") {
            setStep("mutual_match");
          } else if (json.introduction.candidate_status === "accepted") {
            setStep("accepted");
          } else {
            setStep("already_responded");
          }
        } else {
          setStep("pitch");
        }
      } catch {
        setError("This link was not found or has expired.");
        setStep("error");
      }
    }
    load();
  }, [token]);

  async function handleAccept() {
    setStep("accepting");
    try {
      const res = await fetch(`/api/candidate/${token}/accept`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to accept");
      const json = await res.json();
      if (json.isMutualMatch) {
        setConnectionId(json.connection?.id || null);
        setStep("mutual_match");
      } else {
        setStep("accepted");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setStep("error");
    }
  }

  async function handleDecline() {
    try {
      await fetch(`/api/candidate/${token}/decline`, { method: "POST" });
      setStep("declined");
    } catch {
      setError("Something went wrong. Please try again.");
      setStep("error");
    }
  }

  if (step === "loading" || step === "accepting") return <LoadingScreen />;
  if (step === "error") return <ErrorScreen message={error} />;
  if (!data) return <LoadingScreen />;

  const { introduction, single } = data;

  // PITCH
  if (step === "pitch") {
    return (
      <div className="mx-auto max-w-md px-6 py-10">
        <Card>
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-peach/10 text-4xl">
              ✨
            </div>
            <h1 className="mb-2 text-2xl font-bold text-text-primary">
              Someone thinks you two should meet!
            </h1>
            <p className="mb-6 text-sm text-text-secondary">
              Written by {introduction.matchmaker_name}, who knows you both
            </p>
          </div>

          {/* About the single */}
          {introduction.your_description && (
            <div className="mb-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-5">
              <p className="mb-2 text-sm font-semibold text-text-tertiary">
                About {single.first_name}
                {single.age ? `, ${single.age}` : ""}
                {single.city ? ` — ${single.city}` : ""}
              </p>
              <p className="text-text-primary leading-relaxed italic">
                &ldquo;{introduction.your_description}&rdquo;
              </p>
            </div>
          )}

          {/* Why they'd be great together */}
          {introduction.reason_why_great && (
            <div className="mb-4 rounded-2xl bg-background p-5">
              <p className="mb-2 text-sm font-semibold text-text-tertiary">
                Why {introduction.matchmaker_name} thinks you&apos;d be great together
              </p>
              <p className="text-text-primary leading-relaxed">
                {introduction.reason_why_great}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <Button onClick={handleAccept} className="w-full">
              I&apos;m Interested! 💕
            </Button>
            <Button variant="secondary" onClick={handleDecline} className="w-full">
              Not Right Now
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ACCEPTED (waiting for single to respond)
  if (step === "accepted") {
    return (
      <div className="mx-auto max-w-md px-6 py-10">
        <Card className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-success/10 to-primary/10 text-4xl">
            💚
          </div>
          <h1 className="mb-3 text-2xl font-bold text-text-primary">You&apos;re interested!</h1>
          <p className="text-text-secondary leading-relaxed">
            We&apos;ll let {single.first_name} know and connect you if it&apos;s mutual.
            Fingers crossed! 🤞
          </p>
        </Card>
      </div>
    );
  }

  // MUTUAL MATCH
  if (step === "mutual_match") {
    return (
      <div className="mx-auto max-w-md px-6 py-10">
        <Card className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-peach/10 text-4xl">
            🎉
          </div>
          <h1 className="mb-3 text-2xl font-bold text-text-primary">It&apos;s a match!</h1>
          <p className="mb-6 text-text-secondary leading-relaxed">
            You and {single.first_name} are both interested! {introduction.matchmaker_name} made it
            happen.
          </p>
          {connectionId && (
            <a
              href={`/connection/${connectionId}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-light px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              See Your Connection 💕
            </a>
          )}
        </Card>
      </div>
    );
  }

  // DECLINED
  if (step === "declined") {
    return (
      <div className="mx-auto max-w-md px-6 py-10">
        <Card className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-background text-4xl">
            👋
          </div>
          <h1 className="mb-3 text-2xl font-bold text-text-primary">No worries!</h1>
          <p className="text-text-secondary leading-relaxed">
            Thanks for checking it out. We respect your decision.
          </p>
        </Card>
      </div>
    );
  }

  // ALREADY RESPONDED
  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <Card className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-background text-4xl">
          ✅
        </div>
        <h1 className="mb-3 text-xl font-bold text-text-primary">
          You&apos;ve already responded
        </h1>
        <p className="text-text-secondary leading-relaxed">
          You&apos;ve already responded to this introduction. Check your texts for updates!
        </p>
      </Card>
    </div>
  );
}
