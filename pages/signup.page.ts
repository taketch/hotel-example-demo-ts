import { Page, Locator } from '@playwright/test';
import { HeaderPage, LanguageOption } from './header.page';
import { PageUtils } from '../tests/utils/pageUtils';

// 言語構造を定義
interface LanguageLabels {
    h2: string;
    required: string;
    email: string;
    password: string;
    passwordRule: string;
    passwordConfirmation: string;
    passwordConfirmationRule: string;
    userName: string;
    member1: string;
    member2: string;
    address: string;
    tel: string;
    telRule: string;
    gender: string;
    genderOption1: string;
    genderOption2: string;
    genderOption3: string;
    genderOption4: string;
    birthday: string;
    notification: string;
    registerButton: string;
}

// 多言語対応
export const LABELS: Record<LanguageOption, LanguageLabels> = {
    'ja': {
        h2: '会員登録',
        required: '必須',
        email: 'メールアドレス',
        password: 'パスワード',
        passwordRule: '8文字以上で入力してください。',
        passwordConfirmation: 'パスワード（確認）',
        passwordConfirmationRule: '確認のため再度パスワードを入力してください。',
        userName: '氏名',
        member1: 'プレミアム会員',
        member2: '一般会員',
        address: '住所',
        tel: '電話番号',
        telRule: '11桁の数字で入力してください。例：01133335555',
        gender: '性別',
        genderOption1: '回答しない',
        genderOption2: '男性',
        genderOption3: '女性',
        genderOption4: 'その他',
        birthday: '生年月日',
        notification: 'お知らせを受け取る',
        registerButton: '登録'
    },
    'en-US': {
        h2: 'Sign up',
        required: 'required',
        email: 'Email',
        password: 'Password',
        passwordRule: 'Please lengthen this text to 8 characters.',
        passwordConfirmation: 'Password (confirmation)',
        passwordConfirmationRule: 'Please enter your password again to confirm.',
        userName: 'Name',
        member1: 'PREMIUM Membership',
        member2: 'Membership',
        address: 'Address',
        tel: 'Tel',
        telRule: 'Please enter 11-digit number. Ex: 01133335555',
        gender: 'Gender',
        genderOption1: 'I do not answer.',
        genderOption2: 'male',
        genderOption3: 'female',
        genderOption4: 'other',
        birthday: 'Date of birth',
        notification: 'Receive notification',
        registerButton: 'Sign up'
    }
};

export class Signup extends HeaderPage {
    readonly h2Text: Locator;
    readonly emailLabel: Locator;
    readonly emailField: Locator;
    readonly passwordLabel: Locator;
    readonly passwordField: Locator;
    readonly passwordRule: Locator;
    readonly passwordConfirmationLabel: Locator;
    readonly passwordConfirmationField: Locator;
    readonly passwordConfirmationRule: Locator;
    readonly userNameLabel: Locator;
    readonly userNameField: Locator;
    readonly member1: Locator;
    readonly member2: Locator;
    readonly addressLabel: Locator;
    readonly addressField: Locator;
    readonly telLabel: Locator;
    readonly telField: Locator;
    readonly telRule: Locator;
    readonly genderLabel: Locator;
    readonly genderOptions: Locator;
    readonly birthdayLabel: Locator;
    readonly birthdayField: Locator;
    readonly notificationLabel: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        super(page);
        
