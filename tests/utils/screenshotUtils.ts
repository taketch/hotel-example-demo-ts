import { Page, TestInfo } from '@playwright/test';
import path from 'path';

export class ScreenshotUtils {
  static async takeScreenshot(page: Page, testInfo: TestInfo): Promise<void> {
    await page.waitForTimeout(1000);

    const fileName = path.basename(testInfo.file);
    const screenshotName = `${fileName} - ${testInfo.title} - ${testInfo.project.name}.png`;
    const screenshotPath = path.join('test-results', screenshotName);

    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
  }
}