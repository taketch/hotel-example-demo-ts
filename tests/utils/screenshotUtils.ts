import { Page, TestInfo } from '@playwright/test';

export class ScreenshotUtils {
  static async takeScreenshot(page: Page, testInfo: TestInfo): Promise<void> {
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `./test-results/${testInfo.file.split('/').pop()} - ${testInfo.title} - ${testInfo.project.name}.png`, fullPage: true });
  }
}