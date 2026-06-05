//import { Greetings } from "../../../features/users/components/greetings/greetings";
import { NewMovie } from "../../../features/movies/components/newMovie/newMovie";
import { Login } from "../../../features/users/components/login/login";
import { Register } from "../../../features/users/components/register/register";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>React + Typescript + Vite</h1>
      </header>
      <main>
        <Login />
        <Register />
        <NewMovie />
      </main>
    </>
  );
}

export default App;
