// Re-export the base Playwright test fixture
// Extend or customize test/expect here if needed

import { test as baseTest, expect as baseExpect } from "@playwright/test";

export const test = baseTest;
export const expect = baseExpect;