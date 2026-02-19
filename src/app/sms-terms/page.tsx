import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS Terms & Conditions",
  description:
    "SMS messaging terms, consent, and opt-out information for You Two Should Meet.",
};

export default function SmsTermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <div className="rounded-3xl bg-card p-8 shadow-sm sm:p-12">
        <h1 className="mb-2 text-3xl font-bold text-text-primary sm:text-4xl">
          SMS Terms &amp; Conditions
        </h1>
        <p className="mb-10 text-text-secondary">Last updated: February 19, 2026</p>

        <div className="space-y-8 text-text-primary leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold">Program Name</h2>
            <p>You Two Should Meet</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">What Messages Are About</h2>
            <p>
              You Two Should Meet sends transactional SMS messages to facilitate our
              friend-powered matchmaking service. Messages include:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li>
                <strong className="text-text-primary">Matchmaker invitations:</strong> when
                a user invites a friend to be their matchmaker, the friend receives a text
                with a link to participate
              </li>
              <li>
                <strong className="text-text-primary">Match candidate notifications:</strong>{" "}
                when a matchmaker recommends someone, the candidate receives a text with a
                link to see the introduction
              </li>
              <li>
                <strong className="text-text-primary">Mutual match alerts:</strong> when both
                people say yes, they are notified that a connection has been made
              </li>
            </ul>
            <p className="mt-3">
              No marketing or promotional messages are sent. All messages are triggered by
              in-app user actions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Consent &amp; Opt-In</h2>
            <p>
              Users provide their mobile phone number during account registration and
              explicitly consent to receive SMS messages by checking an opt-in checkbox. The
              opt-in checkbox includes the following language:
            </p>
            <div className="mt-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-text-primary italic">
                &ldquo;By checking this box, you agree to receive SMS messages from You Two
                Should Meet related to your matchmaking activity. Message frequency varies.
                Message and data rates may apply. Reply STOP to opt out at any time. See our{" "}
                <span className="text-primary underline">Terms of Service</span> and{" "}
                <span className="text-primary underline">Privacy Policy</span>.&rdquo;
              </p>
            </div>
            <p className="mt-3">
              For matchmakers and match candidates who receive messages initiated by a user,
              each initial SMS clearly identifies the sender (You Two Should Meet), explains
              why they are receiving the message, and includes opt-out instructions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Message Frequency</h2>
            <p>
              Message frequency varies based on user activity but will not exceed 5 messages
              per month. Messages are only sent when triggered by specific in-app actions
              (e.g., a friend invites you as a matchmaker, or a matchmaker recommends you as
              a match).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Message &amp; Data Rates</h2>
            <p>
              Message and data rates may apply. Please contact your wireless carrier for
              details about your messaging plan.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">How to Opt Out</h2>
            <p>
              You can opt out of SMS messages at any time by replying <strong>STOP</strong> to
              any message from You Two Should Meet. You will receive a one-time confirmation
              message. After opting out, you will no longer receive SMS messages from us unless
              you re-subscribe.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Help</h2>
            <p>
              Reply <strong>HELP</strong> to any message for assistance, or contact us at{" "}
              <a
                href="mailto:support@youtwoshouldmeet.app"
                className="text-primary hover:underline"
              >
                support@youtwoshouldmeet.app
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Data Privacy</h2>
            <p>
              Mobile information collected as part of the SMS opt-in process will not be shared
              with or sold to third parties or affiliates for marketing or promotional purposes.
            </p>
            <p className="mt-3">
              For full details on how we handle your data, see our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Related Policies</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <a
                href="/terms"
                className="text-primary hover:underline"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Contact Us</h2>
            <div className="rounded-2xl bg-background p-4">
              <p className="font-semibold">You Two Should Meet</p>
              <p className="text-text-secondary">
                Email:{" "}
                <a
                  href="mailto:support@youtwoshouldmeet.app"
                  className="text-primary hover:underline"
                >
                  support@youtwoshouldmeet.app
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
