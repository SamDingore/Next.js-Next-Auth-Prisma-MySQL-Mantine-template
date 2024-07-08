import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../static/lib/prisma';
import { hashPassword } from '../../../static/lib/auth';

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    res.status(201).json({ message: 'User created', user });
}
