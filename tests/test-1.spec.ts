import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByTestId("login-input").click();
  await page.getByTestId("login-input").fill("paweł");
  await page.getByTestId("password-input").click();
  await page.getByTestId("password-input").fill("paweł");
  await page.getByTestId("login-button").click();
  await page.getByTestId("new-project-button").click();
  await page.getByTestId("project-name-input").click();
  await page.getByTestId("project-name-input").fill("test");
  await page.getByTestId("project-description-input").click();
  await page.getByTestId("project-description-input").fill("test");
  await page.getByTestId("create-project-submit").click();
  await page.getByRole("link", { name: "test test" }).click();
  await page.getByTestId("addstories").click();
  await page.getByTestId("story-name-input").click();
  await page.getByTestId("story-name-input").fill("test");
  await page.getByTestId("story-description   -input").click();
  await page.getByTestId("story-description   -input").fill("test");
  await page.getByTestId("create-story-submit").click();
  await page.getByRole("link", { name: "test test todo" }).click();
  await page.getByTestId("new-task-button").click();
  await page.getByTestId("task-name-input").click();
  await page.getByTestId("task-name-input").fill("test");
  await page.getByTestId("task-secs-input").click();
  await page.getByTestId("task-secs-input").fill("test");
  await page.locator('input[type="date"]').fill("2025-06-08");
  await page.getByTestId("create-task-submit").click();
  await page.getByRole("button", { name: "Edit" }).first().click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill("test1");
  await page.locator("textarea").click();
  await page.locator("textarea").fill("test1");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("link", { name: "test1" }).click();
  await page.getByRole("button", { name: "Edit Task" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^StateTo doDoingDone$/ })
    .getByRole("combobox")
    .selectOption("doing");
  await page.getByRole("button", { name: "Save" }).click();
  // await page.goto("http://localhost:3000/");
  // await page.getByRole("link", { name: "test test" }).click();
  // await page.getByRole("link", { name: "test test todo" }).click();
  // await page.getByRole("button", { name: "Delete" }).click();
  // await page.getByRole("button", { name: "Delete" }).nth(1).click();
  // await page.getByRole("button", { name: "Delete" }).click();
  // await page.getByRole("textbox", { name: "Type confirmation text" }).click();
  // await page
  //   .getByRole("textbox", { name: "Type confirmation text" })
  //   .fill("I want to delete test");
  // await page.getByRole("button", { name: "Delete" }).nth(1).click();
  await page.close();
});
