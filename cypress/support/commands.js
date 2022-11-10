// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (user, password) => {
    cy.visit('http://localhost:8000');  
    cy.get('[type="text"]').click().clear().type(user);
    cy.get('[type="password"]').click().clear().type(password);
    cy.get('.Login-btn-login').click();
})
Cypress.Commands.add('forgotPasswordTypeEmail' ,(email) => {
    cy.get('.Login-forgot-link').click();
    cy.url().should('eq', 'http://localhost:8000/forgot-password');
    cy.get('.ForgotPassword-input').click().type(email);
    cy.get('.ForgotPassword-btn-send').click();
})

Cypress.Commands.add('typeToken', (token) => {
    cy.get('.FPstep2-Input-Container').should('be.visible');
    cy.get('.FPstep2-Input-Container > :nth-child(1)').type(token[0]);
    cy.get('.FPstep2-Input-Container > :nth-child(2)').type(token[1]);
    cy.get('.FPstep2-Input-Container > :nth-child(3)').type(token[2]);
    cy.get('.FPstep2-Input-Container > :nth-child(4)').type(token[3]);
    cy.get('.FPstep2-Input-Container > :nth-child(5)').type(token[4]);
    cy.get('.ForgotPassword-btn-send').click();
})

Cypress.Commands.add('forgotPasswordTypeNewPsw' ,(password) => {
    cy.get('.ForgotPassword-input[placeholder="Enter your New Password"]').should('be.visible');
    cy.get('.ForgotPassword-input[placeholder="Enter your New Password"]').type(password);
})

Cypress.Commands.add('fill_signup_form', (user) => {
    cy.get('[placeholder="First Name*"]').click().clear().type(user.first_name);
    cy.get('[placeholder="Last Name*"]').click().clear().type(user.last_name);
    cy.get('[placeholder="Email*"]').click().clear().type(user.email);
    cy.get('[placeholder="Phonenumber*"]').click().clear().type(user.phone_number);
    cy.get('[placeholder="Username*"]').click().clear().type(user.username);
    cy.get('[placeholder="Password*"]').click().clear().type(user.password);
    cy.get('[placeholder="Select user type*"]').click().clear().type(user.user_type);
    cy.get(':nth-child(5) > :nth-child(1)').click();
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })