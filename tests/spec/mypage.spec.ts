import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page.ts';
import { Signup } from '../../pages/signup.page.ts';
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

test.describe('マイページ画面テスト', () => {
    let homepage: HomePage;
    let sighup: Signup;
    let mypage: Mypage;
    let signupUserInfo: any;

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        sighup = new Signup(page);
        mypage = new Mypage(page);
        await homepage.goto();

        // 登録情報
        signupUserInfo = {
            email: 'test@example.com',
            password: 'testtest',
            userName: 'テスト氏名',
            address: 'テスト住所',
            tel: '01234567890',
            birthday: '2000-12-03'
        };

        // 会員登録ページに遷移
        await homepage.gotoSignupPage();
        // 会員登録
        await sighup.signup(signupUserInfo);
    });

    test('マイページ画面への遷移の確認', async ({ page }, testInfo) => {
        const h2 = await mypage.getPageH2();
        await expect(h2.actual).toBe(h2.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo); 
    });

    test('マイページ画面のラベル表示の確認', async ({ page }, testInfo) => {
        // メールアドレス
        const emailLabel = await mypage.getEmailLabel();
        await expect(emailLabel.actual).toBe(emailLabel.expect);
        // 氏名
        const userNameLabel = await mypage.getUserNameLabel();
        await expect(userNameLabel.actual).toBe(userNameLabel.expect);
        // 会員ランク
        const membershipLabel = await mypage.getMembershipLabel();
        await expect(membershipLabel.actual).toBe(membershipLabel.expect);
        // 住所
        const addressLabel = await mypage.getAddressLabel();
        await expect(addressLabel.actual).toBe(addressLabel.expect);
        // 電話番号
        const telLabel = await mypage.getTelLabel();
        await expect(telLabel.actual).toBe(telLabel.expect);
        // 性別
        const genderLabel = await mypage.getGenderLabel();
        await expect(genderLabel.actual).toBe(genderLabel.expect);
        // 生年月日
        const birthdayLabel = await mypage.getBirthdayLabel();
        await expect(birthdayLabel.actual).toBe(birthdayLabel.expect);
        // お知らせ
        const notificationLabel = await mypage.getNotificationLabel();
        await expect(notificationLabel.actual).toBe(notificationLabel.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo); 
    });

    test('マイページ画面の登録情報表示の確認', async ({ page }, testInfo) => {
        // メールアドレス
        const emailValue = await mypage.getEmailValue();
        await expect(emailValue).toBe(signupUserInfo.email);
        // 氏名
        const userNameValue = await mypage.getUserNameValue();
        await expect(userNameValue).toBe(signupUserInfo.userName);
        // 会員ランク
        const membershipValue = await mypage.getMembershipValue();
        if (mypage.language === 'ja') {
            await expect(membershipValue).toBe('プレミアム会員');
        } else {
            await expect(membershipValue).toBe('Premium');
        }
        // 住所
        const addressValue = await mypage.getAddressValue();
        await expect(addressValue).toBe(signupUserInfo.address);
        // 電話番号
        const telValue = await mypage.getTelValue();
        await expect(telValue).toBe(signupUserInfo.tel);
        // 性別
        const genderValue = await mypage.getGenderValue();
        if (mypage.language === 'ja') {
            await expect(genderValue).toBe('未登録');
        } else {
            await expect(genderValue).toBe('not answered');
        }
        // 生年月日
        const birthdayValue = await mypage.getBirthdayValue();
        await expect(birthdayValue).toBe(expectedBirthday(signupUserInfo.birthday));
        // お知らせ
        const notificationValue = await mypage.getNotificationValue();
        if (mypage.language === 'ja') {
            await expect(notificationValue).toBe('受け取らない');
        } else {
            await expect(notificationValue).toBe('not received');
        }

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo); 
    });

    test('マイページ画面のアイコン設定ボタンの確認', async ({ page }, testInfo) => {
        // ラベル確認
        const iconSettingButtonLabel = await mypage.getIconSettingButtonLabel();
        if (mypage.language === 'ja') {
            await expect(iconSettingButtonLabel).toBe('アイコン設定');
        } else {
            await expect(iconSettingButtonLabel).toBe('Icon Setting');
        }
        // 遷移確認
        await mypage.clickIconSettingButton();
        // アイコン変更のページオブジェクトを作ってH2を確認

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo); 
    });

    test('マイページ画面の退会するボタンの確認（キャンセル）', async ({ page }, testInfo) => {
        // ラベル確認
        const deleteAccountButtonLabel = await mypage.getDeleteAccountButtonLabel();
        if (mypage.language === 'ja') {
            await expect(deleteAccountButtonLabel).toBe('退会する');
        } else {
            await expect(deleteAccountButtonLabel).toBe('Delete Account');
        }
        // ダイアログでキャンセル確認
        await mypage.deleteAccountCancel();
        // キャンセルしてマイページに戻っていることを確認
        const h2 = await mypage.getPageH2();
        await expect(h2.actual).toBe(h2.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo); 
    });

    test('マイページ画面の退会するボタンの確認（退会実行）', async ({ page }, testInfo) => {
        // ラベル確認
        const deleteAccountButtonLabel = await mypage.getDeleteAccountButtonLabel();
        if (mypage.language === 'ja') {
            await expect(deleteAccountButtonLabel).toBe('退会する');
        } else {
            await expect(deleteAccountButtonLabel).toBe('Delete Account');
        }
        // ダイアログで退会実行確認
        await mypage.deleteAccountOk();
        // 削除実行してトップページに戻っていることを確認
        const h2 = await homepage.getPageH2();
        await expect(h2.actual).toBe(h2.expect);

        // エビデンス取得
        await ScreenshotUtils.takeScreenshot(page, testInfo); 
    });
});