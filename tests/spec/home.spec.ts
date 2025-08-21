import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page.ts';
import { ScreenshotUtils } from '../utils/screenshotUtils';

test.describe('ホーム画面テスト', () => {
    let homepage: HomePage;

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        await homepage.goto();
    });

    test('サイトタイトルの確認', async ({ page }, testInfo) => {
        await expect(homepage.getPageTitle()).resolves.toBe('HOTEL PLANISPHERE');

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo);
    });

    test('タブ表示の確認', async ({ page }, testInfo) => {
        const home = await homepage.getHomeTab();
        const reserve = await homepage.getReserveTab();
        const signup = await homepage.getSignupTab();
        const login = await homepage.getLoginTab();

        await expect(home.actual).toBe(home.expect);
        await expect(reserve.actual).toBe(reserve.expect);
        await expect(signup.actual).toBe(signup.expect);
        await expect(login.actual).toBe(login.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo);
    });

    test('ページ見出しの確認', async ({ page }, testInfo) => {
        const h2 = await homepage.getPageH2();
        await expect(h2.actual).toBe(h2.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo);
    });

});