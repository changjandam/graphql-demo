import { gql } from '../../__generated__';
import { useQuery } from '@apollo/client';
import { User } from '../../components/User';

const GET_USERS = gql(`
  query GetUsers {
    users {
      id
      name
    }
  }
`);

export function Home() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-2'>
      {data?.users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
