import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page.ts';
import { Login } from '../../pages/login.page.ts';
import { Signup } from '../../pages/signup.page.ts';
import { Mypage } from '../../pages/mypage.page.ts';
import { ScreenshotUtils } from '../utils/screenshotUtils';

test.describe('ログイン画面テスト', () => {
    let homepage: HomePage;
    let login: Login;
    let mypage: Mypage;

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        login = new Login(page);
        mypage = new Mypage(page);
        await homepage.goto();
        // 会員登録画面に遷移
        await homepage.gotoLoginPage();
    });

    test('ログイン画面への遷移の確認', async ({ page }, testInfo) => {
        // 会員登録
        const h2 = await login.getPageH2();
        await expect(h2.actual).toBe(h2.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo);
    });

    test('ログイン画面表示の確認', async ({ page }, testInfo) => {
        // メールアドレス
        const emailLabel = await login.getEmailLabel();
        await expect(emailLabel.actual).toBe(emailLabel.expect);
        // パスワード
        const passwordLabel = await login.getPasswordLabel();
        await expect(passwordLabel.actual).toBe(passwordLabel.expect);
        // ログインボタン
        const loginButtonLabel = await login.getLoginButtonLabel();
        await expect(loginButtonLabel.actual).toBe(loginButtonLabel.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo); 
    });

    test('ログインできることの確認', async ({ page }, testInfo) => {
        // トップページに遷移
        await homepage.gotoHomePage();

        // 会員登録してログアウト
        const signupUserInfo = {
            email: 'test@example.com',
            password: 'testtest',
            userName: 'テスト氏名',
            address: 'テスト住所',
            tel: '01234567890',
            birthday: '2000-12-03'
        };
        await homepage.gotoSignupPage();
        const sighup = new Signup(page);
        await sighup.signup(signupUserInfo);
        await homepage.logout();

        // ログインする
        await homepage.gotoLoginPage();
        await login.login({
            email: signupUserInfo.email,
            password: signupUserInfo.password
        });

        // マイページに遷移したことを確認
        const h2 = await mypage.getPageH2();
        await expect(h2.actual).toBe(h2.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo); 
    });
});