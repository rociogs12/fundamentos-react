import { Card } from "../../../../core/components/card/card";
import { useState, type ChangeEvent } from "react";
import "../../components/register/register.css";

interface User {
  username: string;
  password: string;
}

const defaultUser: User = {
  username: "",
  password: "",
};

export const Register: React.FC = () => {
  const [user, setUser] = useState<User>(defaultUser);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; 
    setUser((prevUser) => ({...prevUser, [name]: value})) 
    // Modifica el estado del usuario (estaba si empieza era default user)
    // Para el valor de la clave name, cambias el valor 'value'
  };
  
  // Previene que renderice de nuevo al clickar en submit
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Register data: ', user)
  };

  return (
    <Card>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Usuario"
          value={user.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrate</button>
      </form>
    </Card>
  );
};
