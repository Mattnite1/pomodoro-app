import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const res = await fetch('http://localhost:3333/auth/login', {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                });
                const user = await res.json();

                if (res.ok && user) {
                    console.log(user.access_token)
                    return user
                } 
                return null 
            }
        })
    ]
}

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}