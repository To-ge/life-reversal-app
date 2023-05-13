import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type ClientType = {
  clientId: string;
  clientSecret: string;
};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    } as ClientType),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      const updatedSession = {
        ...session,
        user: {
          id: token.sub,
          ...session.user,
        },
      };
      return updatedSession;
    },
    async signIn({ user, account, profile }) {
      const provider = account?.provider;
      const uid = user.id;
      const name = user.name;
      const email = user.email;
      try {
        const response = await axios.post(`${apiUrl}/auth/login`, {
          provider,
          uid,
          name,
          email,
        });
        if (response.status === 200) {
          console.log(response.data);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("error", error);
        return false;
      }
    },
  },
});
