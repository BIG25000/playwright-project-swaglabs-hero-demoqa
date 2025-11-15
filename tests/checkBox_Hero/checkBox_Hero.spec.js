import { test, expect } from "@playwright/test";

test("CHECKBOX-001 Toggle Checkbox", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/checkboxes");

  // เลือก checkbox อันที่ 1
  const firstCheckbox = page
    .locator('#checkboxes input[type="checkbox"]')
    .first();

  await expect(firstCheckbox).not.toBeChecked();

  await firstCheckbox.click();
  await expect(firstCheckbox).toBeChecked();

  await firstCheckbox.click();
  await expect(firstCheckbox).not.toBeChecked();

  await firstCheckbox.click();
  await expect(firstCheckbox).toBeChecked();
});
