import { Page, Locator } from '@playwright/test';
import { SpecConfig } from '../tests/config/specConfig';
import { PageUtils } from '../tests/utils/pageUtils';

export type LanguageOption = 'ja' | 'en-US';

// 言語構造を定義
interface LanguageLabels {
    homePage: string;
    reserve: string;
    signup: string;
    login: string;
    mypage: string;
    logout: string;
}

// 多言語対応
const LABELS: Record<LanguageOption, LanguageLabels> = {
    'ja': {
        homePage: 'ホーム',
        reserve: '宿泊予約',
        signup: '会員登録',
        login: 'ログイン',
        mypage: 'マイページ',
        logout: 'ログアウト'
    },
    'en-US': {
        homePage: 'Home',
        reserve: 'Reserve',
        signup: 'Sign up',
        login: 'Login',
        mypage: 'My page',
        logout: 'Logout'
    }
};

export abstract class HeaderPage {
    readonly page: Page;
    readonly language: LanguageOption;

    readonly pageTitle: Locator;
    readonly homePageLink: Locator;
    readonly reserveLink: Locator;
    readonly signupLink: Locator;
    readonly loginButton: Locator;
    readonly mypageLink: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.language = this.getFromUrl();

        this.pageTitle = page.locator('h1');
        const labels = LABELS[this.language];
        this.homePageLink = page.locator('a.nav-link').filter({ hasText: labels.homePage });
        this.reserveLink = page.locator('a.nav-link').filter({ hasText: labels.reserve });
        this.signupLink = page.locator('a.nav-link').filter({ hasText: labels.signup });
        this.loginButton = page.locator('a.btn').filter({ hasText: labels.login });
        this.mypageLink = page.locator('a.btn').filter({ hasText: labels.mypage });
        this.logoutButton = page.locator('button').filter({ hasText: labels.logout });
    }

    // URLから言語判定（デフォルトはja）
    private getFromUrl(): LanguageOption {
        // 環境変数を優先
        const envLang = process.env.LANGUAGE;
        if (envLang === 'en-US') return 'en-US';
        if (envLang === 'ja') return 'ja';
        
        // URLから判定
        const url = this.page.url();
        if (url.includes('/en-US/')) return 'en-US';
        
        return 'ja';
    }

    // 指定した言語のページにアクセス（デフォルト ja）
    async goto(): Promise<void> {
        const language = process.env.LANGUAGE || 'ja';
        const url = `${SpecConfig.baseURL}/${language}/`;
        await this.page.goto(url);
    }

    // ページタイトルを取得
    async getPageTitle(): Promise<string> {
        return await PageUtils.waitAndGetText(this.pageTitle);
    }

    // 「ホーム」タブの表示テキストを取得
    async getHomeTab(): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(this.homePageLink);
        const expect = LABELS[this.language].homePage;
        return { actual, expect };
    }

    // ホームページに移動
    async gotoHomePage(): Promise<void> {
        await PageUtils.waitAndClick(this.homePageLink);
    }

    // 「宿泊予約」タブの表示テキストを取得
    async getReserveTab(): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(this.reserveLink);
        const expect = LABELS[this.language].reserve;
        return { actual, expect };
    }

    // 宿泊予約ページに移動
    async gotoReservePage(): Promise<void> {
        await PageUtils.waitAndClick(this.reserveLink);
    }

    // 「会員登録」タブの表示テキストを取得
    async getSignupTab(): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(this.signupLink);
        const expect = LABELS[this.language].signup;
        return { actual, expect };
    }

    // 会員登録ページに移動
    async gotoSignupPage(): Promise<void> {
        await PageUtils.waitAndClick(this.signupLink);
    }

    // 「ログイン」ボタンの表示テキストを取得
    async getLoginTab(): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(this.loginButton);
        const expect = LABELS[this.language].login;
        return { actual, expect };
    }

    // ログインページに移動
    async gotoLoginPage(): Promise<void> {
        await PageUtils.waitAndClick(this.loginButton);
    }

    // 「マイページ」タブの表示テキストを取得
    async getMypageTab(): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(this.mypageLink);
        const expect = LABELS[this.language].mypage;
        return { actual, expect };
    }

    // マイページに移動
    async gotoMypage(): Promise<void> {
        await PageUtils.waitAndClick(this.mypageLink);
    }

    // 「ログアウト」ボタンの表示テキストを取得
    async getLogoutTab(): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(this.logoutButton);
        const expect = LABELS[this.language].logout;
        return { actual, expect };
    }

    // ログアウトする
    async logout(): Promise<void> {
        await PageUtils.waitAndClick(this.logoutButton);
    }
}