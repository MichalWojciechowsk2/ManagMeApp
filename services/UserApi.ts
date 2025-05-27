import { User } from "../types/user";

const API_URL = "http://localhost:5000/api/users";

class UserApiService {
  static async getAllUsers(): Promise<User[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const usersFromDb = await response.json();

    return usersFromDb.map((u: any) => ({
      id: u._id,
      name: u.name,
      surname: u.surname,
      role: u.role,
    }));
  }

  static setLoggedInUser(userId: string) {
    localStorage.setItem("currentUser", userId);
  }

  static async getUserById(userId: string): Promise<User | null> {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) {
      return null;
    }
    const u = await response.json();
    return {
      id: u._id,
      name: u.name,
      surname: u.surname,
      role: u.role,
    };
  }

  static async getLoggedInUser() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/auth/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    // return response.json();

    const u = await response.json();
    return {
      id: u._id,
      name: u.name,
      surname: u.surname,
      role: u.role,
    };
  }

  static async logout() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return response.json();
  }

  // static async getLoggedInUser(): Promise<User | null> {
  //   const token = localStorage.getItem("token");

  //   const currentId = localStorage.getItem("currentUser");
  //   if (!currentId) return null;

  //   return await this.getUserById(currentId);
  // }
}

export default UserApiService;
