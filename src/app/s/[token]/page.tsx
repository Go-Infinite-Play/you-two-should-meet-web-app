import type { Metadata } from "next";
import { SingleInviteFlow } from "./single-invite-flow";

export const metadata: Metadata = {
  title: "Someone's Looking Out for You!",
  description:
    "A friend signed up to help you find someone great on You Two Should Meet.",
  openGraph: {
    title: "Someone's Looking Out for You! 💕",
    description:
      "A friend signed up to help you find someone great on You Two Should Meet.",
  },
};

export default async function SingleInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <SingleInviteFlow token={token} />;
}
