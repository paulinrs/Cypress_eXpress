///<reference types="cypress" />

describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('http://localhost:8080/')

    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
})