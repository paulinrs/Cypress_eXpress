///<reference types="cypress" />

describe('tarefas', () => {

    it('deve cadastrar uma nova tarefa', () => {

        const taskName = 'Ler um livro de Node.js'

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: taskName }
        }).then(response => {
            expect(response.status).to.eq(204)
        })    

        cy.visit('http://localhost:8080/')

        cy.get('input[placeholder="Add a new Task"]')
            .type(taskName)
        
        cy.contains('button', 'Create').click()

        cy.contains('main div p', taskName )
            .should('be.visible')
    })

    it('não deve permitir tarefa duplicada', ()=> {
    
        const task = {
            name: 'comprar um livro de Teste de Software',
            is_done: false
        }

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: task.name}
        }).then(response => {
            expect(response.status).to.eq(204)
        })   
        cy.request({
            url: 'http://localhost:3333/tasks',
            method: 'POST',
            body: task
        }).then(response => {
            expect(response.status).to.eq(201)
        })   
        
        cy.visit('http://localhost:8080/')

        cy.get('input[placeholder="Add a new Task"]')
            .type(task.name)
        
        cy.contains('button', 'Create').click()

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })
})