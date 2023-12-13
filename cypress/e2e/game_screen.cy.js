/* eslint-disable no-undef */

describe('Game screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8888');
  });

  it('when user chooses an incorrect answer, the text "Wrong! ❌" must appear', async () => {
    cy.wait(3000);
    cy.get('[data-testid="player-btn"]').click();
    cy.wait(1000);
    cy.get('[data-testid="player-btn"]').click();
    cy.get('#combo-box-demo');
    cy.get('input').type('Chains');
    cy.get('input').type('{enter}');
    cy.get('[data-testid="answer-btn"]').click();
    const answer = cy.get('[data-testid="result"]');
    answer.should('contain.text', 'Wrong! ❌');
  });
});
