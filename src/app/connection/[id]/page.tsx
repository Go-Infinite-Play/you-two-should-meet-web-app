import type { Metadata } from "next";
import { ConnectionView } from "./connection-view";

export const metadata: Metadata = {
  title: "It's a Match!",
  description: "You Two Should Meet — your matchmaker connected you with someone special!",
  openGraph: {
    title: "It's a Match! 💕",
    description: "Your matchmaker connected you with someone special!",
  },
};

export default async function ConnectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ConnectionView id={id} />;
}
