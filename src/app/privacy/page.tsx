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
        <p className="mb-10 text-text-secondary">Last updated: February 28, 2026</p>

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
              <li><strong className="text-text-primary">Yenta account information:</strong> your name, email, and phone number when you register as a Yenta</li>
              <li><strong className="text-text-primary">Looking posts:</strong> information about a single person you know, including their first name, age, a brief description, and their phone number</li>
              <li><strong className="text-text-primary">Match suggestions:</strong> when you suggest a match between your single and another Yenta&apos;s single</li>
              <li><strong className="text-text-primary">Match responses:</strong> approvals or declinations of match suggestions from other Yentas, and responses from singles who receive match notifications</li>
            </ul>

            <h3 className="mb-2 mt-4 font-semibold text-text-primary">2.2 Information Provided on Behalf of Others</h3>
            <p>
              Yentas provide personal information about singles they know, including names, ages,
              descriptions, and phone numbers, when creating looking posts and match suggestions.
              By providing this information, you represent that you have the consent of the individual
              to share their information with the Service for matchmaking purposes. We only use this
              information to facilitate the matchmaking process and to contact singles via SMS when a
              match has been approved by both Yentas.
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
              <li>Display looking posts in the Yenta matchmaking feed so other Yentas can browse and suggest matches</li>
              <li>Process match suggestions between Yentas and facilitate the approval flow</li>
              <li>Send SMS messages via Twilio to singles when a match is approved by both Yentas, and when both singles accept (mutual match alert)</li>
              <li>Communicate with Yentas about their account and matchmaking activity through the web application</li>
              <li>Improve and develop new features for the Service</li>
              <li>Ensure safety and security of the platform</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. SMS Communications</h2>
            <p>
              Our Service uses Twilio to send SMS messages. Messages are sent exclusively to singles
              whose information has been provided by a Yenta. Yentas interact with the Service through
              the web application and do not receive SMS messages. Messages are sent to singles in the
              following circumstances:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li><strong className="text-text-primary">Match notifications:</strong> when two Yentas agree on a match, both singles receive an SMS with a link to view and respond to the match suggestion</li>
              <li><strong className="text-text-primary">Mutual match alerts:</strong> when both singles accept a match, they are notified via SMS that a connection has been made</li>
              <li><strong className="text-text-primary">Verification:</strong> for phone number verification when a Yenta first adds a single to the Service</li>
            </ul>
            <p className="mt-3">
              Mobile information collected as part of the SMS opt-in process will not be shared with
              or sold to third parties or affiliates for marketing or promotional purposes.
            </p>
            <p className="mt-3">
              Message frequency varies but will not exceed 5 messages per month. Message and data rates
              may apply. Singles can opt out of SMS messages at any time by replying STOP to any message.
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
              <li><strong className="text-text-primary">With other users as part of the matching process:</strong> Yentas see looking posts from other Yentas in the matchmaking feed; singles see the description provided by their Yenta and the match suggestion details when contacted via SMS</li>
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
