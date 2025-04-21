import { Storie } from "../types/stories";

class StorieService {
  // SAVE
  static saveStorie(storie: Storie): void {
    const stories = StorieService.getStories();
    stories.push(storie);
    localStorage.setItem("stories", JSON.stringify(stories));
  }
  // GETALL
  static getStories(): Storie[] {
    const stories = localStorage.getItem("stories");
    return stories ? JSON.parse(stories) : [];
  }
  // GETBYID
  static getStorieById(id: string): Storie | undefined {
    const stories = StorieService.getStories();
    const storie = stories.find((storie) => storie.id === id);
    return storie;
  }
  // UPDATE
  static updateStorie(updatedStorie: Storie): void {
    const stories = StorieService.getStories();
    const index = stories.findIndex((storie) => storie.id === updatedStorie.id);
    if (index !== -1) {
      stories[index] = updatedStorie;
      localStorage.setItem("stories", JSON.stringify(stories));
    }
  }
  // DELETE
  static deleteStorieById(id: string): void {
    const stories = StorieService.getStories();
    const updatedStories = stories.filter((storie) => storie.id !== id);
    localStorage.setItem("stories", JSON.stringify(updatedStories));
  }
}

export default StorieService;
