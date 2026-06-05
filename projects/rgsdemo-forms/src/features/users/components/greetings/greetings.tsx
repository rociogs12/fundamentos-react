import React, { useState, type ChangeEvent } from "react";
import { Card } from "../../../../core/components/card/card";
import "./greetings.css";

export const Greetings: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  console.log(userName);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  return (
    <>
      <label htmlFor="name" className="user-wrapper">
        Nombre de usuario:
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={userName}
        ></input>
      </label>

      <Card>
        {userName ? <p> Bienvenid@ {userName} </p> : <p> Bienvenid@ </p>}
      </Card>
    </>
  );
};
