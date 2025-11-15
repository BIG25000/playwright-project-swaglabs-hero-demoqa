import { test, expect } from "@playwright/test";

const path = require("path");

test("FUPLOAD-020 อัปโหลดไฟล์ .txt", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");

  const filePath = path.join(__dirname, "sample.txt");

  console.log("filePath =", filePath);

  await page.locator("#file-upload").setInputFiles(filePath);
  await page.locator("#file-submit").click();

  await expect(page.locator("#uploaded-files")).toHaveText("sample.txt");
});
