// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Icaro')
    cy.get('#lastName').type('Belmiro Tassi')
    cy.get('#email').type('icaro@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('loginSVRAC', function () {
    cy.visit('https://framework-bh-rac.smart-view.dev.totvs.app/login')
    cy.get('input[name="login"]').click({ force: true }).type('icaro.tassi@totvs.com.br', { force: true });
    cy.get('.po-input.po-input-icon-left.po-input-icon-right').click({ force: true }).type('179598bt', { force: true });
    cy.get('.po-page-login-button > .po-button').click({ force: true });
    cy.url().should('eq', 'https://framework-bh-rac.smart-view.dev.totvs.app/home')
})

Cypress.Commands.add('loginSVLocalDev', function () {
    cy.visit('http://localhost:7037/login')
    cy.get('input[name="login"]').click({ force: true }).type('mestre', { force: true });
    cy.get('.po-input.po-input-icon-left.po-input-icon-right').click({ force: true }).type('totvs', { force: true });
    cy.get('.po-page-login-button > .po-button').click({ force: true });
    cy.url().should('eq', 'http://localhost:7037/home')
})

Cypress.Commands.add('importReport', function () {
    cy.intercept('POST', '/api/resources/report/import').as('importReportAPI')
    cy.get('.po-menu-mobile').click({ force: true })
    cy.get('.po-menu-item-first > po-menu-item > .po-menu-item-link > .po-menu-item').click({ force: true })
    cy.get('.po-page-header-actions > :nth-child(1) > .po-button').click({ force: true })
    cy.get('input[type="file"]').selectFile('C:/Users/icaro.tassi/Downloads/report (cb55b25b-4905-4bf9-9783-1d2aece212d5).sv.zip', { force: true })
    cy.wait('@importReportAPI').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('chooseBusinessObjects', function () {
    cy.intercept('GET', '/api/connectors/business-object-areas').as('businessObjectAreasAPI')
    cy.intercept('GET', '/api/connectors/business-objects?area=*').as('businessObjectsAPI')
    cy.get('.resource-import-wizard-business-object-form-image-container > tr-button > po-button > .po-button').click({ force: true })
    cy.wait('@businessObjectAreasAPI').its('response.statusCode').should('eq', 200)
    cy.get('.two-layered-select-layer-one-container-item-value.ng-star-inserted').contains('Exemplos').click({ force: true })
    cy.wait('@businessObjectsAPI').its('response.statusCode').should('eq', 200)
    cy.get('.business-object-lookup-business-object-item-name').contains('Funcionários').click({ force: true })
    cy.get('.po-button-modal-first-action > .po-button > .po-button-container > .po-button-label').click({ force: true })
})

Cypress.Commands.add('reportImportSuccess', function () {
    cy.get('po-button[p-kind="primary"] > .po-button').click({ force: true })
    cy.url().should('include', '/reports/list/all')
    cy.get('.po-toaster-message').should('be.visible').should('contain.text', 'Importação concluída com sucesso.')
})