
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

test('login with false email', async() => {
    const emailAddress = 'thomas@homtial.co.org';

    const loginField = await browser.getElementByCss('.input_id');
    const loginButton = await browser.getElementByCss('.cta-btn-txt');    

    await loginField.sendKeys(emailAddress);
    await loginButton.click();
    
    expect(browser.waitForElementByCss('.stepTitle'));
});


// Attempted test to confirm colour of Netflix Logo on the home page however every iteration of the test
// returned an rgba colour list that corresponds to a different, unrequested element on the page. I've confirmed
// that the CSS tags are correct however the returned colours are always incorrect. I discovered that the Netflix
// is comprised of images that used a 'fill' colour so I used a 'find fill colour by css' function.


test('confirm colour scheme', async() => {
    await browser.waitForElementByCss('svg.svg-icon.svg-icon-netflix-logo');
    const elementColour = await browser.elementFillColorCss('.screen-reader-text');
    
    expect(elementColour).toBe('rgb(229, 9, 20)'); 
});


// const elementColour = await browser.elementColor('netflix-logo')
// const element = await browser.getElementByCss('.svg-icon.svg-icon-netflix-logo');
// const elementColour = await browser.elementColorCss('.svg-icon.svg-icon-netflix-logo > g');