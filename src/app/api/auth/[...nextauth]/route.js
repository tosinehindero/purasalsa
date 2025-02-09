// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from "@@/app/utils/mongo";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Connect to MongoDB and get the 'admins' collection
          const adminsCollection = await connectMongoDB("admin", "admins");

          // Find the admin user by username
          const user = await adminsCollection.findOne({ username: credentials.username });
          if (!user) {
            throw new Error("No user found with the given username");
          }

          // Compare the provided password with the stored hashed password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Incorrect password");
          }

          // Return user data (you can include additional fields if needed)
          return { id: user._id, name: user.username, role: user.role };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
