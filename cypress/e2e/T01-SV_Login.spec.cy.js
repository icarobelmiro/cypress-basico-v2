/// <reference types="Cypress" />

describe('Smart View', function () {
    beforeEach(function () {
        cy.visit('https://framework-bh-rac.smart-view.dev.totvs.app/login')
    })

    it('Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Smart View')
    })

    it('Usuário não preenchido - Botão "Entrar" desabilitado', function () {
        cy.get('.po-input.po-input-icon-left.po-input-icon-right').click({ force: true }).type('179598bt0', { force: true });
        cy.contains('button', 'Entrar').should('be.disabled')
    })

    it('Senha não preenchida - Botão "Entrar" desabilitado', function () {
        cy.get('input[name="login"]').click({ force: true }).type('icaro.tassi@totvs.com.br', { force: true });
        cy.contains('button', 'Entrar').should('be.disabled')
    })

    it('Credencial inválida - Toaster', function () {
        cy.get('input[name="login"]').click({ force: true }).type('icaro.tassi@totvs.com.br', { force: true });
        cy.get('.po-input.po-input-icon-left.po-input-icon-right').click({ force: true }).type('179598bt0', { force: true });
        cy.contains('button', 'Entrar').click({ force: true })
        cy.get('.po-toaster-message').should('be.visible')
    })

    it('Login realizado com sucesso', function () {
        cy.get('input[name="login"]').click({ force: true }).type('icaro.tassi@totvs.com.br', { force: true });
        cy.get('.po-input.po-input-icon-left.po-input-icon-right').click({ force: true }).type('179598bt', { force: true });
        cy.get('.po-page-login-button > .po-button').click({ force: true });
        cy.url().should('eq', 'https://framework-bh-rac.smart-view.dev.totvs.app/home')
        cy.title().should('be.equal', 'Smart View')
    })
})