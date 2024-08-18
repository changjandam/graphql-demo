import { useParams } from 'react-router-dom';
import { gql } from '../../__generated__';
import { useQuery } from '@apollo/client';

const GET_USER = gql(`
query GetUser($userId: Int!) {
  user(id: $userId) {
    id
    name
    vehicles {
      id
      type
      model
    }
  }
}
`);

export function User() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: Number(id) },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  if (!data?.user) return <div>User not found</div>;

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-2'>
      <h1 className='text-3xl'>{data?.user.name}</h1>
      <div className='flex flex-col gap-2'>
        {data?.user.vehicles.map((vehicle) => (
          <div key={vehicle?.id} className='shadow p-2 rounded'>
            <p>{vehicle?.type}</p>
            <p>{vehicle?.model}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
