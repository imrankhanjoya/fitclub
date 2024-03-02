import NextAuth from "next-auth"
import axios from "axios"
// importing providers
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
           await axios.post( process.env.SEREVER_API +"/api/user/create",user).then((res:any)=>{
            console.log("user has been save")
           })
          return true
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async session({ session, user, token }) {
          return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          return token
        }
    }
    
})


export { handler as GET, handler as POST }
