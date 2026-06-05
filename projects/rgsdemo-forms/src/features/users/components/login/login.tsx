import { Card } from "../../../../core/components/card/card";
import React from "react";
import '../../components/login/login.css'

export const Login: React.FC = () => {

    // Previene que renderice de nuevo al clickar en submit
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

  return (
    <Card>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="Usuario"
          required
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </Card>
  );
};
