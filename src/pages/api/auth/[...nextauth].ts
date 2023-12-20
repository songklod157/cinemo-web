import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "ex@email.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email === "ractist" && password === "ractist") {
          return {
            id: "1234",
            email: "ractist",
            name: "Ractist",
            image:
              "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png",
          };
        }
        return null;
      },
    }),
  ],
};
export default NextAuth(authOptions);
