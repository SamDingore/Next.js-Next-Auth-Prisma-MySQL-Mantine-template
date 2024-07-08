import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../static/lib/prisma';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface User {
        id: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        name?: string | null;
        email?: string | null;
        picture?: string | null;
    }
}

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) {
                    console.log('No credentials provided');
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && user.password && await compare(credentials.password, user.password)) {
                    console.log('User authorized', user);
                    return user;
                }
                console.log('Authorization failed');
                return null;
            },
        }),
    ],

    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },

    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,
    },

    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
    },

    callbacks: {
        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                image: token.picture,
            };
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
            }
            return token;
        },
    },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
