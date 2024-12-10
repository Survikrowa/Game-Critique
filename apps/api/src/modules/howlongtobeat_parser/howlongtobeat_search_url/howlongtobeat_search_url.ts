import puppeteer from 'puppeteer-extra';
import puppeteerStealth from 'puppeteer-extra-plugin-stealth';

interface HowLongToBeatSearchUrlFields {
  searchHash: string;
}

puppeteer.use(puppeteerStealth());

export class HowLongToBeatSearchUrl implements HowLongToBeatSearchUrlFields {
  public searchHash: string = '';

  async updateSearchHash() {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--single-process',
        '--no-zygote',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
      executablePath:
        process.env.NODE_ENV === 'production'
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
      timeout: 30_000,
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (request) => {
      console.log(request.url(), 'request.url()');
      if (request.url().includes('/find')) {
        this.searchHash = request.url().split('/').at(-1) || '';
        console.log(this.searchHash, 'searchHash');
      }
      request.continue();
    });
    await page.goto('https://howlongtobeat.com/', { waitUntil: 'load' });
    const inputSelector = 'input[name="site-search"]';
    await page.waitForSelector(inputSelector);
    await page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      input?.scrollIntoView();
      input?.click();
    }, inputSelector);
    await page.type(inputSelector, 'The', { delay: 120 });

    await page.waitForResponse((response) => {
      console.log(response.url(), 'response.url()');
      return (
        response.url().includes('/find') && response.url().includes('find')
      );
    });

    await browser.close();
  }
}
