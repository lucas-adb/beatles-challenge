{
  /* <reference types="cypress" />; */
}

describe('Game screen', () => {
  it('when load renders the page', () => {
    cy.visit('http://localhost:5173/');
  });
});
