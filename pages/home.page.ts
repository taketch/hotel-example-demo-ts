import { Page, Locator } from '@playwright/test';
import { HeaderPage, LanguageOption } from './header.page';
import { PageUtils } from '../tests/utils/pageUtils';

// 言語構造を定義
interface LanguageLabels {
    h2: string;
}

// 多言語対応
const LABELS: Record<LanguageOption, LanguageLabels> = {
    'ja': {
        h2: 'このサイトはテスト自動化の学習用の練習サイトです。'
    },
    'en-US': {
        h2: 'This site is a sandbox to practice test automation.'
    }
};

export class HomePage extends HeaderPage {
    readonly h2Text: Locator;

    constructor(page: Page) {
        super(page);
        
        this.h2Text = page.locator('h2').last();
    }

    // H2テキストを確認
    async getPageH2(): Promise<{ actual: string, expect: string }> {
        const actual = await PageUtils.waitAndGetText(this.h2Text);
        const expect = LABELS[this.language].h2;
        return { actual, expect};
    }
}
