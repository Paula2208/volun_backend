const ap_user = ["maherreramu", "password"];
const np_user = ["org1", "12345"];
describe('4-filter-offers', () => { 
    beforeEach(() => {
        cy.visit(Cypress.env('home_url'));
    });

    it('1-user_apply', function() {
        cy.login(ap_user[0], ap_user[1]);
        cy.get(':nth-child(3) > .Post-image').click();
        cy.get('.FeedLayout-Input > select').select('org1');
        cy.get('.FeedLayout-Input-datePicker').click();
        cy.get(':nth-child(5) > .react-datepicker__day--030').click();
        cy.get('.react-time-picker__inputGroup__amPm').select('pm');
        cy.get('.FeedLayout-Btn-Filter').click();
    });
 })