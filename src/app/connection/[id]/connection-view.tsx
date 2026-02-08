"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ErrorScreen } from "@/components/ui/error-screen";
import { Card } from "@/components/ui/card";
import { formatPhoneDisplay } from "@/lib/format-phone";

interface ConnectionData {
  connection: {
    id: string;
    match_name: string;
    match_phone: string;
    matchmaker_name: string;
    single_id: string;
  };
  single: {
    first_name: string;
    phone: string | null;
  };
}

export function ConnectionView({ id }: { id: string }) {
  const [data, setData] = useState<ConnectionData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/connection/${id}`);
        if (!res.ok) throw new Error("not found");
        const json = await res.json();
        setData(json);
      } catch {
        setError("This connection was not found.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (!data) return <LoadingScreen />;

  const { connection, single } = data;

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <Card className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-peach/10 text-5xl">
          🎉
        </div>
        <h1 className="mb-2 text-3xl font-bold text-text-primary">It&apos;s a match!</h1>
        <p className="mb-8 text-text-secondary">
          Brought together by {connection.matchmaker_name} 💕
        </p>

        {/* Phone exchange */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-peach/5 p-5">
            <p className="mb-1 text-sm font-medium text-text-tertiary">{single.first_name}</p>
            {single.phone && (
              <a
                href={`sms:${single.phone}`}
                className="text-xl font-semibold text-primary hover:underline"
              >
                {formatPhoneDisplay(single.phone)}
              </a>
            )}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 p-5">
            <p className="mb-1 text-sm font-medium text-text-tertiary">{connection.match_name}</p>
            <a
              href={`sms:${connection.match_phone}`}
              className="text-xl font-semibold text-primary hover:underline"
            >
              {formatPhoneDisplay(connection.match_phone)}
            </a>
          </div>
        </div>

        <p className="mt-8 text-text-secondary leading-relaxed">
          Send them a text and say hi! Your matchmaker {connection.matchmaker_name} made this
          happen.
        </p>
      </Card>
    </div>
  );
}
