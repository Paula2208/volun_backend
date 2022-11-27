describe('1-create_offer', () => { 
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
        cy.fixture('non_profit').then(function(n_user) {
            this.n_user = n_user;
        });
    });
    
    it('1-create_offer', function() {
        cy.login(this.n_user[0].username, this.n_user[0].password);
        cy.get('.FeedLayout-startPost-lavanda').click();
        cy.get('[placeholder="Title*"]').type('Test Post 1');
        cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .FeedLayout-Input-datePicker').click();
        cy.get('.react-datepicker__day--022').click();
        cy.get(':nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__amPm').select('pm');
        cy.get(':nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__hour').type('5');
        cy.get(':nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__minute').type('10');
        cy.get(':nth-child(1) > .ModalCreatePost-input').type('Lugar');
        cy.get(':nth-child(2) > select').select('paw');-
        cy.get('.ModalCreatePost-description').click().type('Test post description 1');
        cy.get('.ModalCreatePost-btn-create').click();
        cy.get_alert_message('Post created successfully!');
        cy.get('.FeedLayout-startPost-lavanda').click();
        cy.get('[placeholder="Title*"]').type('Test Post 2');
        cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .FeedLayout-Input-datePicker').click();
        cy.get('.react-datepicker__day--022').click();
        cy.get(':nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__amPm').select('pm');
        cy.get(':nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__hour').type('5');
        cy.get(':nth-child(3) > :nth-child(2) > .react-time-picker > .react-time-picker__wrapper > .react-time-picker__inputGroup > .react-time-picker__inputGroup__minute').type('10');
        cy.get(':nth-child(1) > .ModalCreatePost-input').type('Lugar');
        cy.get(':nth-child(2) > select').select('paw');-
        cy.get('.ModalCreatePost-description').click().type('Test post description 2');
        cy.get('.ModalCreatePost-btn-create').click();
        cy.get_alert_message('Post created successfully!');
    });
})