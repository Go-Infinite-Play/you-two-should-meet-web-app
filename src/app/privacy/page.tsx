import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for You Two Should Meet — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <div className="rounded-3xl bg-card p-8 shadow-sm sm:p-12">
        <h1 className="mb-2 text-3xl font-bold text-text-primary sm:text-4xl">Privacy Policy</h1>
        <p className="mb-10 text-text-secondary">Last updated: February 8, 2026</p>

        <div className="space-y-8 text-text-primary leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to You Two Should Meet (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are a US-based sole proprietorship
              that operates the You Two Should Meet mobile application and website (collectively, the &quot;Service&quot;).
              This Privacy Policy explains how we collect, use, disclose, and protect your personal
              information when you use our Service.
            </p>
            <p className="mt-3">
              By using our Service, you agree to the collection and use of information in accordance
              with this Privacy Policy. If you do not agree with this policy, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. Information We Collect</h2>

            <h3 className="mb-2 mt-4 font-semibold text-text-primary">2.1 Information You Provide Directly</h3>
            <p>When you create an account or use our Service, you may provide us with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li><strong className="text-text-primary">Account information:</strong> your name, age, gender, and phone number</li>
              <li><strong className="text-text-primary">Dating preferences:</strong> who you&apos;re interested in (gender preferences), preferred age range, qualities you value, and dealbreakers</li>
              <li><strong className="text-text-primary">Matchmaker nominations:</strong> when you invite friends to be your matchmakers</li>
              <li><strong className="text-text-primary">Match responses:</strong> your decisions when accepting or declining potential matches</li>
            </ul>

            <h3 className="mb-2 mt-4 font-semibold text-text-primary">2.2 Device Contacts</h3>
            <p>
              With your explicit permission, we access your device&apos;s contact list solely to help you
              select and invite friends as matchmakers. We only access contacts when you initiate this
              action, and we do not store your entire contact list. We only retain the contact
              information of individuals you specifically choose to invite.
            </p>

            <h3 className="mb-2 mt-4 font-semibold text-text-primary">2.3 Automatically Collected Information</h3>
            <p>When you use our Service, we may automatically collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li>Device type, operating system, and version</li>
              <li>Usage data (features used, interactions with the Service)</li>
              <li>IP address and approximate location (city-level)</li>
              <li>App crash reports and performance data</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li>Provide, operate, and maintain our Service</li>
              <li>Facilitate matches between users through their matchmakers</li>
              <li>Send SMS messages via Twilio to matchmakers and match candidates on your behalf</li>
              <li>Communicate with you about your account and the Service</li>
              <li>Improve and develop new features for the Service</li>
              <li>Ensure safety and security of the platform</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. SMS Communications</h2>
            <p>
              Our Service uses Twilio to send SMS messages. Messages are sent to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li><strong className="text-text-primary">Matchmakers:</strong> when a friend invites them to help find a match</li>
              <li><strong className="text-text-primary">Match candidates:</strong> when a matchmaker recommends them as a potential match</li>
              <li><strong className="text-text-primary">Users:</strong> for account verification and match notifications</li>
            </ul>
            <p className="mt-3">
              Message frequency varies but will not exceed 5 messages per month. Message and data rates
              may apply. You can opt out of SMS messages at any time by replying STOP to any message.
              Reply HELP for assistance or contact us at{" "}
              <a href="mailto:support@youtwoshouldmeet.app" className="text-primary hover:underline">
                support@youtwoshouldmeet.app
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. Data Storage and Security</h2>
            <p>
              Your data is stored securely using Supabase, hosted in the United States. We implement
              appropriate technical and organizational security measures to protect your personal
              information, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li>Encryption of data in transit (TLS/SSL) and at rest</li>
              <li>Access controls and authentication requirements</li>
              <li>Regular security reviews and updates</li>
              <li>Secure token-based authentication for web links</li>
            </ul>
            <p className="mt-3">
              While we strive to protect your personal information, no method of transmission over
              the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">6. Data Sharing and Disclosure</h2>
            <p className="font-semibold">We do NOT sell your personal data to third parties.</p>
            <p className="mt-2 font-semibold">We do NOT use your data for advertising purposes.</p>
            <p className="mt-3">We may share your information only in the following limited circumstances:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li><strong className="text-text-primary">With other users as part of the matching process:</strong> matchmakers see limited profile information to facilitate matches; match candidates see the pitch their matchmaker wrote</li>
              <li><strong className="text-text-primary">Service providers:</strong> we use Twilio for SMS delivery and Supabase for data storage. These providers are bound by their own privacy policies and data processing agreements</li>
              <li><strong className="text-text-primary">Legal requirements:</strong> we may disclose information if required by law, legal process, or government request</li>
              <li><strong className="text-text-primary">Safety:</strong> to protect the rights, safety, or property of our users or the public</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li><strong className="text-text-primary">Access your data:</strong> request a copy of the personal information we hold about you</li>
              <li><strong className="text-text-primary">Correct your data:</strong> update or correct inaccurate personal information</li>
              <li><strong className="text-text-primary">Delete your data:</strong> request deletion of your personal information and account</li>
              <li><strong className="text-text-primary">Opt out of SMS:</strong> reply STOP to any text message to unsubscribe</li>
              <li><strong className="text-text-primary">Withdraw consent:</strong> revoke contact access permissions through your device settings</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:privacy@youtwoshouldmeet.app" className="text-primary hover:underline">
                privacy@youtwoshouldmeet.app
              </a>.
              We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">8. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to
              provide you with the Service. If you request account deletion, we will delete your personal
              information within 30 days, except where we are required to retain it for legal or
              legitimate business purposes (such as resolving disputes or enforcing our agreements).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">9. Children&apos;s Privacy</h2>
            <p>
              Our Service is not intended for anyone under the age of 18. We do not knowingly collect
              personal information from children under 18. If we become aware that we have collected
              personal information from a child under 18, we will take steps to delete that information
              promptly.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material
              changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot;
              date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">11. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
            <div className="mt-3 rounded-2xl bg-background p-4">
              <p className="font-semibold">You Two Should Meet</p>
              <p className="text-text-secondary">
                Email:{" "}
                <a href="mailto:privacy@youtwoshouldmeet.app" className="text-primary hover:underline">
                  privacy@youtwoshouldmeet.app
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
