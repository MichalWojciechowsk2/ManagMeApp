import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('[data-testid="login-input"]', "paweł");
  await page.fill('[data-testid="password-input"]', "paweł");
  await page.click('[data-testid="login-button"]');
  await expect(page.locator("text=Projects")).toBeVisible();
}

test.describe("Project CRUD Operations as paweł", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Create new project", async ({ page }) => {
    await page.locator('button:has-text("Add Project")').click();
    await page.waitForSelector('[data-testid="project-name-input"]', {
      state: "visible",
    });

    await page.fill('[data-testid="project-name-input"]', "Projekt Testowy");
    await page.fill(
      '[data-testid="project-description-input"]',
      "Opis projektu testowego"
    );
    await page.click('[data-testid="create-project-submit"]');

    await page.waitForSelector('a:has-text("Projekt Testowy")', {
      state: "visible",
      timeout: 10000,
    });
    await expect(page.locator('a:has-text("Projekt Testowy")')).toBeVisible();
  });

  test("Delete existing project", async ({ page }) => {
    // Click Delete button
    await page
      .locator("li", { hasText: "Projekt Testowy" })
      .locator('button:has-text("Delete")')
      .click();

    // Confirm delete modal appears
    await page.waitForSelector('input[placeholder="Type confirmation text"]', {
      state: "visible",
    });

    // Type confirmation text exactly as required
    await page.fill(
      'input[placeholder="Type confirmation text"]',
      "I want to delete Projekt Testowy"
    );

    // Click Delete confirm button
    const deleteModal = page.locator(
      "div.fixed.inset-0.bg-gray-800.bg-opacity-75"
    );
    const confirmDeleteButton = deleteModal.locator(
      'button:has-text("Delete")'
    );
    await confirmDeleteButton.click();

    // Verify project no longer visible
    await expect(page.locator("text=Projekt Testowy")).not.toBeVisible();
  });
});
