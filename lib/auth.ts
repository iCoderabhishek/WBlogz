import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User.model";

export const authOptions: NextAuthOptions = {
  providers: [
    // Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Manual Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email }).select("+password");

          if (!user) {
            throw new Error("No user found");
          }

          const isValid = await user.comparePassword(credentials.password); // comparePassword from User.model.ts

          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile) {
        const googleProfile = profile as {
          email_verified?: boolean;
          email?: string;
          name?: string;
          picture?: string;
        };

        if (!googleProfile?.email_verified) {
          throw new Error("Google email not verified");
        }

        try {
          await connectToDatabase();
          let user = await User.findOne({ email: googleProfile.email });

          if (!user) {
            user = new User({
              name: googleProfile.name,
              email: googleProfile.email,
              avatar: googleProfile.picture,
            });
            await user.save();
          }

          // Return true to allow the sign-in
          return true;
        } catch (error) {
          console.log("Error saving user:", error);
          return false;
        }
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 20 * 24 * 60 * 60, // 20 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};