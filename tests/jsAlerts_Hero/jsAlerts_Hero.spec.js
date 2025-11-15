import { test, expect } from "@playwright/test";

test("JSALERT-010 Accept Alert", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("I am a JS Alert");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Click for JS Alert" }).click();

  await expect(page.locator("#result")).toHaveText(
    "You successfully clicked an alert"
  );
});

test("TJSALERT-011 Confirm → Cancel", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("I am a JS Confirm");

    await dialog.dismiss();
  });

  await page.getByRole("button", { name: "Click for JS Confirm" }).click();

  await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
});

test("JSALERT-012 Prompt → ป้อนข้อความ", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("I am a JS prompt");

    await dialog.accept("hello");
  });

  await page.getByRole("button", { name: "Click for JS Prompt" }).click();

  await expect(page.locator("#result")).toHaveText("You entered: hello");
});
