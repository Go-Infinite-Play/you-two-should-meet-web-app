import type { Metadata } from "next";
import { CandidateFlow } from "./candidate-flow";

export const metadata: Metadata = {
  title: "Someone Thinks You'd Be a Great Match!",
  description:
    "Someone who knows you thinks you'd be perfect for a friend of theirs. Open this link to find out more.",
  openGraph: {
    title: "Someone Thinks You'd Be a Great Match! 💕",
    description:
      "Someone who knows you thinks you'd be perfect for a friend of theirs. Open this link to find out more.",
  },
};

export default async function CandidatePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <CandidateFlow token={token} />;
}
