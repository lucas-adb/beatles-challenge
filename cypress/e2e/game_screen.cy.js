/* eslint-disable no-undef */
describe('Game screen', () => {
  it('when load renders the page', () => {
    cy.visit('http://localhost:5173/');
  });
  it.only('when user chooses an incorrect answer, the text "Wrong! ❌" must appear', () => {
    // open page
    cy.visit('http://localhost:5173/');
    // click IconButton (data-testid="player-btn") to play audio
    cy.get('[data-testid="player-btn"]').click();
    // await 1 second
    cy.wait(1000);
    // click IconButton to stop audio
    cy.get('[data-testid="player-btn"]').click();
    // select the first option inside the Autocomplete in the ComboBox component
    cy.get('#combo-box-demo');
    // cy.get('input').type('{downarrow}{enter}');
    cy.get('input').type('Chains');
    cy.get('input').type('{enter}');
    // check if the Button with "Answer" as a value is disabled
    cy.get('[data-testid="answer-btn"]').click();
    // check if h2 with text "Wrong! ❌" appears
    const answer = cy.get('[data-testid="result"]');
    answer.should('contain.text', 'Wrong! ❌');
  });
});
