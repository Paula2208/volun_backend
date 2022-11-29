const ap_user = ["maherreramu", "password"];
const np_user = ["org1", "12345"];

describe('1-apply-offer', () => { 
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
    });

    it('1-user_apply', function() {
        cy.login(ap_user[0], ap_user[1]);
        cy.get(':nth-child(1) > .Post-bottom > .Post-Apply-btn').click();
        cy.get_alert_message("Application saved! Wait for the organization response.");
    });

    it('2-Non-profit_reply', () => {
        cy.login(np_user[0], np_user[1]);
        cy.get(':nth-child(1) > .Post-Title').click();
        cy.get(':nth-child(1) > .ModalSeePost-scroll').click();
        cy.get(':nth-child(1) > .Post-Title').click();
        cy.get('.ModalSeePost-pending-btn-yes').click();
        cy.get_alert_message("Response saved!")
    });
})