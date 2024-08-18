import type { GetUsersQuery } from '../__generated__/graphql';
import { Link } from 'react-router-dom';

export function User({ user }: { user: GetUsersQuery['users'][number] }) {
  return (
    <Link to={`/user/${user.id}`} className='text-3xl shadow p-2 rounded'>
      {user.name}
    </Link>
  );
}
