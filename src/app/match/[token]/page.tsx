import type { Metadata } from "next";
import MatchResponseFlow from "./match-response-flow";

export const metadata: Metadata = {
  title: "Someone Wants You to Meet Someone Special!",
  description:
    "Two very enthusiastic people think you should meet someone. Tap here to find out more.",
  openGraph: {
    title: "Someone Wants You to Meet Someone Special!",
    description:
      "Two very enthusiastic people think you should meet someone. Tap here to find out more.",
  },
};

export default async function MatchPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <MatchResponseFlow token={token} />;
}
