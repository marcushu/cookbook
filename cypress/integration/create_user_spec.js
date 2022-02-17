/* eslint-disable no-undef */
describe('create user', () => {
    // Will succeed only if a the user doesn't alread exist - clear db first
    it('creates a new user', () => {
        cy.visit('http://localhost:3000/signin');

        cy.get('input[placeholder="New user name"]').type('newPerson');

        cy.get('button[id="signupbtn"]').click();

        cy.contains('Hello newPerson');

    });

    it("won't allow creation of a new user with an existing name", () => {
        // log out for next test
        cy.get('button[aria-label="Log out"]').click();

        cy.visit('http://localhost:3000/signin');

        cy.get('input[placeholder="New user name"]').type('newPerson');

        cy.get('button[id="signinbtn"]').click();

        cy.contains('Login error');

        cy.get('button[id="closemodal"]').click();
    });

    it("checks new username restrictions when creating a user", () => {
        // 1) check: minimun length of new username 
        cy.get('input[placeholder="New user name"]').type('ab');

        cy.get('button[id="signinbtn"]').click();

        cy.contains('Login error');
    });
})