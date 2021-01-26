import "./App.css";
import { useState } from "react";

function Header(props) {
  console.log(props);
  return (
    <header className="header">
      <p>Hello World {props.name}</p>
      <button onClick={props.click}>Trocar Usuário</button>
      {props.children}
      <hr />
    </header>
  );
}

function Form() {
  const [nome, setNome] = useState("");

  const handleNome = (e) => {
    setNome(e.target.value);
  };

  return (
    <>
      <p>{nome}</p>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={handleNome}
      />
    </>
  );
}

function App() {
  const [user, setUser] = useState("Fulano");

  const handleClick = () => {
    if (user === "Fulano") setUser("Ciclano");
    else setUser("Fulano");
  };

  return (
    <div>
      <Header name="Fulano de tal" click={handleClick}>
        <p>Eu sou filho do header</p>
      </Header>
      <p>My React App</p>
      <p>Nome do Usuário:{user}</p>
      <hr />
      <Form />
    </div>
  );
}

export default App;
