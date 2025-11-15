import { test, expect } from "@playwright/test";
import path from "path";

test("TEXTBOX-001 ส่งฟอร์มครบถ้วน", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  await page.getByRole("textbox", { name: "First Name" }).fill("big");
  await page.getByRole("textbox", { name: "Last Name" }).fill("small");
  await page
    .getByRole("textbox", { name: "name@example.com" })
    .fill("big@gmail.com");
  await page.getByText("Male", { exact: true }).click();
  await page.getByRole("textbox", { name: "Mobile Number" }).fill("0123456789");

  await page.locator("#dateOfBirthInput").click();
  await page.getByRole("combobox").first().selectOption("2");
  await page.getByRole("combobox").nth(1).selectOption("2012");
  await page
    .getByRole("option", { name: "Choose Wednesday, February 29th," })
    .click();

  await page.locator("#subjectsInput").fill("math");
  await page.getByText("Maths", { exact: true }).click();

  await page.locator("label", { hasText: "Sports" }).click();
  await page.getByText("Reading").click();
  await page.getByText("Music").click();

  const filePath = path.join(__dirname, "test_upload.jpg");
  await page.locator("#uploadPicture").setInputFiles(filePath);

  await page.getByRole("textbox", { name: "Current Address" }).fill("191");

  await page.locator("#state").click();
  await page.getByText("Haryana", { exact: true }).click();

  await page.locator("#city").click();
  await page.getByText("Panipat", { exact: true }).click();

  await page.getByRole("button", { name: "Submit" }).click();

  const modal = page.locator(".modal-content");
  await expect(modal.locator("#example-modal-sizes-title-lg")).toContainText(
    "Thanks for submitting the form"
  );

  // 🔎 helper สำหรับดึง cell ฝั่ง Values ตาม label
  const valueCell = (label) =>
    modal.locator("tr").filter({ hasText: label }).locator("td").nth(1);

  await expect(valueCell("Student Name")).toHaveText("big small");
  await expect(valueCell("Student Email")).toHaveText("big@gmail.com");
  await expect(valueCell("Gender")).toHaveText("Male");
  await expect(valueCell("Mobile")).toHaveText("0123456789");

  await expect(valueCell("Date of Birth")).toContainText("29 February");
  await expect(valueCell("Date of Birth")).toContainText("2012");

  await expect(valueCell("Subjects")).toHaveText("Maths");
  await expect(valueCell("Hobbies")).toContainText("Sports, Reading, Music");
  await expect(valueCell("Picture")).toContainText("test_upload.jpg");
  await expect(valueCell("Address")).toHaveText("191");
  await expect(valueCell("State and City")).toHaveText("Haryana Panipat");

  // ซ่อนแบนเนอร์โฆษณาที่บังปุ่ม Close
  await page.evaluate(() => {
    const fixedBan = document.querySelector("#fixedban");
    if (fixedBan) fixedBan.style.display = "none";
  });

  await page.waitForTimeout(3000);

  await page.screenshot({ path: "screenshot.png", fullPage: true });

  await page.locator("#closeLargeModal").click();
});

test("TEXTBOX-002 Email รูปแบบไม่ถูกต้อง", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  await page.getByRole("textbox", { name: "First Name" }).fill("big");
  await page.getByRole("textbox", { name: "Last Name" }).fill("small");
  await page.getByRole("textbox", { name: "name@example.com" }).fill("big@");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.screenshot({ path: "screenshot.png", fullPage: true });

  // ถ้า email ไม่ถูกต้อง #userEmail จะ match selector :invalid
  await expect(page.locator("#userEmail:invalid")).toBeVisible();
});
