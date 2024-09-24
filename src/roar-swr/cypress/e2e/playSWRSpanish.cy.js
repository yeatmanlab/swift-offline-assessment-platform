const startText = '¡Bienvenidos al mundo de Lexicalidad!';
const endText = '¡Finalmente';

const userMode = 'shortRandom';
const language = 'es';
const storyOption = 'grade-based';
const variantParams = `lng=${language}&userMode=${userMode}&storyOption=${storyOption}`;

describe('Testing play through of SWR as a participant', () => {
  it('ROAR-Single Word Recognition Play Through Test', () => {
    cy.playSWR(startText, endText, language, variantParams);
  });
});
