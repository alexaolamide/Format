export function getAppUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
  return /^https?:\/\//i.test(configuredUrl) ? configuredUrl : `https://${configuredUrl}`;
}