describe('3-delete-offer', () => { 
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
        cy.fixture('non_profit').then(function(n_user) {
            this.n_user = n_user;
        });
        cy.fixture('admin').then(function(admin) {
            this.admin = admin;
        });
    });
    
    it('1-delete_offer_creator_user', function() {
        cy.login(this.n_user[0].username, this.n_user[0].password);
        cy.get(':nth-child(2) > .Post-Title').should('have.text', 'Test Post 1').click();
        cy.get('.delete').click();
        cy.get_alert_message('Post deleted.');
    });

    it('2-delete_offer_admin', function() {
        cy.login(this.admin.username, this.admin.password);
        cy.get(':nth-child(1) > .Post-Title').should('have.text', 'Test Post 2').click();
        cy.get('.delete').click();
        cy.get_alert_message('Post deleted.')
    });

    it('3-delete_offer_non_creator_user', function() {
        cy.login(this.n_user[1].username, this.n_user[1].password);
        cy.get(':nth-child(2) > .Post-Title').should('have.text', 'Test Post 1').click();
        cy.get('.delete').click();
        cy.get_alert_message('Post not deleted.')
    });
 })