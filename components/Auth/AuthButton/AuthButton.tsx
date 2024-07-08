import { Button } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButton: React.FC = () => {
    const { data: session } = useSession();

    return session ? (
        <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
    ) : (
        <Button variant="outline" onClick={() => signIn()}>Sign In</Button>
    );
};

export default AuthButton;
