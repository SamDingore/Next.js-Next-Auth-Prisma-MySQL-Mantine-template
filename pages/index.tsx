import { getSession } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';
import { Welcome } from '../components/Welcome/Welcome';

const Home: NextPage = () => (
    <>
      <Welcome />
    </>
  );

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
export default Home;
