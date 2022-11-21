describe('forgot password', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
        cy.fixture('table').then(function(td){
            this.td=td
        });
    });    
    
    it('valid email valid token', () => {
        this.td.forEach(e => {
            cy.forgotPasswordTypeEmail(e.email);
            cy.typeToken('00000');
            cy.forgotPasswordTypeNewPsw('NewPassword');
            cy.get('.Toastify__toast-body')
                .should('have.text','Password updated successfully')
                .should('be.visible');
        })
    })

    it('valid email invalid token', () => {
        this.td.forEach(e => {
            cy.forgotPasswordTypeEmail(e.email);
            cy.typeToken('00001');
            cy.get('.Toastify__toast-body')
                .should('have.text','Invalid token')
                .should('be.visible');
        })
    })

    it('invalid email', () => {
        cy.forgotPasswordTypeEmail('wrongemail@host');
        cy.get('.Toastify__toast-body')
            .should('have.text','Email not found')
            .should('be.visible');
    });
})