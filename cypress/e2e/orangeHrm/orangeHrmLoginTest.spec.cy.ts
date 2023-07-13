describe("OrangeHRM login scenario", () => {
    it("should login into OrangeHRM", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get('[name="username"]').type('Admin')
        cy.get('[name="password"]').type('admin123')
        cy.get('[type="submit"]').click()
        cy.get('.oxd-main-menu-item-wrapper').contains("Admin").click()

        cy.get('.oxd-label').contains("Username").invoke("text").then(($text) => {expect($text).to.eq("Username")})

        cy.get('.oxd-input-group__label-wrapper').filter(':contains(Username)').next().type('Admin')

        //find parent div element which contains drop down options relative to known element of User Role label, and click to open drop down options to avialble them in the DOM
        cy.xpath('//label[text()="User Role"]/parent::div/following-sibling::div').click()
        //Select Admin option from drop down options
        cy.xpath('//label[text()="User Role"]/parent::div/following-sibling::div').contains('Admin').click()

        cy.xpath('//label[text()="Employee Name"]/parent::div/following-sibling::div').type('Ss6')
        cy.intercept({
            method: "GET",
            url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/**",
          }).as("dataGetFirst");
        cy.wait("@dataGetFirst");

        //using xpath
        cy.xpath('//label[text()="Employee Name"]/parent::div/following-sibling::div').contains('Ss6').click()
        //using css
        //cy.get('div.oxd-autocomplete-dropdown>div').contains('Paul').click()
        cy.get('.oxd-input-group__label-wrapper').filter(':contains(Status)').next().click()
        cy.get('.oxd-input-group__label-wrapper').filter(':contains(Status)').next().contains('Enabled').click()
        cy.get('button[type="submit"]').contains('Search').click({force:true})


        //write code to do followings
        //iterate through all the rows of the table and assert number of rows in the table based on the given value
        //find the row which contains the given column value and assert the column value of the row
        //click on the row
        cy.get('div.oxd-table-body').find('.oxd-table-card>.oxd-table-row').its('length').should('eq', 1)
        cy.get('div.oxd-table-body>.oxd-table-card>.oxd-table-row').each(($row, index, $rows) => { 
            cy.wrap($row).find('div.oxd-table-cell').eq(3).invoke('text').then(($text) => {
                expect($text).to.eq('Ss6 aa')
                if($text.includes('Ss6 aa')){
                    cy.wrap($row).find('div.oxd-table-cell').eq(0).click()
                }
            })
        })

        //write code to do followings
        //assert number of rows in the table
        //iterate through all the rows of the table and then each coulmns of the row and assert the column value of the row
        cy.get('div.oxd-table-body').find('.oxd-table-card>.oxd-table-row').its('length').should('eq', 1)
        cy.get('div.oxd-table-body>.oxd-table-card>.oxd-table-row').each(($row, index, $rows) => {
            cy.wrap($row).find('div.oxd-table-cell').eq(0).invoke('text').then(($text) => {
                expect($text).to.eq('Ss6 aa')
            })
            cy.wrap($row).find('div.oxd-table-cell').eq(1).invoke('text').then(($text) => {
                expect($text).to.eq('Admin')
            })
            cy.wrap($row).find('div.oxd-table-cell').eq(2).invoke('text').then(($text) => {
                expect($text).to.eq('Enabled')
            })
        }
        

    })
})