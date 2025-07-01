import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { Login } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { CustomUser } from "@/types/admin";

// Extend NextAuth types
declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        fullname: string;
        role: string;
    }
    
    interface Session {
        user: {
            id: string;
            email: string;
            fullname: string;
            role: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        fullname: string;
        role: string;
    }
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
               try{
                const {email, password} = credentials as{email : string, password : string}
                const user : any = await Login({email})

                if(!user){
                    return null
                }
                const passwordMatch = await compare(password, user.password)
                if(passwordMatch){
                    return user
                }else{
                    return null
                }
               }catch(error){
                    console.log(error)
                    return null
               }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user } : any) {
            if (account?.provider === 'credentials' && user) {
                token.id = user.id;
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token } : any) {
            if('email' in token ){
                session.user.email = token.email
            }
            if('fullname' in token){
                session.user.fullname = token.fullname
            }
            if('role' in token){
                session.user.role = token.role 
            }
            return session;
        }
    },
    pages: {
        signIn: '/Auth/Login',
       
    }
};

const handler = NextAuth(authOptions);

export {
    handler as GET, 
    handler as POST
};
