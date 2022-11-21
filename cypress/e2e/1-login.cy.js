describe('1-login', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
        cy.fixture('table').then(function(td) {
          this.td = td;
        });
    })

    it('1-empty user and password', () => {
        cy.get('.Login-btn-login').click();
        cy.get_alert_message('Please add a username');
    });

    it('2-empty user', () => {
        cy.get('[type="password"]').click().type('password');
        cy.get('.Login-btn-login').click();
        cy.get_alert_message('Please add a username');
    });

    it('3-empty password', () => {
        cy.get('[type="text"]').click().type('user');
        cy.get('.Login-btn-login').click();
        cy.get_alert_message('Please add a password');
    });

    it('4-fail login', function (){
        this.td.forEach(e => { 
            cy.login(e.username, 'wrongps');
            cy.get_alert_message('User incorrect. Please check your credentials or create an account.');
        });       
    });

    it('5-succes login', function (){
        this.td.forEach(e => {
            cy.login(e.username, e.password);
            cy.url().should('include', '/app');
            cy.get('.FeedLayout-Logout').click();
        });
    });
});