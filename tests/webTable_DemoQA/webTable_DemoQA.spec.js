import { test, expect } from "@playwright/test";

test("WEBTABLE-010 เพิ่มแถวใหม่", async ({ page }) => {
  const firstName = "Big";
  const lastName = "Small";
  const email = "big.small@example.com";
  const age = "30";
  const salary = "50000";
  const department = "QA";

  await page.goto("https://demoqa.com/webtables");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("textbox", { name: "First Name" }).fill(firstName);
  await page.getByRole("textbox", { name: "Last Name" }).fill(lastName);
  await page.getByRole("textbox", { name: "name@example.com" }).click();
  await page.getByRole("textbox", { name: "name@example.com" }).fill(email);
  await page.getByRole("textbox", { name: "Age" }).fill(age);
  await page.getByRole("textbox", { name: "Salary" }).fill(salary);
  await page.getByRole("textbox", { name: "Department" }).fill(department);
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByRole("grid")).toContainText(firstName);
  await expect(page.getByRole("grid")).toContainText(lastName);
  await expect(page.getByRole("grid")).toContainText(age);
  await expect(page.getByRole("grid")).toContainText(email);
  await expect(page.getByRole("grid")).toContainText(salary);
  await expect(page.getByRole("grid")).toContainText(department);
});

test("WEBTABLE-011 ค้นหาชื่อด้วย Search", async ({ page }) => {
  await page.goto("https://demoqa.com/webtables");

  await page.getByRole("textbox", { name: "Type to search" }).fill("Cierra");

  await expect(page.getByRole("grid")).toContainText("Cierra");
  await expect(page.getByRole("grid")).not.toContainText("Alden");
  await expect(page.getByRole("grid")).not.toContainText("Kierra");
});

test("WEBTABLE-012 ลบแถว", async ({ page }) => {
  await page.goto("https://demoqa.com/webtables");

  const allRows = page.locator(".rt-tbody .rt-tr-group");
  const dataRows = allRows.filter({ hasText: "@" });

  const initialCount = await dataRows.count();

  const firstName = "Delete";
  const lastName = "Me";
  const email = "delete.me@example.com";
  const age = "30";
  const salary = "40000";
  const department = "QA";

  await page.locator("#addNewRecordButton").click();
  await page.locator("#firstName").fill(firstName);
  await page.locator("#lastName").fill(lastName);
  await page.locator("#userEmail").fill(email);
  await page.locator("#age").fill(age);
  await page.locator("#salary").fill(salary);
  await page.locator("#department").fill(department);
  await page.locator("#submit").click();

  const afterAddCount = await dataRows.count();
  await expect(afterAddCount).toBe(initialCount + 1);

  const addedRow = allRows.filter({ hasText: email });
  await addedRow.locator('[title="Delete"]').click();

  const afterDeleteCount = await dataRows.count();
  await expect(afterDeleteCount).toBe(initialCount);

  await expect(allRows.filter({ hasText: email })).toHaveCount(0);
});
