import React from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import type { LoginDTO } from "../../types/user";
import "../auth-form.scss";

type Props = {
  onLogin: () => void;
  onSelectForm: (state: "loginPending" | "registerPending") => void;
};

const initialState: LoginDTO = {
  username: "",
  password: "",
  rememberMe: false,
};

export const LoginForm: React.FC<Props> = ({ onLogin, onSelectForm }) => {
  const [form, setForm] = useState<LoginDTO>(initialState);
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    login({
      ...form,
      username: form.username.toLowerCase(),
    }).then(() => {
      onLogin();
    });
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="username"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="password"
        />

        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
          />
          Remember me
        </label>

        <button type="submit">Login</button>

        <button type="button" onClick={() => onSelectForm("registerPending")}>
          Register
        </button>
      </form>
    </div>
  );
};
