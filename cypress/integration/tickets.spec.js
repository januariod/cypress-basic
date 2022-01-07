/* eslint-disable no-undef */
/// <reference types='cypress'/>

describe('Tickets', () => {
  beforeEach(() => {
    cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html');
  });

  it("has 'TICKETBOX' header's heading", () => {
    cy.get('header h1').should('have.text', 'TICKETBOX');
  });

  it('fills all the text input fields', () => {
    const firstName = 'Daniel';
    const lastName = 'Januario';

    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#email').type('daniel.teste@teste.com');
    cy.get('#requests').type('vegetarian');
    cy.get('#signature').type(`${firstName} ${lastName}`);
  });

  it('Select two tickets', () => {
    cy.get('#ticket-quantity').select('2');
  });

  it('Select vip ticket type', () => {
    cy.get('#vip').check();
  });

  it('Selects social media checkbox', () => {
    cy.get('#social-media').check();
  });

  it('Check friend and publication, then uncheck friend', () => {
    cy.get('#friend').check();
    cy.get('#publication').check();
    cy.get('#friend').uncheck();
  });

  it('alerts on invalid email', () => {
    cy.get('#email').as('email').type('daniel.teste-teste.com');

    cy.get('#email.invalid').should('exist');

    cy.get('@email').clear().type('daniel.teste@teste.com');

    cy.get('#email.invalid').should('not.exist');
  });

  it('fills and reset the form', () => {
    const firstName = 'Daniel';
    const lastName = 'Januario';
    const fullName = `${firstName} ${lastName}`;

    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#email').type('daniel.teste@teste.com');
    cy.get('#ticket-quantity').select('2');
    cy.get('#vip').check();
    cy.get('#social-media').check();
    cy.get('#requests').type('vegetarian');

    cy.get('.agreement p').should(
      'contain',
      `I, ${fullName}, wish to buy 2 VIP tickets.`,
    );
    cy.get('#agree').check();
    cy.get('#signature').type(`${fullName}`);

    cy.get('button[type=submit]').as('submitButton').should('not.be.disabled');

    cy.get('button[type=reset]').click();

    cy.get('@submitButton').should('be.disabled');
  });

  it('fills mandatory fields using support commands', () => {
    const customer = {
      firstName: 'Daniel',
      lastName: 'Januario',
      email: 'daniel.teste@teste.com',
    };

    cy.fillsMandatoryFields(customer);

    cy.get('button[type=submit]').as('submitButton').should('not.be.disabled');

    cy.get('#agree').uncheck();

    cy.get('@submitButton').should('be.disabled');
  });
});
