import { Title, Text, Container, Space } from '@mantine/core';
import { useSession } from 'next-auth/react';
import classes from './Welcome.module.css';
import AuthButton from '../Auth/AuthButton/AuthButton';

export function Welcome() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          k
        </Text>
      </Title>
      <center>
        <Container size="xs">
          {user && <p>Signed in as {user?.email}</p>}
          <AuthButton />
          <Space h="xl" />
        </Container>
      </center>
    </>
  );
}
