const Browser = require("./Browser");
const browser = new Browser();
const timeout = 2000000;

beforeAll(async () => {
    browser.browserBuild();
}, timeout);

beforeEach(async () => {
    await browser.browserNavigate('https://www.jakepaul.com/collections/shop');
}, timeout);

afterAll(async () => {
    await browser.browserExit();
}, timeout);

test('boxing bullies', async() => {
    // const headingText = await element.getText();
    
    const element = await browser.getElementByCss('.Header__MainNav.hidden-pocket.hidden-lap');
    await element.click();
    await browser.waitForElementByCss('.SectionHeader__Heading Heading.u-h1');

    const boxingBullies = await browser.getElementByCss('.SectionHeader__Heading.Heading.u-h1');
    const text = await boxingBullies.getText();
    expect(text).toBe('Boxing Bullies');
}); 

// ('.ul.HorizontalList.HorizontalList.spacingExtraLoose > li:nth(2) > a')
// .HorizontalList__Item.is-expanded
