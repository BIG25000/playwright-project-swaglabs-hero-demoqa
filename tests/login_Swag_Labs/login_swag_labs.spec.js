import { test, expect } from "@playwright/test";

test("LOGIN_001 Valid login – standard_user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  //เข้าหน้า Products สำเร็จ
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
});

test("LOGIN_002 Empty username", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  //แสดง error ว่าต้องกรอก username
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username is required"
  );
});

test("LOGIN_003 Empty password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.getByRole("button", { name: "Login" }).click();
  //แสดง error ว่าต้องกรอก password
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Password is required"
  );
});

test("LOGIN_004 Invalid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("9999");
  await page.getByRole("button", { name: "Login" }).click();
  //แสดง error “Username and password do not match…”
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
