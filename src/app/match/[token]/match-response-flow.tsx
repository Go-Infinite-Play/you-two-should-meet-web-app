"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ErrorScreen } from "@/components/ui/error-screen";

type Step =
  | "loading"
  | "error"
  | "pitch"
  | "accepting"
  | "accepted"
  | "mutual_match"
  | "declined"
  | "already_responded";

interface MatchData {
  demo?: boolean;
  other_person_name: string;
  why_great_match: string;
  yenta_name: string;
  person_side: "a" | "b";
  their_status: "pending" | "accepted" | "declined";
  other_status: "pending" | "accepted" | "declined";
  overall_status: "pending" | "matched" | "declined";
  other_phone?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export default function MatchResponseFlow({ token }: { token: string }) {
  const [step, setStep] = useState<Step>("loading");
  const [data, setData] = useState<MatchData | null>(null);
  const [error, setError] = useState("");
  const [otherPhone, setOtherPhone] = useState<string | undefined>();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/match/${token}`);
        if (!res.ok) throw new Error("not found");
        const json: MatchData = await res.json();
        setData(json);

        if (json.other_phone) {
          setOtherPhone(json.other_phone);
        }

        // Determine initial step based on status
        if (json.overall_status === "matched") {
          setStep("mutual_match");
        } else if (json.overall_status === "declined") {
          setStep("already_responded");
        } else if (json.their_status === "accepted") {
          setStep("accepted");
        } else if (json.their_status === "declined") {
          setStep("already_responded");
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
      const res = await fetch(`/api/match/${token}/accept`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to accept");
      const json = await res.json();
      if (json.isMutualMatch) {
        setOtherPhone(json.other_phone);
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
      await fetch(`/api/match/${token}/decline`, { method: "POST" });
      setStep("declined");
    } catch {
      setError("Something went wrong. Please try again.");
      setStep("error");
    }
  }

  if (step === "loading" || step === "accepting") return <LoadingScreen />;
  if (step === "error") return <ErrorScreen message={error} />;
  if (!data) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-6 py-10">
        <AnimatePresence mode="wait">
          {/* PITCH STEP */}
          {step === "pitch" && (
            <motion.div
              key="pitch"
              variants={stagger}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div
                variants={fadeUp}
                className="mb-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    💕
                  </motion.span>
                </div>
                <h1 className="font-display text-3xl leading-tight text-text-primary sm:text-4xl">
                  Two very enthusiastic people think you should meet someone.
                </h1>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-3xl bg-card p-8 shadow-lg"
              >
                <div className="mb-6 text-center">
                  <p className="text-sm font-medium text-text-tertiary">
                    Suggested by {data.yenta_name}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-text-primary">
                    Meet {data.other_person_name}
                  </h2>
                </div>

                {data.why_great_match && (
                  <div className="mb-8 rounded-2xl bg-gradient-to-br from-primary/5 to-peach/10 p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                      Why you&apos;d be great together
                    </p>
                    <p className="text-text-primary leading-relaxed italic">
                      &ldquo;{data.why_great_match}&rdquo;
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAccept}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-primary-light px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
                  >
                    I&apos;m Interested!
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDecline}
                    className="inline-flex items-center justify-center rounded-2xl border-2 border-primary/20 bg-card px-8 py-4 text-lg font-semibold text-text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    Not for Me
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ACCEPTED - waiting for the other person */}
          {step === "accepted" && (
            <motion.div
              key="accepted"
              variants={stagger}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center"
            >
              <motion.div
                variants={fadeUp}
                className="rounded-3xl bg-card p-8 shadow-lg sm:p-10"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-success/10 to-primary/10 text-4xl">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    💚
                  </motion.span>
                </div>
                <h1 className="mb-3 text-2xl font-bold text-text-primary">
                  Wonderful!
                </h1>
                <p className="text-text-secondary leading-relaxed">
                  If {data.other_person_name} says yes too, we&apos;ll connect
                  you both. Fingers crossed!
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* MUTUAL MATCH */}
          {step === "mutual_match" && (
            <motion.div
              key="mutual_match"
              variants={stagger}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center"
            >
              <motion.div
                variants={fadeUp}
                className="rounded-3xl bg-card p-8 shadow-lg sm:p-10"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-peach/10 text-4xl">
                  <motion.span
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    🎉
                  </motion.span>
                </div>
                <motion.h1
                  variants={fadeUp}
                  className="mb-3 font-display text-3xl text-text-primary"
                >
                  Mazel Tov!
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  className="mb-6 text-text-secondary leading-relaxed"
                >
                  You and {data.other_person_name} are both interested!{" "}
                  {data.yenta_name} made it happen.
                </motion.p>

                {otherPhone && (
                  <motion.div
                    variants={fadeUp}
                    className="rounded-2xl bg-gradient-to-br from-primary/5 to-success/5 p-6"
                  >
                    <p className="mb-2 text-sm font-semibold text-text-tertiary">
                      Here&apos;s how to reach {data.other_person_name}
                    </p>
                    <a
                      href={`tel:${otherPhone}`}
                      className="text-2xl font-bold text-primary transition-colors hover:text-primary-light"
                    >
                      {formatPhone(otherPhone)}
                    </a>
                    <p className="mt-3 text-sm text-text-tertiary">
                      Don&apos;t be shy -- say hello!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* DECLINED */}
          {step === "declined" && (
            <motion.div
              key="declined"
              variants={stagger}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center"
            >
              <motion.div
                variants={fadeUp}
                className="rounded-3xl bg-card p-8 shadow-lg sm:p-10"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-background text-4xl">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    👋
                  </motion.span>
                </div>
                <h1 className="mb-3 text-2xl font-bold text-text-primary">
                  No worries at all.
                </h1>
                <p className="text-text-secondary leading-relaxed">
                  We&apos;ll let them know. Thanks for checking it out!
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* ALREADY RESPONDED */}
          {step === "already_responded" && (
            <motion.div
              key="already_responded"
              variants={stagger}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center"
            >
              <motion.div
                variants={fadeUp}
                className="rounded-3xl bg-card p-8 shadow-lg sm:p-10"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-background text-4xl">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    ✅
                  </motion.span>
                </div>
                <h1 className="mb-3 text-xl font-bold text-text-primary">
                  You&apos;ve already responded
                </h1>
                <p className="text-text-secondary leading-relaxed">
                  You&apos;ve already responded to this match. Check your
                  texts for updates!
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
