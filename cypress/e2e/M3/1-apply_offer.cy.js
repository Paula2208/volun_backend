describe('1-apply-offer', () => { 
    cy.visit(Cypress.env('home_url'));
        cy.fixture('users').then(function(users) {
            this.users = users;
    });

    it('1-apply', function() {
        cy.get(':nth-child(1) > .Post-Title').click();
        cy.get('.ModalSeePost-Apply-btn').click();
        //get confirmation
    });
 })