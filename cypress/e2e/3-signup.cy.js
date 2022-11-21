describe('3-signup', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
        cy.fixture('newUsers').then(function(td){
            this.td=td
        });
    });

    it('1-incomplete form', function() {
        cy.get('.Login-btn-signup').click();
        cy.url().should('include', '/signup');
        cy.signup_form_incomplete(this.td[0]);
    })

    it('2-create new user', function() {
        this.td.forEach(e => {
          cy.get('.Login-btn-signup').click();
          cy.url().should('include', '/signup');
          cy.signup_form(e);
          cy.url().should('eq', Cypress.env('home_url'));
          cy.get_alert_message('User created!');
        });
    })

    it('3-verify user creation', function() {
        this.td.forEach(e => {
            cy.task('queryDb', `SELECT *FROM Usuarios WHERE username = "${e.username}"`).then(r => expect(r[0].username).to.equal(e.username));
        });
    })

    it('4-duplicate user', function() {
        cy.get('.Login-btn-signup').click();
        cy.url().should('include', '/signup');
        cy.signup_form(this.td[0]); //cy.task('queryDb', `SELECT *FROM Usuarios WHERE username = "${this.td[0].username}"`)
        //        .then((r) => expect(r[0].username).to.equal(''));
        //cy.get_alert_message('Existing user');
    })

    it('5-delete test data', function() {
        this.td.forEach(e => {
          cy.task('queryDb', `DELETE FROM Usuarios WHERE (username = "${e.username}")`).then(r => expect(r.affectedRows).to.equal(1));
        });
    })
})