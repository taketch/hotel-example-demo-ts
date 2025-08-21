import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page.ts';
import { Signup, LABELS } from '../../pages/signup.page.ts';
import { Mypage } from '../../pages/mypage.page.ts';
import { ScreenshotUtils } from '../utils/screenshotUtils';

// 日付フォーマットを変換
function expectedBirthday(birthday) {
    const date = new Date(birthday);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

test.describe('会員登録画面テスト', () => {
    let homepage: HomePage;
    let signup: Signup;
    let mypage: Mypage;

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        signup = new Signup(page);
        mypage = new Mypage(page);
        await homepage.goto();
        // 会員登録画面に遷移
        await homepage.gotoSignupPage();
    });

    test('会員登録画面への遷移の確認', async ({ page }, testInfo) => {
        // 会員登録
        const h2 = await signup.getPageH2();
        await expect(h2.actual).toBe(h2.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo);
    });

    test('会員登録画面表示の確認', async ({ page }, testInfo) => {
        // メールアドレス
        const emailLabel = await signup.getEmailLabel();
        await expect(emailLabel.actual).toBe(emailLabel.expect);
        // パスワード
        const passwordLabel = await signup.getPasswordLabel();
        await expect(passwordLabel.actual).toBe(passwordLabel.expect);
        // パスワードルール
        const passwordRuleMessage = await signup.getPasswordRuleMessage();
        await expect(passwordRuleMessage.actual).toBe(passwordRuleMessage.expect);
        // パスワード（確認）
        const passwordConfirmationLabel = await signup.getPasswordConfirmationLabel();
        await expect(passwordConfirmationLabel.actual).toBe(passwordConfirmationLabel.expect);
        // パスワード（確認）ルール
        const passwordConfirmationRuleMessage = await signup.getPasswordConfirmationRuleMessage();
        await expect(passwordConfirmationRuleMessage.actual).toBe(passwordConfirmationRuleMessage.expect);
        // 氏名
        const userNameLabel = await signup.getUserNameLabel();
        await expect(userNameLabel.actual).toBe(userNameLabel.expect);
        // 会員種別（プレミアム会員）
        const rankPremiumLabel = await signup.getRankPremiumLabel();
        await expect(rankPremiumLabel.actual).toBe(rankPremiumLabel.expect);
        // 会員種別（プレミアム会員）
        const rankNormalLabel = await signup.getRankNormalLabel();
        await expect(rankNormalLabel.actual).toBe(rankNormalLabel.expect);
        // 住所
        const addressLabel = await signup.getAddressLabel();
        await expect(addressLabel.actual).toBe(addressLabel.expect);
        // 電話番号
        const telLabel = await signup.getTelLabel();
        await expect(telLabel.actual).toBe(telLabel.expect);
        // 電話番号ルール
        const telRuleMessage = await signup.getTelRuleMessage();
        await expect(telRuleMessage.actual).toBe(telRuleMessage.expect);
        // 性別
        const genderLabel = await signup.getGendarLabel();
        await expect(genderLabel.actual).toBe(genderLabel.expect);
        // 性別選択肢
        const gendarOptions = await signup.getGendarOptions();
        await expect(gendarOptions[0].label).toBe(LABELS[signup.language].genderOption1);
        await expect(gendarOptions[1].label).toBe(LABELS[signup.language].genderOption2);
        await expect(gendarOptions[2].label).toBe(LABELS[signup.language].genderOption3);
        await expect(gendarOptions[3].label).toBe(LABELS[signup.language].genderOption4);
        // 生年月日
        const birthdayLabel = await signup.getBirthdayLabel();
        await expect(birthdayLabel.actual).toBe(birthdayLabel.expect);
        // お知らせ
        const notificationLabel = await signup.getNotificationLabel();
        await expect(notificationLabel.actual).toBe(notificationLabel.expect);
        // 登録ボタン
        const registerButtonLabel = await signup.getRegisterButtonLabel();
        await expect(registerButtonLabel.actual).toBe(registerButtonLabel.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo); 
    });

    test('会員登録できることの確認', async ({ page }, testInfo) => {
        const sighup = new Signup(page);

        // 登録情報
        const signupUserInfo = {
            email: 'test@example.com',
            password: 'testtest',
            userName: 'テスト氏名',
            address: 'テスト住所',
            tel: '01234567890',
            birthday: '2000-12-03'
        };
        // 会員登録
        await sighup.signup(signupUserInfo);

        // ホーム画面への遷移をページ見出しで確認
        const h2 = await mypage.getPageH2();
        await expect(h2.actual).toBe(h2.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo);
    });
});