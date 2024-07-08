import { Title, Text, Input, Container, PasswordInput, Space, Button } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/router';
import classes from './SignUp.module.css';

export function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const registerUser = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            router.push('/');
        } else {
            const errorData = await response.json();
            setError(errorData.message);
        }
    };
    return (
        <>
            <Title className={classes.title} ta="center" mt={100}>
                <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                    Sign Up
                </Text>
            </Title>
            <center>
                <Container size="xs">
                    <Space h="xl" />
                    <Input value={email} onChange={(e) => { setEmail(e.target.value); }} placeholder="Email @" />
                    <Space h="xl" />
                    <PasswordInput
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); }}
                      label=""
                      description=""
                      placeholder="Input placeholder"
                    />
                    {error ? (
                        <>
                            <Space h="sm" />
                            <Text>{error}</Text>
                            <Space h="sm" />
                        </>
                    ) : (
                        <Space h="xl" />
                    )}

                    <Button onClick={(e) => { registerUser(e); }} variant="outline">Sign Up</Button>
                </Container>
            </center>
        </>
    );
}
