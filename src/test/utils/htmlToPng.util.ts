import puppeteer from 'puppeteer';

export const renderHtmlToPngBuffer = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    // set viewport so images are large enough
    await page.setViewport({ width: 1200, height: 800 });
    const buffer = await page.screenshot({ type: 'png', fullPage: false });
    return buffer as Buffer;
  } finally {
    await browser.close();
  }
};
