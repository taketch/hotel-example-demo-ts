import { Page, Locator } from '@playwright/test';
import { HeaderPage, LanguageOption } from './header.page';
import { PageUtils } from '../tests/utils/pageUtils';

// 言語構造を定義
interface LanguageLabels {
    h2: string;
    email: string;
    password: string;
    loginButton: string;
}

// 多言語対応
const LABELS: Record<LanguageOption, LanguageLabels> = {
    'ja': {
        h2: 'ログイン',
        email: 'メールアドレス',
        password: 'パスワード',
        loginButton: 'ログイン'
    },
    'en-US': {
        h2: 'This site is a sandbox to practice test automation.',
        email: 'Email',
        password: 'Password',
        loginButton: 'Login'
    }
};

export class Login extends HeaderPage {
    readonly h2Text: Locator;
    readonly emailLabel: Locator;
    readonly emailField: Locator;
    readonly passwordLabel: Locator;
    readonly passwordField: Locator;
    readonly loginButton2: Locator;

    constructor(page: Page) {
        super(page);
        
        this.h2Text = page.locator('h2');
        this.emailLabel = this.page.locator('label[for="email"]');
        this.emailField = this.page.locator('input[name="email"]');
        this.passwordLabel = this.page.locator('label[for="password"]');
        this.passwordField = this.page.locator('input[name="password"]');
        this.loginButton2 = this.page.locator('button').filter({ hasText: LABELS[this.language].loginButton });
    }

    // ラベル表示を取得
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
        return this.getLabel(this.emailLabel, 'email');
    }
    // パスワード入力欄のラベルを取得
    async getPasswordLabel(): Promise<{ actual: string, expect: string}> {
        return this.getLabel(this.passwordLabel, 'password');
    }
    // ログインボタン名を取得
    async getLoginButtonLabel(): Promise<{ actual: string; expect: string; }> {
        return this.getLabel(this.loginButton2, 'loginButton')
    }

    // ログイン
    async login({ email, password }): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton2.click();
    }
}