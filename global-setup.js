// global-setup.js
const { chromium } = require("@playwright/test");

module.exports = async (config) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("**/inventory.html");

  // เก็บ state ลงไฟล์ ใช้ path แบบเดียวกับใน config
  await page.context().storageState({ path: "storageState.json" });

  await browser.close();
};
