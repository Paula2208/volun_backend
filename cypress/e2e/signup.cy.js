describe('signup', () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
        cy.get('.Login-btn-signup').click();
        cy.url().should('eq', 'localhost:3000/signup')
        cy.fixture('users').then(function(td){
            this.td=td
        });
    });

    it('regist', function(){
        this.td.forEach(e => {
            cy.fill_signup_form(e);
        });
    });
})