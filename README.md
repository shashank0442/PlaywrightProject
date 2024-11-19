<h1>🚀 Playwright Test Automation with Allure Reporting 🚀</h1>
<p>This project utilizes Playwright for efficient end-to-end testing and Allure for comprehensive reporting, providing a clear overview of your web application's behavior.</p>

<h2> ☞ Key Features:</h2>

* Cross-browser testing with Playwright (Chromium, Firefox, WebKit)
* Detailed test reports with Allure
* Easy and intuitive test execution
* Customizable reporting structure

<h2>☞ Getting Started</h2>

<h3>Installation:</h3>

Run the following command in your project's root directory to initiate Playwright with NPM:

>npm init playwright@latest

Verify Installation:

Check if Playwright is installed correctly using:

>npx playwright show-report

Running Tests:

Execute your Playwright tests with specific browsers and headless mode (optional):

Run tests with Chromium and headed mode (browser window visible)
>npx playwright test ./tests/Registration.spec.js --project=chromium --headed

Run tests with Chromium and headless mode (browser window hidden)
>npx playwright test ./tests/Registration.spec.js --project=chromium

Replace "./tests/Registration.spec.js" with your actual test file path
Adapt project name and browser based on your needs

after running your tests, create a detailed Allure report:

> allure generate ./allure-results -o ./allure-report --clean

Opening the report 

> allure open ./allure-report

<h2> ♛ Reference URL's</h2>
> https://www.npmjs.com/package/allure-playwright
