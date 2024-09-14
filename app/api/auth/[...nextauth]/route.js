import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// next auth
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],

  async session({ session }) {},

  async signIn({ profile }) {},
});

// exporting auth
export { handler as GET, handler as POST };
