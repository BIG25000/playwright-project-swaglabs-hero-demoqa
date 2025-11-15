import { test, expect } from "@playwright/test";

test("PRODUCT-010 แสดงรายการสินค้า 6 รายการ", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");

  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Products")).toBeVisible();

  const products = page.locator(".inventory_item");

  await expect(products).toHaveCount(6);

  const productCount = await products.count();

  for (let i = 0; i < productCount; i++) {
    const item = products.nth(i);

    await expect(item.locator(".inventory_item_name")).toBeVisible();

    await expect(item.locator(".inventory_item_price")).toBeVisible();

    await expect(
      item.getByRole("button", { name: /add to cart/i })
    ).toBeVisible();
  }
});

test("PRODUCT-011 Sort ราคาจากน้อยไปมาก", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");

  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Products")).toBeVisible();

  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption("lohi");
  //   await page
  //     .locator('[data-test="product-sort-container"]')
  //     .selectOption("hilo");

  const names = await page.locator(".inventory_item_name").allInnerTexts();
  const priceTexts = await page
    .locator(".inventory_item_price")
    .allInnerTexts();
  const prices = priceTexts.map((t) => parseFloat(t.replace("$", "")));

  const expectedNames = [
    "Sauce Labs Onesie",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Test.allTheThings() T-Shirt (Red)",
    "Sauce Labs Backpack",
    "Sauce Labs Fleece Jacket",
  ];

  await expect(names).toHaveLength(6);

  expect(names).toEqual(expectedNames);

  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});

test("PRODUCT-012 เปิดรายละเอียดสินค้า", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");

  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Products")).toBeVisible();

  await page.locator('[data-test="item-4-img-link"]').click();

  await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);

  await expect(
    page.locator('[data-test="item-sauce-labs-backpack-img"]')
  ).toBeVisible();

  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(
    "Sauce Labs Backpack"
  );

  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText(
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
  );

  await expect(
    page.locator('[data-test="inventory-item-price"]')
  ).toContainText("$29.99");
});