        this.h2Text = page.locator('h2').last();
        this.emailLabel = this.page.locator('label[for="email"]');
        this.emailField = this.page.locator('input[name="email"]');
        this.passwordLabel = this.page.locator('label[for="password"]');
        this.passwordField = this.page.locator('input[name="password"]');
        this.passwordRule = this.page.locator('div.form-group').locator('small.form-text.text-muted').nth(0);
        this.passwordConfirmationLabel = this.page.locator('label[for="password-confirmation"]');
        this.passwordConfirmationField = this.page.locator('input[name="password-confirmation"]');
        this.passwordConfirmationRule = this.page.locator('div.form-group').locator('small.form-text.text-muted').nth(1);
        this.userNameLabel = this.page.locator('label[for="username"]')
        this.userNameField = this.page.locator('input[name="username"]');
        this.member1 = this.page.locator('label[for="rank-premium"]');
        this.member2 = this.page.locator('label[for="rank-normal"]');
        this.addressLabel = this.page.locator('label[for="address"]');
        this.addressField = this.page.locator('input[name="address"]');
        this.telLabel = this.page.locator('label[for="tel"]');
        this.telField = this.page.locator('input[name="tel"]');
        this.telRule = this.page.locator('div.form-group').locator('small.form-text.text-muted').nth(2);
        this.genderLabel = this.page.locator('label[for="gender"]');
        this.genderOptions = this.page.locator('select[id="gender"] option');
        this.birthdayLabel = this.page.locator('label[for="birthday"]');
        this.birthdayField = this.page.locator('input[name="birthday"]');
        this.notificationLabel = this.page.locator('label[for="notification"]');
        this.registerButton = this.page.locator('button').filter({ hasText: LABELS[this.language].registerButton }); 
    }

    // 必須ラベルありのラベル表示を取得
    private async getLabelWithRequired(locator: Locator, labelName: keyof LanguageLabels): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(locator);
        const expect = `${LABELS[this.language][labelName]} ${LABELS[this.language].required}`;
        return { actual, expect };
    }
    // 必須ラベルなしのラベル表示を取得
    private async getLabel(locator: Locator, labelName: keyof LanguageLabels): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(locator);
        const expect = LABELS[this.language][labelName];
        return { actual, expect };
    }

    // H2テキストを確認
    async getPageH2(): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(this.h2Text);
        const expect = LABELS[this.language].h2;
        return { actual, expect};
    }
    // メールアドレス入力欄のラベルを取得
    async getEmailLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabelWithRequired(this.emailLabel, 'email');
    }
    // パスワード入力欄のラベルを取得
    async getPasswordLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabelWithRequired(this.passwordLabel, 'password');
    }
    // パスワード入力欄の条件メッセージを取得
    async getPasswordRuleMessage(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.passwordRule, 'passwordRule');
    }
    // パスワード（確認）入力欄のラベルを取得
    async getPasswordConfirmationLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabelWithRequired(this.passwordConfirmationLabel, 'passwordConfirmation');
    }
    // パスワード（確認）入力欄の条件メッセージを取得
    async getPasswordConfirmationRuleMessage(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.passwordConfirmationRule, 'passwordConfirmationRule');
    }
    // 氏名入力欄のラベルを取得
    async getUserNameLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabelWithRequired(this.userNameLabel, 'userName');
    }
    // 会員種別の選択肢（プレミアム会員）ラベルを取得
    async getRankPremiumLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.member1, 'member1');
    }
    // 会員種別の選択肢（一般会員）ラベルを取得
    async getRankNormalLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.member2, 'member2');
    }
    // 住所入力欄のラベルを取得
    async getAddressLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.addressLabel, 'address');
    }
    // 住所入力欄のラベルを取得
    async getTelLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.telLabel, 'tel');
    }
    // 電話番号入力欄の条件メッセージを取得
    async getTelRuleMessage(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.telRule, 'telRule');
    }
    // 性別プルダウンメニューのラベルを取得
    async getGendarLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.genderLabel, 'gender');
    }
    // 性別プルダウンメニューの選択肢を取得
    async getGendarOptions(): Promise<Array<{ value: string, label: string }>> {
        const options = await this.genderOptions.all();
        const results: Array<{ value: string, label: string }> = [];

        for (const option of options) {
            const value = await option.getAttribute('value') || '';
            const label = await option.textContent() || '';
            results.push({ value, label });
        }
        return results;
    }
    // 生年月日入力欄のラベルを取得
    async getBirthdayLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.birthdayLabel, 'birthday');
    }
    // 生年月日入力欄のラベルを取得
    async getNotificationLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.notificationLabel, 'notification');
    }
    // 登録ボタン名を取得
    async getRegisterButtonLabel(): Promise<{ actual: string; expect: string; }> {
        return this.getLabel(this.registerButton, 'registerButton')
    }
    
    // 会員登録
    async signup({ email, password, userName, address, tel, birthday }): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.passwordConfirmationField.fill(password);
        await this.userNameField.fill(userName);
        await this.addressField.fill(address);
        await this.telField.fill(tel);
        await this.birthdayField.fill(birthday);
        await this.registerButton.click();
        await this.page.waitForTimeout(500);
    }
}
