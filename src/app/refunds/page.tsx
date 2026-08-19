import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Refund Policy | Doerforge',
  description: 'Refund and payment support policy for Doerforge Telegram Stars purchases.',
};

export default function RefundsPage() {
  return <LegalPage eyebrow="Payments" title="Refund Policy" intro="Doerforge uses Telegram Stars for paid tool access. This policy explains how payment issues and refund requests are handled." updated="August 19, 2026" sections={[
    { title: 'How purchases work', body: ['A paid tool is unlocked after Telegram confirms the successful payment event. Telegram handles the payment transaction and may apply its own platform rules.'] },
    { title: 'Refund requests', body: ['If a tool was charged but access was not granted, contact support@doerforge.com with your Doerforge account email, Telegram username or ID, tool name, date, and Telegram payment charge ID if available. Do not send passwords or private payment credentials.', 'We review duplicate charges, technical failures, accidental purchases, and cases where a paid tool could not be used because of a verified service error.'] },
    { title: 'Non-refundable situations', body: ['We generally cannot refund a tool after it has been used successfully, or for dissatisfaction with AI-generated content where the tool operated as described. You are encouraged to review results before using them in important decisions.'] },
    { title: 'Resolution', body: ['Approved refunds or corrections are handled through the available Telegram payment process or an account entitlement correction. We aim to respond to support requests within seven business days.'] },
  ]} />;
}
