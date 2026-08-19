import { Resend } from 'resend';

const FROM_EMAIL = 'Doerforge by Alex Studio <onboarding@resend.dev>';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  return new Resend(apiKey);
}

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
}

export async function sendVerificationEmail(email: string, token: string) {
  const resend = getResendClient();
  const verifyUrl = `${getAppUrl()}/verify-email?token=${token}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Verify your Doerforge account',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h1 style="font-size: 24px; color: #111827;">Welcome to Doerforge!</h1>
        <p style="color: #4b5563; margin-top: 16px;">Click the button below to verify your email address and start building your ATS-optimized resume.</p>
        <a href="${verifyUrl}" style="display: inline-block; margin-top: 24px; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Verify Email
        </a>
        <p style="color: #9ca3af; margin-top: 24px; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resend = getResendClient();
  const resetUrl = `${getAppUrl()}/reset-password?token=${token}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Reset your Doerforge password',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h1 style="font-size: 24px; color: #111827;">Reset Your Password</h1>
        <p style="color: #4b5563; margin-top: 16px;">Click the button below to reset your password. This link expires in 1 hour.</p>
        <a href="${resetUrl}" style="display: inline-block; margin-top: 24px; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Reset Password
        </a>
        <p style="color: #9ca3af; margin-top: 24px; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  });
}
