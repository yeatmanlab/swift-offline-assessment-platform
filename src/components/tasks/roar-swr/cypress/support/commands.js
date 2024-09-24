const timeout = Cypress.env('timeout');

const languageOptions = {
  en: {
    continueText: 'Continue',
  },
  es: {
    continueText: 'Continuar',
  },
};

Cypress.Commands.add('playIntro', (language) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= 5; i++) {
    cy.log(i);
    cy.wait(0.3 * timeout);
    cy.get('body').type('{leftarrow}{rightarrow}', { timeout: 5 * timeout });
    cy.wait(0.3 * timeout);
    cy.get('body').type('{leftarrow}{rightarrow}', { timeout: 5 * timeout });
    cy.wait(0.3 * timeout);
  }
  cy.wait(0.3 * timeout);
  cy.get('div', { timeout: 5 * timeout })
    .contains(languageOptions[language].continueText || languageOptions[language].continueText.toLowerCase())
    .click();
  Cypress.on('uncaught:exception', () => false);
});

Cypress.Commands.add('playSWRBlock', (language) => {
  cy.wait(0.3 * timeout);
  cy.get('body', { timeout: 3 * timeout }).then((body) => {
    if (!body.find('.stimulus').length > 0) {
      cy.get('body', { timeout: timeout }).type('{leftarrow}');
      cy.get('div', { timeout: 3 * timeout })
        .contains(languageOptions[language].continueText || languageOptions[language].continueText.toLowerCase())
        .click();
      Cypress.on('uncaught:exception', () => false);
    } else {
      cy.get('body', { timeout: timeout }).type('{rightarrow}');
      cy.get('body', { timeout: timeout }).type('{leftarrow}');
      cy.playSWRBlock(language);
    }
  });
});

Cypress.Commands.add('finishSWR', (endText) => {
  cy.wait(0.3 * timeout);
  cy.get('body', { timeout: 3 * timeout }).then((body) => {
    if (!body.find('.stimulus').length > 0) {
      cy.wait(0.2 * timeout);
      cy.get('body', { timeout: 3 * timeout })
        .contains(endText, { timeout: 3 * timeout })
        .should('be.visible');
      cy.get('body', { timeout: 3 * timeout }).type('{leftarrow}');
    } else {
      cy.wait(0.2 * timeout);
      cy.get('body', { timeout: 3 * timeout }).type('{rightarrow}');
      cy.finishSWR(endText);
    }
  });
});

Cypress.Commands.add('playSWR', (startText, endText, language = 'en', variantParams = null) => {
  if (variantParams) {
    //   Navigate to URL including variantParams
    cy.visit(`${Cypress.env('baseUrl')}/?${variantParams}`);
  } else {
    // Play default SWR variant
    cy.visit(Cypress.env('baseUrl'));
  }

  // handles error where full screen throws a permissions error
  cy.wait(0.1 * timeout);
  Cypress.on('uncaught:exception', () => false);

  cy.get('.jspsych-btn', { timeout: timeout }).click();

  // play tutorial
  cy.contains(startText, { timeout: timeout });
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 3; i++) {
    cy.get('body', { timeout: timeout }).type('{leftarrow}');
  }
  cy.get('.jspsych-btn', { timeout: 10 * timeout })
    .should('be.visible')
    .click();

  Cypress.on('uncaught:exception', () => false);

  // intro
  cy.playIntro(language);

  cy.playSWRBlock(language);
  cy.playSWRBlock(language);
  cy.playSWRBlock(language);
  cy.playSWRBlock(language);
  cy.playSWRBlock(language);
  cy.finishSWR(endText);
});
