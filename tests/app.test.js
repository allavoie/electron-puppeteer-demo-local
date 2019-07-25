const electron = require("electron");
const puppeteer = require("puppeteer-core");
const cp = require("child_process");

let page;

jest.setTimeout(50000);
const timeout = ms => new Promise(res => setTimeout(res, ms))

beforeAll(async () => {
  cp.spawn(electron, [". --remote-debugging-port=9200"], {
    shell: true
  });

  await timeout(3000);

  const browser = await puppeteer.connect({
    browserURL: "http://localhost:9200",
    defaultViewport: { width: 1000, height: 600 }
  });

  const pages = await browser.pages();
  [page] = pages;
});

afterAll(async () => {
  if (page) {
    await page.close();
  }
});

describe("App", () => {
  test("Text ok", async () => {
    await page.waitForSelector("#demo");
    const text = await page.$eval("#demo", e => e.innerText);
    await page.screenshot({path: 'example.png'});
    expect(text).toBe("Demo of Electron + Puppeteer + Jest.");
  });
});
