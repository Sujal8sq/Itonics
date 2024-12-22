/// <reference types="cypress"/>

class Dashboard {

    Search() {
        return cy.get('.ytSearchboxComponentSearchForm', { timeout: 10000 }).should("exist").should("be.visible");
    }

    searchBtn() {
        return cy.xpath('(//button[@title="Search"])[1]', { timeout: 1000 }).should("exist").should("be.visible");
    }

    firstVideo() {
        return cy.xpath('(//a[@id="video-title"])[1]', { timeout: 5000 }).should("exist").should("be.visible");
    }

    //Assert the URL of the video detail page is correct
    verifyUrl() {
        cy.xpath('(//a[@id="video-title"])[1]')
            .invoke('attr', 'href')  // Retrieve the 'href' attribute
            .then((href) => {
                let verifyUrl;
                cy.url().then((url) => {
                    verifyUrl = url;  // Save the URL in a const or variable
                    expect('https://www.youtube.com' + href).to.include(verifyUrl);
                });
            })
    }

    clickRandomVideo() {
        const randomNum = Math.floor(Math.random() * 10) + 1;       //Generate random number between 1 and 10

        cy.xpath(`(//span[@id="video-title"])[${randomNum}]`).invoke('text').then((text) => {
            const savedText = text.replace(/\n/g, '').replace(/\s+/g, ' ').trim();      //Removes the whitespace and next line and saves to a constant value
            cy.wrap(savedText).as('videoTitle');     // Save it as an alias to use in another function
            cy.log(`This is generated title ${savedText}`)
        })
        return cy.xpath(`(//span[@id="video-title"])[${randomNum}]`, { timeout: 3000 }).should("exist").should("be.visible");
    }

    verifyTitle() {
        cy.get('@videoTitle').then((expectedTitle) => {
            const cleanedTitle = expectedTitle.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
            cy.log(`Asserting the video title: ${cleanedTitle}`);
            cy.xpath(`//h1[@class="style-scope ytd-watch-metadata"]`).invoke('text').then((text) => {
                const actualTitle = text.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
                expect(actualTitle).to.equal(expectedTitle);
            })
        }
        )
    }
}
export default Dashboard;
