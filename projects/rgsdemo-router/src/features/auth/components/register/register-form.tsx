import { useAuth } from "../../hooks/use-auth";
import type { RegisterDTO } from "../../types/user";
import "../auth-form.scss";

type Props = {
  onSelectForm: (state: "loginPending" | "registerPending") => void;
};

export const RegisterForm: React.FC<Props> = ({ onSelectForm }) => {
  const { register } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: RegisterDTO = {
      username: String(formData.get("username")),
      password: String(formData.get("password")),
      email: String(formData.get("email")),
    };

    register(data).then(() => {
      onSelectForm("loginPending");
    });
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="username" />
        <input name="password" type="password" placeholder="password" />
        <input name="email" placeholder="email" />
        <button type="submit">Register</button>
        <button type="button" onClick={() => onSelectForm("loginPending")}>
          Go to Login
        </button>
      </form>
    </div>
  );
};
