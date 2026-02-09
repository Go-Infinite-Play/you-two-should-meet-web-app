"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ErrorScreen } from "@/components/ui/error-screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { formatPhoneDisplay, isValidUSPhone } from "@/lib/format-phone";
import type { MatchmakerData } from "@/lib/types";

type Step = "loading" | "error" | "landing" | "form" | "submitting" | "success";
type FormStep = 1 | 2 | 3;

interface FormData {
  candidate_name: string;
  candidate_phone: string;
  candidate_description: string;
  reason_why_great: string;
  your_description: string;
}

export function MatchmakerFlow({ token }: { token: string }) {
  const [step, setStep] = useState<Step>("loading");
  const [formStep, setFormStep] = useState<FormStep>(1);
  const [data, setData] = useState<MatchmakerData | null>(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    candidate_name: "",
    candidate_phone: "",
    candidate_description: "",
    reason_why_great: "",
    your_description: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/matchmaker/${token}`);
        if (!res.ok) throw new Error("not found");
        const json = await res.json();
        setData(json);

        if (json.assignment.status === "found_someone") {
          setStep("success");
        } else {
          setStep("landing");
        }

        // Fire "opened" event (fire-and-forget)
        fetch(`/api/matchmaker/${token}/open`, { method: "POST" });
      } catch {
        setError("This invitation was not found or has expired.");
        setStep("error");
      }
    }
    load();
  }, [token]);

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handlePhoneChange(value: string) {
    const formatted = formatPhoneDisplay(value);
    updateField("candidate_phone", formatted);
  }

  function startForm() {
    setStep("form");
    fetch(`/api/matchmaker/${token}/looking`, { method: "POST" });
  }

  function validateStep1(): boolean {
    const errors: Partial<FormData> = {};
    if (!formData.candidate_name.trim()) {
      errors.candidate_name = "Please enter their name";
    }
    if (!isValidUSPhone(formData.candidate_phone)) {
      errors.candidate_phone = "Please enter a valid phone number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validateStep2(): boolean {
    const errors: Partial<FormData> = {};
    if (!formData.candidate_description.trim()) {
      errors.candidate_description = "Tell us a little about them";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function nextFormStep() {
    if (formStep === 1 && validateStep1()) {
      setFormStep(2);
    } else if (formStep === 2 && validateStep2()) {
      setFormStep(3);
    }
  }

  async function handleSubmit() {
    setStep("submitting");
    try {
      const res = await fetch(`/api/matchmaker/${token}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          matchmaker_phone: assignment.matchmaker_phone,
        }),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to submit");
      }
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("error");
    }
  }

  if (step === "loading" || step === "submitting") return <LoadingScreen />;
  if (step === "error") return <ErrorScreen message={error} />;
  if (!data) return <LoadingScreen />;

  const { assignment, single, profile } = data;
  const singleName = single.first_name;

  // LANDING STEP
  if (step === "landing") {
    return (
      <div className="mx-auto max-w-md px-6 py-10">
        <Card>
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-4xl">
              🤝
            </div>
            <h1 className="mb-2 text-2xl font-bold text-text-primary">
              Hey {assignment.matchmaker_name}!
            </h1>
            <p className="mb-6 text-text-secondary leading-relaxed">
              {singleName} picked you as a matchmaker — they trust you to find them someone great.
            </p>
          </div>

          {/* What they're looking for */}
          <div className="mb-6 rounded-2xl bg-background p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-tertiary">
              What {singleName} is looking for
            </h2>
            <div className="space-y-2 text-text-primary">
              {profile.interested_in && (
                <p>
                  <span className="text-text-secondary">Interested in:</span>{" "}
                  {profile.interested_in}
                </p>
              )}
              {profile.age_range_min && profile.age_range_max && (
                <p>
                  <span className="text-text-secondary">Age range:</span>{" "}
                  {profile.age_range_min}–{profile.age_range_max}
                </p>
              )}
              {profile.preference_tags?.length > 0 && (
                <div>
                  <span className="text-text-secondary">Qualities they value:</span>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {profile.preference_tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {profile.dealbreaker_tags?.length > 0 && (
                <div>
                  <span className="text-text-secondary">Dealbreakers:</span>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {profile.dealbreaker_tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-error/10 px-3 py-1 text-sm text-error"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {assignment.personal_note && (
            <div className="mb-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-5">
              <p className="text-sm font-medium text-text-secondary">
                Note from {singleName}:
              </p>
              <p className="mt-1 text-text-primary italic">
                &ldquo;{assignment.personal_note}&rdquo;
              </p>
            </div>
          )}

          <Button onClick={startForm} className="w-full">
            I Know Someone! ✨
          </Button>
        </Card>
      </div>
    );
  }

  // FORM STEP
  if (step === "form") {
    return (
      <div className="mx-auto max-w-md px-6 py-10">
        <Card>
          {/* Progress indicator */}
          <div className="mb-6 flex items-center gap-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  n <= formStep
                    ? "bg-gradient-to-r from-primary to-primary-light"
                    : "bg-primary/10"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Who are you thinking of? */}
          {formStep === 1 && (
            <div>
              <h2 className="mb-1 text-xl font-bold text-text-primary">
                Who are you thinking of?
              </h2>
              <p className="mb-6 text-text-secondary">
                Someone you think {singleName} would really like.
              </p>

              <div className="space-y-4">
                <Input
                  label="Their first name"
                  placeholder="e.g. Sarah"
                  value={formData.candidate_name}
                  onChange={(e) => updateField("candidate_name", e.target.value)}
                  error={formErrors.candidate_name}
                  autoComplete="given-name"
                />
                <Input
                  label="Their phone number"
                  placeholder="(555) 123-4567"
                  value={formData.candidate_phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  error={formErrors.candidate_phone}
                  inputMode="tel"
                  autoComplete="tel"
                />
                <p className="text-sm text-text-tertiary">
                  We&apos;ll send them a friendly text with your recommendation. They won&apos;t see
                  your number.
                </p>
              </div>

              <div className="mt-8">
                <Button onClick={nextFormStep} className="w-full">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: The pitch */}
          {formStep === 2 && (
            <div>
              <h2 className="mb-1 text-xl font-bold text-text-primary">
                Tell us about {formData.candidate_name || "them"}
              </h2>
              <p className="mb-6 text-text-secondary">
                This is what {formData.candidate_name || "they"}&apos;ll see about themselves, and
                why you think they&apos;d be great for {singleName}.
              </p>

              <div className="space-y-4">
                <Textarea
                  label={`Describe ${formData.candidate_name || "them"}`}
                  hint="What are they like? What makes them special?"
                  placeholder="They're kind, funny, and always the person everyone wants to sit next to at dinner..."
                  value={formData.candidate_description}
                  onChange={(e) => updateField("candidate_description", e.target.value)}
                  error={formErrors.candidate_description}
                />
                <Textarea
                  label={`Why would they be great for ${singleName}?`}
                  placeholder="They both love hiking, have the same sense of humor, and I've always thought they'd hit it off..."
                  value={formData.reason_why_great}
                  onChange={(e) => updateField("reason_why_great", e.target.value)}
                />
                <Textarea
                  label={`How would you describe ${singleName} to ${formData.candidate_name || "them"}?`}
                  hint={`This is what ${formData.candidate_name || "they"} will see about ${singleName}.`}
                  placeholder={`${singleName} is one of my favorite people — warm, driven, and always up for an adventure...`}
                  value={formData.your_description}
                  onChange={(e) => updateField("your_description", e.target.value)}
                />
              </div>

              <div className="mt-8 flex gap-3">
                <Button variant="ghost" onClick={() => setFormStep(1)}>
                  Back
                </Button>
                <Button onClick={nextFormStep} className="flex-1">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {formStep === 3 && (
            <div>
              <h2 className="mb-1 text-xl font-bold text-text-primary">
                Review your recommendation
              </h2>
              <p className="mb-6 text-text-secondary">
                Make sure everything looks good before sending.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl bg-background p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-tertiary">Recommending</p>
                    <button
                      onClick={() => setFormStep(1)}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="mt-1 font-semibold text-text-primary">
                    {formData.candidate_name}
                  </p>
                  <p className="text-sm text-text-secondary">{formData.candidate_phone}</p>
                </div>

                <div className="rounded-2xl bg-background p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-tertiary">About them</p>
                    <button
                      onClick={() => setFormStep(2)}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="mt-1 text-text-primary">{formData.candidate_description}</p>
                </div>

                {formData.reason_why_great && (
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm font-medium text-text-tertiary">
                      Why they&apos;d be great together
                    </p>
                    <p className="mt-1 text-text-primary">{formData.reason_why_great}</p>
                  </div>
                )}

                {formData.your_description && (
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm font-medium text-text-tertiary">
                      About {singleName} (shown to {formData.candidate_name})
                    </p>
                    <p className="mt-1 text-text-primary">{formData.your_description}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-3">
                <Button variant="ghost" onClick={() => setFormStep(2)}>
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Send Introduction 💕
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-text-tertiary">
                We&apos;ll text {formData.candidate_name} with a link to see your recommendation.
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // SUCCESS STEP
  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <Card className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-peach/10 text-4xl">
          🎉
        </div>
        <h1 className="mb-3 text-2xl font-bold text-text-primary">
          You&apos;re an amazing friend!
        </h1>
        <p className="mb-6 text-text-secondary leading-relaxed">
          Your recommendation has been sent. We&apos;ll let you know what happens next.
        </p>
        <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-5">
          <p className="text-sm text-text-secondary">
            {singleName} is lucky to have a friend like you, {assignment.matchmaker_name}. 💕
          </p>
        </div>
      </Card>
    </div>
  );
}
