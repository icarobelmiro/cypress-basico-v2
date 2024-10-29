/// <reference types="Cypress" />

describe('Fluxo de importação', function () {
    beforeEach('Smart View', function () {
        cy.loginSVLocalDev()
    })

    it('Importação de relatório', function () {
        cy.importReport()
        cy.chooseBusinessObjects()
        cy.reportImportSuccess()
    })
})