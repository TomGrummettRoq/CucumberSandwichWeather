
const Browser = require("./Browser");
const browser = new Browser();
const timeout = 20000;

beforeAll(async () => {
    browser.browserBuild();
}, timeout);

beforeEach(async () => {
    await browser.browserNavigate('https://www.netflix.com/gb/');
}, timeout);

afterAll(async () => {
    await browser.browserExit();
}, timeout);

test('Has Sign In Button', async() => {
    const element = await browser.getElementByCss('.authLinks.redButton');
    const text = await element.getText();
    expect(text).toBe('Sign In');
}); 

test('Sign In link works correctly', async() => {
    // Emulate clicking link on home page
    const element = await browser.getElementByCss('.authLinks.redButton');
    await element.click();
    // Waiting for proof of page change
    await browser.waitForElementByCss('.placeLabel');
    // Scanning new page for unique information    
    const signInElement = await browser.getElementByCss('.hybrid-login-form-main > h1');
    const text = await signInElement.getText();
    // Confirming unique information is present on new page
    expect(text).toBe('Sign In'); 
    // If unique information is present, link must have taken 
    // us to the correct page
});

test('Email Signup without entering email address', async() => {
    const element = await browser.getElementByCss('.cta-btn-txt');
    await element.click();
    await browser.waitForElementByCss('.inputError');
    
    const inputError = await browser.getElementByCss('.inputError');
    const text = await inputError.getText();
    expect(text).toBe('Email is required.');
});

test('Test FAQ response', async() => {

    const element = await browser.getElementByCss('.faq-question');
    await element.click();
    expect(browser.waitForElementByCss('.faq-answer.open'));
});
