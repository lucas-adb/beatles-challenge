/* eslint-disable no-undef */
// import { getSongsFromAlbum } from '../../src/services/fetchItunes';
// import { responseMock } from '../../src/tests/mocks/responseMock';

// Cypress.on('uncaught:exception', (err, runnable) => {
//   if (
//     err.message.includes(
//       'The play() request was interrupted by a call to pause()'
//     )
//   ) {
//     return false;
//   }
// });

describe('Game screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('when load renders the page', () => {
    cy.visit('http://localhost:5173/');
    // cy.intercept(
    //   'GET',
    //   'https://itunes.apple.com/lookup?id=1441164816&entity=song',
    //   responseMock
    // ).as('getSongs');
  });
  it('when user chooses an incorrect answer, the text "Wrong! ❌" must appear', () => {
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
  it('when user chooses an correct answer, the text "Correct! ✅" must appear', () => {
    // open page
    // cy.visit('http://localhost:5173/');
    // click IconButton (data-testid="player-btn") to play audio
    cy.intercept(
      'GET',
      'https://itunes.apple.com/lookup?id=1441164816&entity=song',
      { fixture: 'mockSongs.json' }
    ).as('getSongs');

    cy.wait('@getSongs');
    cy.get('[data-testid="player-btn"]').click();
    // await 1 second
    cy.wait(1000);
    // click IconButton to stop audio
    cy.get('[data-testid="player-btn"]').click();
    cy.wait(1000);
    // select the first option inside the Autocomplete in the ComboBox component
    cy.get('#combo-box-demo');
    // cy.get('input').type('{downarrow}{enter}');
    cy.get('input').type('I Saw Her Standing There');
    cy.get('input').type('{enter}');
    // check if the Button with "Answer" as a value is disabled
    cy.get('[data-testid="answer-btn"]').click();

    const answer = cy.get('[data-testid="result"]');
    answer.should('contain.text', 'Correct! ✅');
  });
});
