import { Storie } from "../types/stories";

const API_URL = "http://localhost:5000/api/stories";

class StorieService {
  static async saveStorie(storie: Storie): Promise<Storie> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storie),
    });

    if (!response.ok) {
      throw new Error("Failed to save storie");
    }

    return response.json();
  }

  static async getStories(): Promise<Storie[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch stories");
    }
    return response.json();
  }

  static async getStorieById(id: string): Promise<Storie> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Storie not found");
    }
    return response.json();
  }

  static async updateStorie(updatedStorie: Storie): Promise<Storie> {
    const response = await fetch(`${API_URL}/${updatedStorie._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStorie),
    });

    if (!response.ok) {
      throw new Error("Failed to update storie");
    }

    return response.json();
  }

  static async deleteStorieById(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete storie");
    }
  }
}

export default StorieService;
