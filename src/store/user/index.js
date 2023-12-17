import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      access: false,
      userName: "",
      userPhone: "",
      userEmail: "",
      isLoading: true,
    };
  }

  async getAccess() {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        headers: {
          "Content-Type": "application/json",
          "X-token": token,
        },
      });

      if (response.ok) {
        const json = await response.json();
        this.setState(
          {
            ...this.getState(),
            access: true,
            userName: json.result.profile.name,
            userPhone: json.result.profile.phone,
            userEmail: json.result.email,
            isLoading: false,
          },
          "Получен доступ к инфо юзера из АПИ"
        );
      } else {
        this.setState(
          {
            ...this.getState(),
            ...this.initState(),
            isLoading: false,
          },
          "Нет доступа, токен не распознан "
        );
      }
    } else {
      this.setState(
        {
          ...this.getState(),
          ...this.initState(),
          isLoading: false,
        },
        "Нет доступа, нет токена "
      );
    }
  }
}

export default UserState;
