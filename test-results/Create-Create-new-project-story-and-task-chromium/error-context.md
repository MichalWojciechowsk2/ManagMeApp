# Test info

- Name: Create new project, story and task
- Location: D:\VSCProjects\MenageMe\menageme\tests\Create.spec.ts:2:5

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('text=Testowy Projekt') resolved to 2 elements:
    1) <div class="w-[30%] text-ellipsis overflow-hidden whitespace-nowrap mr-3">Testowy Projekt</div> aka getByRole('link', { name: 'Testowy Projekt Testowy' })
    2) <div class="w-[70%] text-sm break-words whitespace-normal overflow-hidden overflow-ellipsis">Testowy Projekt</div> aka getByRole('link', { name: 'Testowy Projekt Testowy' })

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text=Testowy Projekt')

    at D:\VSCProjects\MenageMe\menageme\tests\Create.spec.ts:24:54
```

# Page snapshot

```yaml
- navigation:
  - link "MenageMe":
    - /url: "#"
  - paragraph: Hello paweł paweł
  - link "Log Out":
    - /url: /logout
    - button "Log Out"
  - button "Toggle Theme"
- main:
  - text: Projects
  - button "Add Project"
  - list:
    - paragraph: Name
    - paragraph: Description
    - listitem:
      - link "test1 test1":
        - /url: /projects/6835cb997fb72cb63197c6f4
      - button "Edit"
      - button "Delete"
    - listitem:
      - link "2 2":
        - /url: /projects/6835d3157fb72cb63197c732
      - button "Edit"
      - button "Delete"
    - listitem:
      - link "a a":
        - /url: /projects/683886b2ea40d5dec5ccdb66
      - button "Edit"
      - button "Delete"
    - listitem:
      - link "x x":
        - /url: /projects/68388bdeea40d5dec5ccdb7d
      - button "Edit"
      - button "Delete"
    - listitem:
      - link "ttt ttt":
        - /url: /projects/6838921dea40d5dec5ccdc04
      - button "Edit"
      - button "Delete"
    - listitem:
      - link "Testowy Projekt Testowy Projekt":
        - /url: /projects/6838926dea40d5dec5ccdc1c
      - button "Edit"
      - button "Delete"
- button "Open Next.js Dev Tools":
  - img
- button "Open issues overlay": 1 Issue
- button "Collapse issues badge":
  - img
- alert
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 | test("Create new project, story and task", async ({ page }) => {
   3 |   //Login
   4 |   console.log("Logging");
   5 |   await page.goto("http://localhost:3000/login");
   6 |   await page.fill('[data-testid="login-input"]', "paweł");
   7 |   await page.fill('[data-testid="password-input"]', "paweł");
   8 |   await page.click('[data-testid="login-button"]');
   9 |   await expect(page.locator("text=Projects")).toBeVisible();
  10 |   console.log("Logging done");
  11 |
  12 |   await page.waitForSelector('[data-testid="new-project-button"]');
  13 |   await page.click('[data-testid="new-project-button"]');
  14 |
  15 |   //project
  16 |   console.log("Creating project");
  17 |   await page.fill('[data-testid="project-name-input"]', "Testowy Projekt");
  18 |   await page.fill(
  19 |     '[data-testid="project-description-input"]',
  20 |     "Testowy Projekt"
  21 |   );
  22 |   await page.click('[data-testid="create-project-submit"]');
  23 |   await page.waitForSelector('a:has-text("Testowy Projekt")');
> 24 |   await expect(page.locator("text=Testowy Projekt")).toBeVisible();
     |                                                      ^ Error: expect.toBeVisible: Error: strict mode violation: locator('text=Testowy Projekt') resolved to 2 elements:
  25 |   console.log("Project created");
  26 |
  27 |   //story
  28 |   // await page.click('[data-testid="gotostory"]');
  29 |   await page.click('a:has-text("Testowy Projekt")');
  30 |
  31 |   await page.click('[data-testid="addstories"]');
  32 |   await page.fill('[data-testid="story-name-input"]', "Testowa Story");
  33 |   await page.fill(
  34 |     '[data-testid="story-description-input"]',
  35 |     "Testowa Story Desc"
  36 |   );
  37 |   await page.click('[data-testid="create-story-submit"]');
  38 |   await expect(page.locator("text=Testowa Story")).toBeVisible();
  39 |   console.log("Story created");
  40 |
  41 |   //task
  42 |   await page.click('a:has-text("Testowa Story")');
  43 |
  44 |   await page.click('[data-testid="new-task-button"]');
  45 |   await page.fill('[data-testid="task-name-input"]', "Testowe Zadanie");
  46 |   await page.fill('[data-testid="task-secs-input"]', "Testowe Zadanie desc");
  47 |   await page.click('[data-testid="create-task-submit"]');
  48 |   console.log("Task created");
  49 |
  50 |   //Check
  51 |   await expect(page.locator("text=Testowe Zadanie")).toBeVisible();
  52 | });
  53 |
```