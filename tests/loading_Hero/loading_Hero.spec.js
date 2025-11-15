import { test, expect } from "@playwright/test";

test("DLOADING-030 รอองค์ประกอบปรากฏ", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/dynamic_loading/2");

  await page.getByRole("button", { name: "Start" }).click();

  const helloText = page.locator("#finish");

  await expect(helloText).toBeVisible({ timeout: 10000 });

  await expect(helloText).toHaveText("Hello World!");
});
