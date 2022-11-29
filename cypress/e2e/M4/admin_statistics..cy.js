const admin = ["admin1", "12345"]
describe('admin statistics', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
    });
    
    it('see_statistics', () => {
        cy.login(admin[0], admin[1]);
        cy.url().should('include', '/app');
        cy.get('.FeedLayout-statisticsButton').click();
        cy.get('.ModalStatistics-container');
    });
})