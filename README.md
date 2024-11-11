![image](https://github.com/user-attachments/assets/733d2f82-17f0-4247-ad06-27309c29d871)<h1>Playwright Project</h1>


**Installing Playwright**
>npm init playwright@latest

**Checking installations**

>npx playwright show-report

**Run tests**

>npx playwright test ./tests/Registration.spec.js --project=chromium --headed

>npx playwright test ./tests/Login.spec.js --project=chromium --headed

>npx playwright test ./tests/ProductSearch.spec.js --project=chromium --headed



**Creating Allure Report**

>allure generate ./allure-results -o ./allure-report --clean

**Show Allure Report**

>allure open ./allure-report


<h3>Playwright Allure Report</h3>

>https://www.npmjs.com/package/allure-playwright
