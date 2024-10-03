import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from '@utils/database';

function generateRandomNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

async function generateUniqueUsername(baseUsername) {
  let newUsername = baseUsername;
  let userExists = await User.findOne({ username: newUsername });

  while (userExists) {
    const randomNumber = generateRandomNumber();
    newUsername = `${baseUsername}${randomNumber}`;
    userExists = await User.findOne({ username: newUsername });
  }

  return newUsername;
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          
          const baseUsername = profile.name.replace(" ", "").toLowerCase();
          const uniqueUsername = await generateUniqueUsername(baseUsername);

          const newUser = await User.create({
            email: profile.email,
            username: uniqueUsername,
            image: profile.picture,
          });
          console.log("New user created: ", newUser);
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
