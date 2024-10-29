/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    // Exercício 01
    it('Preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Icaro')
        cy.get('#lastName').type('Belmiro Tassi')
        cy.get('#email').type('icaro@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    // Exercício 02
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Icaro')
        cy.get('#lastName').type('Belmiro Tassi')
        cy.get('#email').type('icaro.exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    // Exercício 03
    it('Valida que o campo Telefone aceita apenas números', function () {
        cy.get('#phone').type('abc!@#$%¨&*()-_+=').should('have.value', '')
    })

    // Exercício 04
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Icaro')
        cy.get('#lastName').type('Belmiro Tassi')
        cy.get('#email').type('icaro@exemplo.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    // Exercício 05
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Icaro').should('have.value', 'Icaro')
        cy.get('#lastName').type('Belmiro Tassi').should('have.value', 'Belmiro Tassi')
        cy.get('#email').type('icaro@exemplo.com').should('have.value', 'icaro@exemplo.com')
        cy.get('#open-text-area').type('teste').should('have.value', 'teste')

        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#open-text-area').clear().should('have.value', '')
    })

    // Exercício 05 -- Outra forma de fazer
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Icaro').should('have.value', 'Icaro').clear().should('have.value', '')
        cy.get('#lastName').type('Belmiro Tassi').should('have.value', 'Belmiro Tassi').clear().should('have.value', '')
        cy.get('#email').type('icaro@exemplo.com').should('have.value', 'icaro@exemplo.com').clear().should('have.value', '')
        cy.get('#open-text-area').type('teste').should('have.value', 'teste').clear().should('have.value', '')
    })

    // Exercício 06
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    // Exercício 07
    it('Envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    // Exercício 08
    it('Preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Icaro')
        cy.get('#lastName').type('Belmiro Tassi')
        cy.get('#email').type('icaro@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    // Seção 04 - Exercício
    it('Seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube') // Seleção pelo texto YouTube
    })

    // Exercício Extra 01
    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria') // Seleção pelo value mentoria
    })

    // Exercício Extra 02
    it('Seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1).should('have.value', 'blog') // Seleção pelo índice 1
    })

    // Seção 05 - Exercício
    it('Marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"]').check('feedback').should('be.checked')
        // cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback') // Assim também funciona
    })

    // Exercício Extra
    it('Marca cada tipo de atendimento', function () {
        // cy.get('input[type="radio"]').check('feedback').should('be.checked')
        // cy.get('input[type="radio"]').check('elogio').should('be.checked')
        // cy.get('input[type="radio"]').check('ajuda').should('be.checked')

        cy.get('input[type="radio"]')
            .should('have.length', 3) // Confirmar que tem três elementos possíveis de seleção
            .each(function ($radio) { // Comando each para passar por cada um dos elementos
                cy.wrap($radio).check() // Seleciona cada um deles
                cy.wrap($radio).should('be.checked') // Verifica se cada um foi marcado
            })
    })

    // Seção 06 - Exercício
    it('Marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type=checkbox]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    // Exercício Extra
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Icaro')
        cy.get('#lastName').type('Belmiro Tassi')
        cy.get('#email').type('icaro@exemplo.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    // Seção 07 - Exercício
    it('Seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type=file]#file-upload')
            .should('not.have.value')
            .selectFile('C:/Users/icaro.tassi/CursoCypress/1/cypress-basico-v2/cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    // Exercício Extra 01
    it('Seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type=file]#file-upload')
            .should('not.have.value')
            .selectFile('C:/Users/icaro.tassi/Downloads/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    // Exercício Extra 02
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type=file]#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    // Seção 08 - Exercício
    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    // Exercício 01
    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    // Exercício 02
    it.only('Testa a página da política de privacidade de forma independente', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.get('#white-background')
            .contains('Talking About Testing')
    })
})