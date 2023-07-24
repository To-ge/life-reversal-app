import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "utils/axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type ClientType = {
  clientId: string;
  clientSecret: string;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text", placeholder: "ユーザー名" },
        email: { label: "email", type: "text", placeholder: "メールアドレス" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        const { name, email, password } = credentials as {
          name: string;
          email: string;
          password: string;
        };
        if (email) {
          return { name, email, password };
        } else {
          return false;
        }
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    } as ClientType),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const updatedSession = {
        ...session,
        user: {
          user_id: token.sub,
          ...session.user,
        },
      };
      return updatedSession;
    },
    async signIn({ user, account, profile, credentials }) {
      console.log(credentials);
      const provider = account?.provider;
      const name = user?.name || credentials?.name;
      const email = user?.email || credentials?.email;
      const uid = user?.id || credentials?.csrfToken;
      const image = user.image;
      const password = credentials?.password || `${name}${uid}`;
      try {
        const response = await api.post("/auth/login", {
          provider,
          uid,
          name,
          email,
          image: image || null,
          password,
        });
        if (response.status === 200) {
          console.log(response.data);
          console.log("return response!!!");
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
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
