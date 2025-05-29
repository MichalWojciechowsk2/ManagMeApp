import { test, expect } from "@playwright/test";
test("Create new project, story and task", async ({ page }) => {
  //Login
  console.log("Logging");
  await page.goto("http://localhost:3000/login");
  await page.fill('[data-testid="login-input"]', "paweł");
  await page.fill('[data-testid="password-input"]', "paweł");
  await page.click('[data-testid="login-button"]');
  await expect(page.locator("text=Projects")).toBeVisible();
  console.log("Logging done");

  await page.waitForSelector('[data-testid="new-project-button"]');
  await page.click('[data-testid="new-project-button"]');

  //project
  console.log("Creating project");
  await page.fill('[data-testid="project-name-input"]', "Testowy Projekt");
  await page.fill(
    '[data-testid="project-description-input"]',
    "Testowy Projekt"
  );
  await page.click('[data-testid="create-project-submit"]');
  await page.waitForSelector('a:has-text("Testowy Projekt")');
  await expect(page.locator("text=Testowy Projekt")).toBeVisible();
  console.log("Project created");

  //story
  // await page.click('[data-testid="gotostory"]');
  await page.click('a:has-text("Testowy Projekt")');

  await page.click('[data-testid="addstories"]');
  await page.fill('[data-testid="story-name-input"]', "Testowa Story");
  await page.fill(
    '[data-testid="story-description-input"]',
    "Testowa Story Desc"
  );
  await page.click('[data-testid="create-story-submit"]');
  await expect(page.locator("text=Testowa Story")).toBeVisible();
  console.log("Story created");

  //task
  await page.click('a:has-text("Testowa Story")');

  await page.click('[data-testid="new-task-button"]');
  await page.fill('[data-testid="task-name-input"]', "Testowe Zadanie");
  await page.fill('[data-testid="task-secs-input"]', "Testowe Zadanie desc");
  await page.click('[data-testid="create-task-submit"]');
  console.log("Task created");

  //Check
  await expect(page.locator("text=Testowe Zadanie")).toBeVisible();
});
