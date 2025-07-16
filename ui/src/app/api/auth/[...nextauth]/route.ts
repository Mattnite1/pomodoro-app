import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

type AuthorizationTypes = "oauth" | "credentials";
type AuthorizationProviders = "google" | "credentials";

interface UserData {
  name: string;
  image: string;
  email: string;
}

interface JwtData {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  type: AuthorizationTypes;
  provider: AuthorizationProviders;
  providerAccountId?: string;
}

type JwtTokenResult = JwtData & UserData;

interface GoogleTokenPayload {
  id: string;
  name: string;
  picture: string;
  email: string;
}

interface GoogleAccountPayload {
  provider: "google";
  type: "oauth";
  providerAccountId: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: "Bearer";
  expires_at: number;
}

interface GoogleJwtHandlerPayload {
  token: GoogleTokenPayload;
  user: null;
  account: GoogleAccountPayload;
}

interface CredentialsUserPayload {
  name: string;
  access_token: string;
  refresh_token: string;
  expires_at: number;
  image: string;
  email: string;
}

interface CredentialsAccountPayload {
  provider: "credentials";
  type: "credentials";
  providerAccountId: string;
}

interface CreadentialsJwtHandlerPayload {
  token: null;
  user: CredentialsUserPayload;
  account: CredentialsAccountPayload;
}

type JwtHandler<T> = (payload: T) => JwtTokenResult;

type UserPossibleData = CredentialsUserPayload;
type AccountPossibleData = GoogleAccountPayload & CredentialsAccountPayload;
type TokenPossibleData = GoogleTokenPayload;

interface JwtPossibleDataSet {
  user: UserPossibleData;
  account: AccountPossibleData;
  token: TokenPossibleData;
}

const handleGoogleJwtCallback: JwtHandler<GoogleJwtHandlerPayload> = ({
  token,
  account,
}: GoogleJwtHandlerPayload): JwtTokenResult => ({
  access_token: account.access_token,
  refresh_token: account.refresh_token,
  expires_at: account.expires_at,
  type: "oauth",
  providerAccountId: account.providerAccountId,
  provider: "google",
  name: token.name,
  email: token.email,
  image: token.picture,
});

const handleJwtCredentialsCallback: JwtHandler<
  CreadentialsJwtHandlerPayload
> = ({ user, account }: CreadentialsJwtHandlerPayload): JwtTokenResult => ({
  access_token: user.access_token,
  refresh_token: user.refresh_token,
  expires_at: user.expires_at,
  type: "credentials",
  provider: account.provider,
  name: user.name,
  email: user.email,
  image: user.image,
});

const handleJwtCallbacks = ({ token, user, account }: JwtPossibleDataSet) => {
  switch (account?.provider) {
    case "google":
      return handleGoogleJwtCallback({ token, user: null, account });
    case "credentials":
      return handleJwtCredentialsCallback({ token: null, user, account });
    default:
      return { ...token, ...user };
  }
};
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),

    CredentialsProvider({
      name: "LDAP",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials, req) {
        const response = await fetch(process.env.NEXT_PUBLIC_DB_URL + "auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await response.json();
        if (response.ok && user) {
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(account) {
      try {
        await axios.post("http://localhost:3333/auth/login", {
          email: account.user.email,
          username: account.user.name,
          password: account.profile.at_hash,
        });
      } catch (error) {
        console.error("Error saving user data:", error);
      }
      return true
    },

    async jwt({ token, user, account }: JwtPossibleDataSet) {
      return handleJwtCallbacks({ token, user, account });
    },

    async session({ session, token }) {
      session.accessToken = token.access_token;
      return { ...session, user: { ...token } };
    },
  },
};
const nextAuth = NextAuth(authOptions);
export { nextAuth as GET, nextAuth as POST };
