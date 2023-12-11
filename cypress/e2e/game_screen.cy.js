/* eslint-disable no-undef */

describe('Game screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('when user chooses an incorrect answer, the text "Wrong! ❌" must appear', () => {
    cy.intercept(
      'GET',
      'https://itunes.apple.com/lookup?id=1441164816&entity=song',
      { fixture: 'mockSongs.json' }
    ).as('getSongs');

    cy.wait('@getSongs');
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="player-btn"]').click();
    cy.wait(1000);
    cy.get('[data-testid="player-btn"]').click();
    cy.get('#combo-box-demo');
    // cy.get('input').type('{downarrow}{enter}');
    cy.get('input').type('Chains');
    cy.get('input').type('{enter}');
    cy.get('[data-testid="answer-btn"]').click();
    const answer = cy.get('[data-testid="result"]');
    answer.should('contain.text', 'Wrong! ❌');
  });
  it('when user chooses an correct answer, the text "Correct! ✅" must appear', () => {
    cy.intercept(
      'GET',
      'https://itunes.apple.com/lookup?id=1441164816&entity=song',
      { fixture: 'mockOneSong.json' }
    ).as('getSongs');

    cy.wait('@getSongs');
    cy.get('[data-testid="player-btn"]').click();
    cy.wait(1000);
    cy.get('[data-testid="player-btn"]').click();
    cy.wait(1000);
    cy.get('#combo-box-demo');
    cy.get('input').type('I Saw Her Standing There');
    cy.get('input').type('{enter}');
    cy.get('[data-testid="answer-btn"]').click();
    const answer = cy.get('[data-testid="result"]');
    answer.should('contain.text', 'Correct! ✅');
  });
});
