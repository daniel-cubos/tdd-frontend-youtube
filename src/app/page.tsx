"use client";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [message, setMessage] = useState("");

  const user = {
    email: "daniel.lopes@cubos.academy",
    password: "123456",
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setMessage("");

      if (!inputEmail) {
        throw new Error("E-mail é obrigatório!");
      }

      if (!inputPassword) {
        throw new Error("Senha é obrigatória!");
      }

      if (inputEmail !== user.email) {
        throw new Error("E-mail ou senha inválidos!");
      }

      if (inputPassword !== user.password) {
        throw new Error("E-mail ou senha inválidos!");
      }

      setMessage("Login efetuado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  }

  return (
    <main className={styles.main}>
      <div>
        <h1>LOGIN</h1>
      </div>
      <div>
        <h1>Welcome</h1>
        <h3>LetU+0060s log you in quickly</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            value={inputEmail}
            onChange={(event) => setInputEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={inputPassword}
            onChange={(event) => setInputPassword(event.target.value)}
          />
          <button>LOGIN</button>
        </form>

        {message && <strong>{message}</strong>}
      </div>
    </main>
  );
}
