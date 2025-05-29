import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByTestId("login-input").click();
  await page.getByTestId("login-input").fill("PAW");
  await page.getByTestId("login-input").press("CapsLock");
  await page.getByTestId("login-input").fill("paweł");
  await page.getByTestId("password-input").click();
  await page.getByTestId("password-input").fill("paweł");
  await page.getByTestId("login-button").click();
  await page.getByTestId("new-project-button").click();
  await page.getByTestId("project-name-input").click();
  await page.getByTestId("project-name-input").fill("AddingNewProjectName");
  await page.getByTestId("project-description-input").click();
  await page
    .getByTestId("project-description-input")
    .fill("AddingNewProjectDescription");
  await page.getByTestId("create-project-submit").click();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill("AddingNewProjectNameEdited");
  await page.locator("textarea").click();
  await page.locator("textarea").fill("AddingNewProjectDescriptionEdited");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("textbox", { name: "Type confirmation text" }).click();
  await page
    .getByRole("textbox", { name: "Type confirmation text" })
    .fill("I want to delete AddingNewProjectNameEdited");
  await page.getByRole("button", { name: "Delete" }).nth(1).click();
  await page.close();
});
