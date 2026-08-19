import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Doerforge',
  description: 'How Doerforge by Alex Studio collects, uses, and protects information.',
};

export default function PrivacyPage() {
  return <LegalPage eyebrow="Doerforge by Alex Studio" title="Privacy Policy" intro="This policy explains what information Doerforge collects, why we use it, and the choices available to you when you use our AI workspace." updated="August 19, 2026" sections={[
    { title: 'Information we collect', body: ['We collect account information such as your name, email address, authentication details, and account preferences. We collect the content you choose to submit to a tool, including resumes, job descriptions, notes, prompts, and generated outputs.', 'We also collect technical information needed to operate the service, such as device and browser information, security logs, feature usage, and payment event identifiers from Telegram.'] },
    { title: 'How we use information', body: ['We use information to create and secure accounts, provide requested tool results, save your documents, process usage limits, prevent abuse, provide support, and improve reliability.', 'Submitted content is sent to our configured AI provider only when needed to produce the result you request. We do not sell personal information.'] },
    { title: 'Telegram Stars payments', body: ['Payments are processed by Telegram. Doerforge receives payment confirmation and limited transaction information needed to grant access, prevent duplicate processing, and provide support. Doerforge does not receive your Telegram payment credentials.'] },
    { title: 'Storage and security', body: ['Account and document data is stored in our configured MongoDB service. We use authenticated server routes and access checks to separate user data. No online service can guarantee absolute security, so please avoid submitting secrets or highly sensitive information.'] },
    { title: 'Your choices', body: ['You can request access to, correction of, or deletion of your account data by contacting support. Deleting your account removes your saved documents and tool outputs from the active database, subject to legally required records and secure backups.'] },
    { title: 'Children and changes', body: ['Doerforge is not intended for children under 13. We may update this policy as the product changes. The date above identifies the latest version.'] },
  ]} />;
}
