describe('2-update-offer', () => { 
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
        cy.fixture('non_profit').then(function(n_user) {
            this.n_user = n_user;
        });
        cy.fixture('admin').then(function(admin) {
            this.admin = admin;
        });
    });

    it('1-update-offer-creator_user', function() {
        cy.login(this.n_user[0].username, this.n_user[0].password);
        cy.get(':nth-child(2) > .Post-Title').should('have.text', 'Test Post 1').click();
        cy.get('.update').click();
        cy.get(':nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__amPm').select('am');
        cy.get(':nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__hour').type('07');
        cy.get(':nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__minute').type('00');
        cy.get(':nth-child(1) > .ModalCreatePost-input').type('Lugar_updated');
        cy.get(':nth-child(2) > select').select('paw');-
        cy.get('.ModalCreatePost-btn-create').click();
        cy.get_alert_message('Post updated.')
    });
    
    it('2-update-offer-admin_user', function() {
        cy.login(this.admin.username, this.admin.password);
        cy.get(':nth-child(1) > .Post-Title').should('have.text', 'Test Post 2').click();
        cy.get('.update').click();
        cy.get(':nth-child(2) > :nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__amPm').select('am');
        cy.get(':nth-child(2) > :nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__hour').type('07');
        cy.get(':nth-child(2) > :nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__minute').type('00');
        cy.get(':nth-child(1) > .ModalCreatePost-input').type('Lugar_updated');
        cy.get(':nth-child(4) > :nth-child(2) > select').select('paw');-
        cy.get('.ModalCreatePost-btn-create').click();
        cy.get_alert_message('Post updated.');
    });

    it('3-update-offer-non-creator-user', function() {
        cy.login(this.n_user[0].username, this.n_user[0].password);
        cy.get(':nth-child(2) > .Post-Title').should('have.text', 'Test Post 1').click();
        cy.get('.update').click();
        cy.get_alert_message('Can´t updated this post');

    });
 })