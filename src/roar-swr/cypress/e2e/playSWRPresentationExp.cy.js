const startText = 'Welcome to the world of Lexicality!';
const endText = 'Finally';

const userMode = 'presentationExp';
const language = 'en';
const variantParams = `userMode=${userMode}&lng=${language}`;

describe('Testing play through of SWR as a participant', () => {
  it('ROAR-Single Word Recognition Play Through Test', () => {
    cy.playSWR(startText, endText, language, variantParams);
  });
});
