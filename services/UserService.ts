import { User } from "../types/user";

const USERS_KEY = "mockedUsers";
const CURRENT_KEY = "currentUser";

class UserService {
  static initMockedUsers(): void {
    if (!localStorage.getItem(USERS_KEY)) {
      const mocked: User[] = [
        { id: "u1", name: "Michał", surname: "Wojciechowski", role: "admin" },
        { id: "u2", name: "Adam", surname: "Nowak", role: "devops" },
        { id: "u3", name: "Marcin", surname: "Kłos", role: "developer" },
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(mocked));
      localStorage.setItem(CURRENT_KEY, mocked[0].id);
    }
  }

  static getAllUsers(): User[] {
    const rawUsers = localStorage.getItem(USERS_KEY);
    return rawUsers ? JSON.parse(rawUsers) : [];
  }

  static setLoggedInUser(userId: string): void {
    localStorage.setItem(CURRENT_KEY, userId);
  }

  static getLoggedInUser(): User | null {
    const allUsers = this.getAllUsers();
    const currentId = localStorage.getItem(CURRENT_KEY);

    if (currentId) {
      const cleanedCurrentId = currentId.replace(/"/g, "").trim();
      const user = allUsers.find((u) => {
        const cleanedUserId = u.id.trim();
        return cleanedUserId === cleanedCurrentId;
      });
      return user ?? null;
    }

    return null;
  }
}

export default UserService;
