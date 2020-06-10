// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
let polyfill;
// grab fetch polyfill from remote URL, could be also from a local package
before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
        .then((response) => {
            polyfill = response.body
        })
});

beforeEach(function() {
    // We use cy.visit({onBeforeLoad: ...}) to delete native fetch and load polyfill code instead
    cy.visit('/', {
        onBeforeLoad (win) {
            delete win.fetch
            // since the application code does not ship with a polyfill
            // load a polyfilled "fetch" from the test
            win.eval(polyfill);
            win.fetch = win.unfetch;
        },
    });
});
