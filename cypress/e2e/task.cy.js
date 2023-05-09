///<reference types="cypress" />

describe('tarefas', () => {

    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

            const taskName = 'Ler um livro de Node.js'

            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
            cy.contains('main div p', taskName)
                .should('be.visible')
        })

        it('não deve permitir tarefa duplicada', () => {

            const task = {
                name: 'comprar um livro de Teste de Software',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })

        it('campo obrigatório', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })
    context('atualização', () => {
        it('deve concluir uma tarefa', () => {
            const task = {
                name: 'fazer curso de Robot',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('http://localhost:8080')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
            })    
        })

        context('exclusão', () => {
            it('deve excluir uma tarefa', () => {
                const task = {
                    name: 'estudar java',
                    is_done: false
                }

                cy.removeTaskByName(task.name)
                cy.postTask(task)

                cy.visit('http://localhost:8080')

                cy.contains('p', task.name)
                    .parent()
                    .find('button[class*=ItemDelete]')
                    .click()

                cy.contains('p', task.name)
                    .should('not.exist')
            })
        })
    })
