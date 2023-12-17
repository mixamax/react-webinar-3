import StoreModule from "../module";

class LoginState extends StoreModule {
  initState() {
    return {
      token: "",
      isLogin: false,
      logError: "",
    };
  }

  setInitState() {
    this.setState(
      {
        ...this.getState(),
        ...this.initState(),
      },
      "установили начальное значение формы Login"
    );
  }

  setLogInState() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState(
        {
          ...this.getState(),
          token: localStorage.getItem("token") || "",
          isLogin: true,
          logError: "",
        },
        "установили значение token"
      );
    } else {
      this.setInitState();
    }
  }

  async logOut() {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-token": token,
      },
    });

    const json = await response.json();
    console.log(json);
    localStorage.removeItem("token");
    this.setState(
      {
        ...this.getState(),
        token: "",
        isLogin: false,
      },
      "удалили токен"
    );
  }

  async logIn(login, password) {
    const body = JSON.stringify({
      login,
      password,
    });

    const response = await fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("token", json.result.token);
      this.setState(
        {
          ...this.getState(),
          token: json.result.token,
          isLogin: true,
          logError: "",
        },
        "Загружен токен"
      );
    } else {
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          token: "",
          isLogin: false,
          logError: json.error.data.issues[0].message,
        },
        "Ошибка при загрузке токена"
      );
    }
  }
}

export default LoginState;
