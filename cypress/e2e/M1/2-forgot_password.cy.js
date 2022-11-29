const test_user_email = "maherreramu@unal.edu.co";
describe('2-forgot password', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
        cy.fixture('users').then(function(td){
            this.td=td
        });
    });    
    
    it('1-valid email valid token', function() {
        cy.forgotPasswordTypeEmail(test_user_email);
        cy.task('queryDb', `SELECT code FROM Codes WHERE email_codes = "${test_user_email}"`)
            .then(data => {
                let code = data[0]['code'];
                cy.typeToken(code);
            });
        cy.forgotPasswordTypeNewPsw('password');
        cy.url().should('equal', Cypress.env('home_url'));
        cy.get_alert_message('Password updated!');
    })

    it('2-valid email invalid token', function() {
            cy.forgotPasswordTypeEmail(test_user_email);
            cy.typeToken('00001');
            cy.get_alert_message('Your code is not correct!');
            cy.task('queryDb', `Delete FROM Codes WHERE email_codes = "${test_user_email}"`);                
    })

    it('3-invalid email', () => {
        cy.forgotPasswordTypeEmail('wrongemail@host');
        cy.get_alert_message('Email not found');
    });
})