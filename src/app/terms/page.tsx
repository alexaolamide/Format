import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | Doerforge',
  description: 'Terms for using Doerforge by Alex Studio.',
};

export default function TermsPage() {
  return <LegalPage eyebrow="Doerforge by Alex Studio" title="Terms of Service" intro="These terms govern your use of Doerforge, a practical AI workspace for career, business, creative, productivity, and learning tasks." updated="August 19, 2026" sections={[
    { title: 'Using Doerforge', body: ['You may use Doerforge only for lawful purposes and only as permitted by these terms. You are responsible for keeping your account credentials private and for activity performed through your account.', 'You must not use the service to impersonate another person, upload malicious content, abuse AI providers, interfere with the service, or violate another person\'s rights.'] },
    { title: 'AI-generated content', body: ['Doerforge provides drafting and organization assistance. AI output can be incomplete, inaccurate, or unsuitable for your situation. You are responsible for reviewing, editing, and verifying every result before relying on it.', 'Do not treat career, business, education, legal, financial, or other generated content as professional advice.'] },
    { title: 'Your content', body: ['You retain ownership of content you submit and results generated for you, subject to the rights of any third-party material you include. You grant Doerforge permission to process that content only to provide and secure the service.'] },
    { title: 'Paid tools and access', body: ['Some tools may require Telegram Stars. Access is granted after Telegram confirms a successful payment. Purchased access is tied to the account and tool identified in the payment record and is not transferable unless we state otherwise.'] },
    { title: 'Availability and changes', body: ['We may change, suspend, or discontinue features as Doerforge develops. We aim to keep the service reliable but do not promise uninterrupted availability or a particular result from any AI tool.'] },
    { title: 'Termination and liability', body: ['We may suspend accounts that create security, legal, or operational risk. To the maximum extent permitted by law, Doerforge is provided as-is and Alex Studio is not liable for indirect losses arising from your use of generated content or service interruptions.'] },
  ]} />;
}
