/// <reference types="cypress" />

context('Examples', function()  {
  beforeEach(function() {
    cy.get('#button1').as('button');
  });

  it('Example 1: simplest test', function() {
    cy.get('#button1').click();
    // default assertion
    cy.get('#text1').contains('I am here!');
  });

  it('Example 2: implicit assertion', function() {
    cy.get('#button1').click();
    // implicit assertion
    cy.get('#text1').should('have.class', 'visible').and('contain', 'I am here!');
  });

  it('Example 3: explicit assertion', function() {
    cy.get('#button1').click();
    // explicit assertion
    cy.get('#text1').then(text => {
      expect(text).to.have.text('I am here!');
      assert(text.text() === 'I am here!');
    });
  });

  it('Example 4: aliasing', function() {
    // cy.get('#button1').click();
    this.button.click();
   // cy.get('@button').click();
  });

  it('Example 5: Hidden element', function() {
    //cy.get('#button2').click();
    cy.get('#button2').click({force: true});
  });

  it('Example 6: Multiple domains', function() {
    //cy.visit('https://example.cypress.io/commands/aliasing');
     cy.visit('/someotherurl');
  });

  it('Example 7: Navigation', function() {
    cy.get('#link1').click();

    cy.location('href').should('include', '/someotherurl');
    cy.url().should('eq', 'http://localhost:3000/someotherurl');

    cy.go('back');
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Example 8: True e2e', function() {
    cy.server();
    cy.route('https://cat-fact.herokuapp.com/facts/random').as('apiCheck');

    cy.get('#button4').click();

    cy.get('#text4').should('be.visible');
    cy.get('#text4').should('not.be.empty');
    cy.wait('@apiCheck').should('have.property', 'status', 200);
    cy.get('@apiCheck').its('responseBody')
        .should('have.property', 'text');
  })

  it('Example 9: Stubs', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://cat-fact.herokuapp.com/facts/random',
      response: {
        text: 'Dogs are cooler than cats'
      }
    }).as('apiCheck');

    cy.get('#button4').click();

    cy.get('#text4').should('be.visible');
    cy.get('#text4').should('not.be.empty');
    cy.wait('@apiCheck').should('have.property', 'status', 200);
    cy.get('@apiCheck').its('responseBody')
        .should('have.property', 'text', 'Dogs are cooler than cats');
  });

  it('Example 10: API Requests', function() {
    cy.request('GET', 'https://cat-fact.herokuapp.com/facts/random').then(response => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.have.property('text');
    });
  });

  it('Example 11: Fixtures', function() {
    cy.server();
    cy.route('GET', 'https://cat-fact.herokuapp.com/facts/random', 'fixture:cat-facts.json').as('apiCheck');

    cy.get('#button4').click();

    cy.get('@apiCheck').its('responseBody')
        .should('have.property', 'text', 'Cats are cooler than  dogs.');
  })

  it('Example 12: Custom commands', function() {
    cy.stubCats('Cockroaches');
    cy.get('#button4').click();

    cy.get('@apiCheck').its('responseBody')
        .should('have.property', 'text', 'Cats are cooler than  dogs.');
  })

  it('Example 13: Task', function() {
    cy.task('hello-cocoa', { message: 'how ya doing?' });
  });

  it('Example 14: Exec', function() {
    cy.exec('npm run test-exec')
        .its('stdout')
        .should('contain', 'test exec');
  })
});

context('Arrow function', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#button1').as('button');
  });

  it('Example 4: aliasing', () => {
    // cy.get('#button1').click();
    //this.button.click();
    cy.get('@button').click();
  });
});
