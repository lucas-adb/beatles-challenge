/* eslint-disable no-undef */

describe('Game screen', () => {
  it('when user chooses a correct answer, the text "Correct! ✅" must appear', () => {
    cy.intercept('GET', '/api/lookup?id=*&entity=song', {
      fixture: 'mockOneSong.json',
    }).as('getSongs');

    cy.visit('http://localhost:8888');

    Cypress.config('defaultCommandTimeout', 10000);

    cy.wait('@getSongs').then(() => {
      cy.get('[data-testid="player-btn"]')
        .click()
        .wait(1000)
        .click()
        .wait(1000);

      cy.get('#combo-box-demo')
        .as('combo-box-demo')
        .should('exist')
        .and('be.visible')
        .and('not.be.disabled')
        .type('{downarrow}{enter}');

      cy.get('@combo-box-demo').should(
        'have.value',
        'I Saw Her Standing There'
      );

      cy.get('[data-testid="answer-btn"]', { timeout: 10000 })
        .as('answer-btn')
        .should('not.be.disabled');

      cy.get('@answer-btn').click();

      cy.get('[data-testid="result"]', { timeout: 10000 }).should(
        'contain.text',
        'Correct! ✅'
      );

      Cypress.config('defaultCommandTimeout', 4000);
    });
  });
});
