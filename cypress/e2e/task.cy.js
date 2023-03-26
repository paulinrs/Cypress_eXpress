///<reference types="cypress" />

describe('tarefas', () => {

    it('deve cadastrar uma nova tarefa', () => {
        cy.visit('http://localhost:8080/')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Ler um livro de Node.js')

        // //button[contains(text(), "Create")]
        
        cy.contains('button', 'Create').click()
    })

})