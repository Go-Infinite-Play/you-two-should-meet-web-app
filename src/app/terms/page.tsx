import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for You Two Should Meet — rules and guidelines for using our service.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <div className="rounded-3xl bg-card p-8 shadow-sm sm:p-12">
        <h1 className="mb-2 text-3xl font-bold text-text-primary sm:text-4xl">Terms &amp; Conditions</h1>
        <p className="mb-10 text-text-secondary">Last updated: February 8, 2026</p>

        <div className="space-y-8 text-text-primary leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the You Two Should Meet mobile application and website
              (collectively, the &quot;Service&quot;), you agree to be bound by these Terms and Conditions
              (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service.
            </p>
            <p className="mt-3">
              The Service is operated by You Two Should Meet, a US-based sole proprietorship (&quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. Eligibility</h2>
            <p>
              You must be at least <strong>18 years of age</strong> to use the Service. By using the
              Service, you represent and warrant that you are at least 18 years old and have the legal
              capacity to enter into these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. Description of Service</h2>
            <p>
              You Two Should Meet is a matchmaking platform where friends (&quot;matchmakers&quot;) help connect
              singles with potential matches (&quot;match candidates&quot;). The Service includes:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li>A mobile application for singles to create profiles and invite matchmakers</li>
              <li>A web interface for matchmakers to propose match candidates</li>
              <li>A web interface for match candidates to view and respond to recommendations</li>
              <li>SMS notifications to facilitate the matching process</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. SMS Terms</h2>
            <div className="rounded-2xl bg-background p-5">
              <p><strong>Program name:</strong> You Two Should Meet</p>
              <p className="mt-2">
                <strong>Message frequency:</strong> You may receive up to 5 SMS messages per month
                related to matchmaking activity, account verification, and notifications.
              </p>
              <p className="mt-2">
                <strong>Message and data rates may apply.</strong> Please check with your wireless
                carrier for details on your messaging plan.
              </p>
              <p className="mt-2">
                <strong>Opt-out:</strong> Reply <strong>STOP</strong> to any message to unsubscribe from
                SMS communications. You will receive a one-time confirmation message. After opting out,
                you will no longer receive SMS messages from us unless you re-subscribe.
              </p>
              <p className="mt-2">
                <strong>Help:</strong> Reply <strong>HELP</strong> to any message for support, or
                email us at{" "}
                <a href="mailto:support@youtwoshouldmeet.app" className="text-primary hover:underline">
                  support@youtwoshouldmeet.app
                </a>.
              </p>
              <p className="mt-2">
                <strong>Supported carriers:</strong> Major US carriers are supported, including
                AT&amp;T, Verizon, T-Mobile, Sprint, and others.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li>Create a fake or misleading profile</li>
              <li>Impersonate any person or entity</li>
              <li>Harass, abuse, threaten, or intimidate other users</li>
              <li>Use the Service for any unlawful purpose</li>
              <li>Send spam, unsolicited messages, or promotional material through the Service</li>
              <li>Attempt to access another user&apos;s account without authorization</li>
              <li>Use automated means (bots, scrapers) to access the Service</li>
              <li>Interfere with or disrupt the Service or its servers</li>
              <li>Upload harmful content including malware, viruses, or other malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">6. No Harassment Policy</h2>
            <p>
              We have a zero-tolerance policy for harassment. Any user found to be engaging in
              harassment, hate speech, discrimination, stalking, or abusive behavior will have their
              account immediately terminated. This includes but is not limited to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li>Sending threatening or abusive messages</li>
              <li>Continuing to contact someone who has declined a match</li>
              <li>Sharing personal information about other users without consent</li>
              <li>Discriminatory behavior based on race, ethnicity, religion, gender, sexual orientation, disability, or any other protected characteristic</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time, with or without
              notice, for any reason, including but not limited to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
              <li>Violation of these Terms</li>
              <li>Harassment or abuse of other users</li>
              <li>Creation of fake profiles</li>
              <li>Any conduct we determine to be harmful to other users or the Service</li>
            </ul>
            <p className="mt-3">
              You may also delete your account at any time by contacting us at{" "}
              <a href="mailto:support@youtwoshouldmeet.app" className="text-primary hover:underline">
                support@youtwoshouldmeet.app
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">8. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by
              You Two Should Meet and are protected by copyright, trademark, and other intellectual
              property laws. You may not reproduce, distribute, modify, or create derivative works of
              any part of the Service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">9. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES
              OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE
              UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </p>
            <p className="mt-3">
              We do not guarantee that you will find a match or that matches will lead to successful
              relationships. The Service is a platform to facilitate introductions; the outcome of any
              introduction is beyond our control.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, YOU TWO SHOULD MEET AND ITS OWNER,
              EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA,
              USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
            </p>
            <p className="mt-3">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT
              EXCEED THE AMOUNT YOU PAID US, IF ANY, IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless You Two Should Meet, its owner, employees, and
              agents from and against any claims, damages, losses, liabilities, and expenses (including
              reasonable attorneys&apos; fees) arising out of or related to your use of the Service or
              your violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              United States, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">13. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes by
              posting the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued
              use of the Service after any changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">14. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us at:</p>
            <div className="mt-3 rounded-2xl bg-background p-4">
              <p className="font-semibold">You Two Should Meet</p>
              <p className="text-text-secondary">
                Email:{" "}
                <a href="mailto:support@youtwoshouldmeet.app" className="text-primary hover:underline">
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
