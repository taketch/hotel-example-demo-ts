import { Locator, Page } from '@playwright/test';

export class PageUtils {
    // 表示要素取得の共通化
    static async waitAndGetText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'attached', timeout: 30000 });
        return locator.innerText();
    }

    // クリックの共通化
    static async waitAndClick(locator: Locator, page?: Page): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
        if (page) {
            await page.waitForTimeout(500);
        }
    }

    // 値取得（inputフィールド用）
    static async waitAndGetValue(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible' });
        return locator.inputValue();
    }
}