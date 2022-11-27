describe('Get_modules', () => {  
  it('get_modules', () => {
    cy.visit('localhost:8000');
    cy.get('[type="text"]');
    cy.get('[type="password"]');
    cy.get('.Login-btn-login');
    cy.get('.Login-btn-signup');
    cy.get('.Login-forgot-link');
  })
})