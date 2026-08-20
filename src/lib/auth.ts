import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from './mongodb';

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const providers = [
  ...(googleClientId && googleClientSecret
    ? [GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        allowDangerousEmailAccountLinking: true,
      })]
    : []),
  CredentialsProvider({
    name: 'Email',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ email: credentials.email.toLowerCase().trim() });

      if (!user || !user.password) {
        return null;
      }

      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (!isValid) {
        return null;
      }

      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role || 'user',
      };
    },
  }),
];

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { db } = await connectToDatabase();
        const existingUser = await db.collection('users').findOne({ email: user.email?.toLowerCase().trim() });

        if (!existingUser) {
          await db.collection('users').insertOne({
            email: user.email?.toLowerCase().trim(),
            name: user.name,
            image: user.image,
            plan: 'free',
            role: 'user',
            creditsRemaining: 3,
            dailyCreditsRemaining: 10,
            purchasedCredits: 0,
            dailyCreditsResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        const { db } = await connectToDatabase();
        const dbUser = await db.collection('users').findOne({ email: session.user.email?.toLowerCase().trim() });

        if (dbUser) {
          (session.user as any).id = dbUser._id.toString();
          (session.user as any).plan = dbUser.plan;
          (session.user as any).creditsRemaining = dbUser.creditsRemaining;
          (session.user as any).role = dbUser.role || 'user';
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
