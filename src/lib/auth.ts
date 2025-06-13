import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email:{label: "Email", type: "text"},
            password: {label: "Password", type: "password"} 
        },

        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required");
            }

            try{
                const db = await connectToDB();
                const user = await db.collection('users').findOne({email: credentials.email});
                if (!user) {    
                    throw new Error("User not found");
                }       

                const validPassword = await bcrypt.compare(credentials.password, user.password)

                if (!validPassword) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin
                };
            }
            catch (error) {
                Nex
            }

        },
        callbacks:{
            async jwt({token, user}){
                if (user) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        isAdmin: user.isAdmin
                    };
                }
                return token;
            },

            async session({ session, token }){

                if(session.user) {
                    session.user.id = token.id as string;
                    session.user.isAdmin = token.isAdmin;
                } 

                return session; 
            }
        },
        pages: {
            signIn: "/login",
            error: "/login"
        },
        session: {
            strategy: "jwt", 
            maxAge: 30 * 24 * 60 * 60, // 30 days
        },
        secret: process.env.NEXTAUTH_SECRET
            
    })
  ]
}