import puppeteer from 'puppeteer-extra';
import puppeteerStealth from 'puppeteer-extra-plugin-stealth';

interface HowLongToBeatSearchUrlFields {
  searchHash: string;
}
puppeteer.use(puppeteerStealth());
export class HowLongToBeatSearchUrl implements HowLongToBeatSearchUrlFields {
  public searchHash: string = '';
  async updateSearchHash() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (request) => {
      if (request.url().includes('/search')) {
        this.searchHash = request.url().split('/').at(-1) || '';
        console.log(this.searchHash, 'searchHash');
      }
      request.continue();
    });

    await page.goto('https://howlongtobeat.com/', { waitUntil: 'load' });
    const inputSelector = 'input[name="site-search"]';
    await page.waitForSelector(inputSelector);
    await page.click(inputSelector);
    await page.type(inputSelector, 'T', { delay: 120 });
    await page.waitForRequest((request) => request.url().includes('/search'));

    await browser.close();
  }
}
