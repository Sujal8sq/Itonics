/// <reference types="cypress"/>

import Dashboard from '../../page-object/dashboard/dashboard.po'


describe("Assignment 1:", () => {
    const dashboard = new Dashboard();

    beforeEach(() => {
        //Navigate to youtube.com
        cy.visit("/");
    });

    it("Navigate to url & click on the 1st video & assert the URL of the video detail page is correct", () => {
        cy.fixture('dashboard').then(data => {

            //From the search bar, search for “Itonics”
            dashboard.Search().type(data.search_data[0].Title);
            dashboard.searchBtn().click();

            cy.wait(5000);

            //Click on the first video that comes up and navigate to the video’s detail page
            dashboard.firstVideo().click();
            cy.wait(5000);

            dashboard.verifyUrl();
        })
    })

    it("Click one of the videos randomly on the right side of the page", () => {
        cy.fixture('dashboard').then(data => {

            //From the search bar, search for “Itonics”
            dashboard.Search().type(data.search_data[0].Title);
            dashboard.searchBtn().click();

            cy.wait(5000);

            //Click on the first video that comes up and navigate to the video’s detail page
            dashboard.firstVideo().click();
            cy.wait(5000);

            //Click randomly on the recommended video which is displayed on right side of the page
            dashboard.clickRandomVideo().click();
            cy.wait(3300);

            //Assert the randomly clicked title with the video's title
            dashboard.verifyTitle();
        })
    })
})