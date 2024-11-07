const { test, expect } = require('@playwright/test');

test('Handling Date Picker', async ({ page }) => {

    await page.goto('https://jqueryui.com/datepicker/#date%E2%88%92range');

    //const frame1= await page.frame({url:'https://jqueryui.com/resources/demos/datepicker/default.html'});
    await page.goto('https://jqueryui.com/resources/demos/datepicker/default.html');
    //put direct date value

    await page.fill('#datepicker', '10/10/2024'); // check the format in application first then enter accordingly here
    await page.waitForTimeout(3000);

    //Date picker
    //first perform click to open datepicker
    const year = "2024";
    const month = "November";
    const date = "30";
    const isMonthYearCorrect=false;
    await page.click('#datepicker'); //this will open calender
    //use while
    // while (true) {
    //     const currentmonth = await page.locator('.ui-datepicker-month'); //class locator
    //     const currentyear = await page.locator('.ui-datepicker-year');

    //     if (currentyear == year && currentmonth == month) {
    //         break;
    //     }
    //     await page.locator('[title="Next"]').click(); //next till expected value
    // }

  
        const currentmonth = await page.locator('.ui-datepicker-month'); //class locator
        const currentyear = await page.locator('.ui-datepicker-year');

        if (currentyear !== year && currentmonth !== month) {
            await page.locator('[title="Next"]').click(); //next till expected value
            break;
        }
}
    


    //select date now

    const alldates = await page.$$('.ui-state-default'); //capture all dates in array

    for (const dt of alldates) {
        if (await dt.textContent() == date) {
            await dt.click();
            break;
        }
    }
    await page.waitForTimeout(3000);
})