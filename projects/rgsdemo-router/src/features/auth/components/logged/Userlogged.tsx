import type { UserLogin } from '../../types/user';

type Props = {
  user: UserLogin;
  onLogout: () => void;
};

export const UserLogged: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <div>
      <p>{user.username}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};