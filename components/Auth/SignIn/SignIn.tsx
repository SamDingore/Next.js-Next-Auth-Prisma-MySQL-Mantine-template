import { Title, Text, Input, Container, PasswordInput, Space, Button } from '@mantine/core';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import classes from './SignIn.module.css';

export function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const loginUser = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError('something went wrong!');
        } else {
            window.location.href = '/';
        }
    };
    return (
        <>
            <Title className={classes.title} ta="center" mt={100}>
                <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                    Sign In
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

                    <Button onClick={(e) => { loginUser(e); }} variant="outline">Sign In</Button>

                    <Space h="md" />
                </Container>
            </center>
        </>
    );
}
