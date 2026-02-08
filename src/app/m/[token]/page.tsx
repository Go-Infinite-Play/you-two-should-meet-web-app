import type { Metadata } from "next";
import { MatchmakerFlow } from "./matchmaker-flow";

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

export default async function MatchmakerPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <MatchmakerFlow token={token} />;
}
