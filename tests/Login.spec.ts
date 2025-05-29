import { test, expect } from "@playwright/test";

test("Invalid login", async ({ page }) => {
  await page.setViewportSize({ width: 998, height: 737 });

  await page.goto("http://localhost:3000/login");
  await page.fill("input:nth-of-type(1)", "imdoingtests");
  await page.fill('input[type="password"]', "thatstests");
  await page.click('[data-testid="login-button"]');
  await page.close();
});

test("Valid login with user jan", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('[data-testid="login-input"]', "jan");
  await page.fill('[data-testid="password-input"]', "jan");
  await page.click('[data-testid="login-button"]');
  await page.waitForURL("http://localhost:3000/");
  await expect(page.locator("text=Hello jan jan")).toBeVisible();

  await page.close();
});
