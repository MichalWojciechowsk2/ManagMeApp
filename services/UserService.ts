import { User } from "../types/user";
class UserService {
  static getMockedUser(): User {
    const user: User = {
      id: "1",
      name: "Michał",
      surname: "Wojciechowski",
    };
    return user;
  }
}

export default UserService;
