// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  globalSetup: require.resolve("./global-setup.js"),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    screenshot: "on",

    video: "retain-on-failure",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "authenticated",
      use: { ...devices["Desktop Chrome"], storageState: "storageState.json" },
      testMatch: ["auth/**"],
    },
    {
      name: "guest",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["guest/**"],
    },
    {
      name: "login_Swag_Labs",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["login_Swag_Labs/**"],
    },
    {
      name: "product_list_Swag_Labs",
      use: { ...devices["Desktop Chrome"], storageState: "storageState.json" },
      testMatch: ["product_list_Swag_Labs/**"],
    },
    {
      name: "cart_Swag_Labs",
      use: { ...devices["Desktop Chrome"], storageState: "storageState.json" },
      testMatch: ["cart_Swag_Labs/**"],
    },
    {
      name: "checkBox_Hero",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["checkBox_Hero/**"],
    },
    {
      name: "jsAlerts_Hero",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["jsAlerts_Hero/**"],
    },
    {
      name: "fileUpload_Hero",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["fileUpload_Hero/**"],
    },
    {
      name: "loading_Hero",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["loading_Hero/**"],
    },
    {
      name: "textBox_DemoQA",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["textBox_DemoQA/**"],
    },
    {
      name: "webTable_DemoQA",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["webTable_DemoQA/**"],
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
