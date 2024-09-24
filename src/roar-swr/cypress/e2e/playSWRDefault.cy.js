const startText = 'Welcome to the world of Lexicality!';
const endText = 'Finally';

describe('Testing play through of SWR as a participant', () => {
  it('ROAR-Single Word Recognition Play Through Test', () => {
    cy.playSWR(startText, endText);
  });
});
