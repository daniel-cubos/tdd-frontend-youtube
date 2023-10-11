import Home from "./page";
import { fireEvent, render, screen } from "@testing-library/react";
describe("Testa a página principal", () => {
  test("Deve haver um título na página", async () => {
    render(<Home />);

    const title = await screen.findByRole("heading", {
      name: "Welcome",
    });

    expect(title).toBeInTheDocument();
  });

  test("Deve haver um subtitulo", async () => {
    render(<Home />);

    const subTitle = await screen.findByRole("heading", {
      level: 3,
    });

    expect(subTitle).toBeInTheDocument();
  });

  test("Devem haver dois inputs", async () => {
    render(<Home />);

    const inputEmail = await screen.findByPlaceholderText("Enter your email");
    const inputPassword = await screen.findByPlaceholderText(
      "Enter your password"
    );

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test("Deve haver um botão", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    expect(button.textContent).toContain("LOGIN");
  });

  test("Deve aparecer uma mensagem de erro quando clicar no botão com input email vazio", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    const inputPassword = await screen.findByPlaceholderText(
      "Enter your password"
    );

    fireEvent.change(inputPassword, {
      target: {
        value: "123456",
      },
    });

    fireEvent.click(button);

    expect(screen.queryByText("E-mail é obrigatório!")).toBeInTheDocument();
  });

  test("Deve aparecer uma mensagem de erro quando clicar no botão com o password vazio", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    const inputEmail = await screen.findByPlaceholderText("Enter your email");

    fireEvent.change(inputEmail, {
      target: {
        value: "danielopes@cubos.academy",
      },
    });

    fireEvent.click(button);

    expect(screen.queryByText("Senha é obrigatória!")).toBeInTheDocument();
  });

  test("Não deve fazer login com senha inválida", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    const inputEmail = await screen.findByPlaceholderText("Enter your email");

    fireEvent.change(inputEmail, {
      target: {
        value: "daniel.lopes@cubos.academy",
      },
    });

    const inputPassword = await screen.findByPlaceholderText(
      "Enter your password"
    );

    fireEvent.change(inputPassword, {
      target: {
        value: "12345",
      },
    });

    fireEvent.click(button);

    expect(
      screen.queryByText("E-mail ou senha inválidos!")
    ).toBeInTheDocument();
  });

  test("Não deve fazer login com email inválido", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    const inputEmail = await screen.findByPlaceholderText("Enter your email");

    fireEvent.change(inputEmail, {
      target: {
        value: "danielopes@cubos.academy",
      },
    });

    const inputPassword = await screen.findByPlaceholderText(
      "Enter your password"
    );

    fireEvent.change(inputPassword, {
      target: {
        value: "123456",
      },
    });

    fireEvent.click(button);

    expect(
      screen.queryByText("E-mail ou senha inválidos!")
    ).toBeInTheDocument();
  });

  test("Deve fazer login com credenciais válidas", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    const inputEmail = await screen.findByPlaceholderText("Enter your email");

    fireEvent.change(inputEmail, {
      target: {
        value: "daniel.lopes@cubos.academy",
      },
    });

    const inputPassword = await screen.findByPlaceholderText(
      "Enter your password"
    );

    fireEvent.change(inputPassword, {
      target: {
        value: "123456",
      },
    });

    fireEvent.click(button);

    expect(
      screen.queryByText("Login efetuado com sucesso!")
    ).toBeInTheDocument();
  });

  test("Deve haver um título LOGIN", async () => {
    render(<Home />);

    const loginTitle = await screen.findByRole("heading", {
      name: "LOGIN",
    });

    expect(loginTitle).toBeInTheDocument();
  });
});
