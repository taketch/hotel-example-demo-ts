import { Page, Locator, expect } from '@playwright/test';
import { HeaderPage, LanguageOption } from './header.page';
import { PageUtils } from '../tests/utils/pageUtils';

// 言語構造を定義
interface LanguageLabels {
    h2: string;
    email: string;
    userName: string;
    membership: string;
    address: string;
    tel: string;
    gender: string;
    birthday: string;
    notification: string;
    iconSettingButton: string;
    deleteAccountButton: string;
    deletedMessage: string;
}

// 多言語対応
export const LABELS: Record<LanguageOption, LanguageLabels> = {
    'ja': {
        h2: 'マイページ',
        email: 'メールアドレス',
        userName: '氏名',
        membership: '会員ランク',
        address: '住所',
        tel: '電話番号',
        gender: '性別',
        birthday: '生年月日',
        notification: 'お知らせ',
        iconSettingButton: 'アイコン設定',
        deleteAccountButton: '退会する',
        deletedMessage: '退会処理を完了しました。ご利用ありがとうございました。'
    },
    'en-US': {
        h2: 'MyPage',
        email: 'Email',
        userName: 'Name',
        membership: 'Membership',
        address: 'Address',
        tel: 'Tel',
        gender: 'Gender',
        birthday: 'Date of birth',
        notification: 'notification',
        iconSettingButton: 'Icon Setting',
        deleteAccountButton: 'Delete Account',
        deletedMessage: ''
    }
};

export class Mypage extends HeaderPage {
    readonly h2Text: Locator;
    readonly emailLabel: Locator;
    readonly emailValue: Locator;
    readonly userNameLabel: Locator;
    readonly userNameValue: Locator;
    readonly membershipLabel: Locator;
    readonly membershipValue: Locator;
    readonly addressLabel: Locator;
    readonly addressValue: Locator;
    readonly telLabel: Locator;
    readonly telValue: Locator;
    readonly genderLabel: Locator;
    readonly genderValue: Locator;
    readonly birthdayLabel: Locator;
    readonly birthdayValue: Locator;
    readonly notificationLabel: Locator;
    readonly notificationValue: Locator;
    readonly iconSettingButton: Locator;
    readonly deleteAccountButton: Locator;

    constructor(page: Page) {
        super(page);

        // 各項目のラベルのセレクター（変更されたときのメンテを考慮して）
        const labelSelector = 'h5';
        
        this.h2Text = page.locator('h2').last();
        this.emailLabel = this.page.locator('h5').nth(0);
        this.emailValue = this.page.locator('p#email');
        this.userNameLabel = this.page.locator('h5').nth(1);
        this.userNameValue = this.page.locator('p#username');
        this.membershipLabel = this.page.locator('h5').nth(2);
        this.membershipValue = this.page.locator('p#rank');
        this.addressLabel = this.page.locator('h5').nth(3);
        this.addressValue = this.page.locator('p#address');
        this.telLabel = this.page.locator('h5').nth(4);
        this.telValue = this.page.locator('p#tel');
        this.genderLabel = this.page.locator('h5').nth(5);
        this.genderValue = this.page.locator('p#gender');
        this.birthdayLabel = this.page.locator('h5').nth(6);
        this.birthdayValue = this.page.locator('p#birthday');
        this.notificationLabel = this.page.locator('h5').nth(7);
        this.notificationValue = this.page.locator('p#notification');
        this.iconSettingButton = this.page.locator('a#icon-link.btn.btn-primary.btn-block.disabled');
        this.deleteAccountButton = this.page.locator('button').filter({ hasText: LABELS[this.language].deleteAccountButton }); 
    }

    // ラベル表示を取得
    private async getLabel(locator: Locator, labelName: keyof LanguageLabels): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(locator);
        const expect = LABELS[this.language][labelName];
        return { actual, expect };
    }
    // 入力値を取得
    private async getValue(locator: Locator): Promise<string> {
        return await PageUtils.waitAndGetText(locator);
    }

    // H2テキストを確認
    async getPageH2(): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(this.h2Text);
        const expect = LABELS[this.language].h2;
        return { actual, expect};
    }
    // メールアドレスのラベルを取得
    async getEmailLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.emailLabel, 'email');
    }
    // メールアドレスの入力値を取得
    async getEmailValue(): Promise<string> {
        return this.getValue(this.emailValue);
    }
    // 氏名のラベルを取得
    async getUserNameLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.userNameLabel, 'userName');
    }
    // 氏名の入力値を取得
    async getUserNameValue(): Promise<string> {
        return this.getValue(this.userNameValue);
    }
    // 会員ランクのラベルを取得
    async getMembershipLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.membershipLabel, 'membership');
    }
    // 会員ランクの入力値を取得
    async getMembershipValue(): Promise<string> {
        return this.getValue(this.membershipValue);
    }
    // 住所のラベルを取得
    async getAddressLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.addressLabel, 'address');
    }
    // 住所の入力値を取得
    async getAddressValue(): Promise<string> {
        return this.getValue(this.addressValue);
    }
    // 電話のラベルを取得
    async getTelLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.telLabel, 'tel');
    }
    // 電話の入力値を取得
    async getTelValue(): Promise<string> {
        return this.getValue(this.telValue);
    }
    // 性別のラベルを取得
    async getGenderLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.genderLabel, 'gender');
    }
    // 性別の入力値を取得
    async getGenderValue(): Promise<string> {
        return this.getValue(this.genderValue);
    }
    // 生年月日のラベルを取得
    async getBirthdayLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.birthdayLabel, 'birthday');
    }
    // 生年月日の入力値を取得
    async getBirthdayValue(): Promise<string> {
        return this.getValue(this.birthdayValue);
    }
    // お知らせのラベルを取得
    async getNotificationLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.notificationLabel, 'notification');
    }
    // お知らせの入力値を取得
    async getNotificationValue(): Promise<string> {
        return this.getValue(this.notificationValue);
    }
    // アイコン設定ボタンのラベルを取得
    async getIconSettingButtonLabel(): Promise<string> {
        return this.getValue(this.iconSettingButton);
    }
    // アイコン設定ボタンをクリック
    async clickIconSettingButton(): Promise<void> {
        this.iconSettingButton.click();
    }
    // 退会するボタンのラベルを取得
    async getDeleteAccountButtonLabel(): Promise<string> {
        return this.getValue(this.deleteAccountButton);
    }
    // 退会するボタンをクリック
    async clickDeleteAccountButton(): Promise<void> {
        await this.deleteAccountButton.click();
    }
    // 退会する > ダイアログでOKをクリック
    async deleteAccountOk(): Promise<void> {
        // ダイアログハンドラーを準備
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await this.deleteAccountButton.click();
    }
    // 退会する > ダイアログでキャンセルをクリック
    async deleteAccountCancel(): Promise<void> {
        // ダイアログハンドラーを準備
        this.page.on('dialog', async dialog => {
            await dialog.dismiss();
        });
        await this.deleteAccountButton.click();
    }
}
