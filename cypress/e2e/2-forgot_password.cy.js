describe('2-forgot password', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
        cy.fixture('table').then(function(td){
            this.td=td
        });
    });    
    
    it('1-valid email valid token', function() {
        this.td.forEach(e => {
            cy.forgotPasswordTypeEmail(e.email);
            cy.typeToken('00000');
            cy.forgotPasswordTypeNewPsw('NewPassword');
            cy.get('.Toastify__toast-body')
                .should('have.text','Password updated successfully')
                .should('be.visible');
        })
    })

    it('2-valid email invalid token', function() {
        this.td.forEach(e => {
            cy.forgotPasswordTypeEmail(e.email);
            cy.typeToken('00001');
            cy.get('.Toastify__toast-body')
                .should('have.text','Invalid token')
                .should('be.visible');
        })
    })

    it('3-invalid email', () => {
        cy.forgotPasswordTypeEmail('wrongemail@host');
        cy.get('.Toastify__toast-body')
            .should('have.text','Email not found')
            .should('be.visible');
    });
})