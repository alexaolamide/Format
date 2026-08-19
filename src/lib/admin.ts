import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function getAdminContext() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  const email = session?.user?.email?.toLowerCase();
  const configuredAdmins = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (!userId || !email || !configuredAdmins.includes(email)) {
    return null;
  }

  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
  if (!user) return null;

  if (user.role !== 'admin') {
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { role: 'admin', updatedAt: new Date() } }
    );
  }

  return { session, user, db };
}