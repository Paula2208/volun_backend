describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
        cy.fixture('table').then(function(td){
            this.td=td
        });
    });

    it('empty user and password', () => {
        cy.get('.Login-btn-login').click();
        cy.get('.Toastify__toast-body')
          .should('have.text','Please add a username')
          .should('be.visible');
    });

    it('empty user', () => {
        cy.get('[type="password"]').click().type('password');
        cy.get('.Login-btn-login').click();
        cy.get('.Toastify__toast-body')
            .should('have.text','Please add a username')
            .should('be.visible');
    });

    it('empty password', () => {
        cy.get('[type="text"]').click().type('user');
        cy.get('.Login-btn-login').click();
        cy.get('.Toastify__toast-body')
            .should('have.text','Please add a password')
            .should('be.visible');
    });

    it('fail login', function (){
        this.td.forEach(e => { 
            cy.login(e.username, 'wrongps');
            cy.get('.Toastify__toast-body')
            .should('have.text','No user found.')
            .should('be.visible');
            });       
    });

    it('succes login', function (){
        this.td.forEach(e => {
            cy.login(e.username, e.password);
            cy.url().should('include', '/app');
        });
    });
 });