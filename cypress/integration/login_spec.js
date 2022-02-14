/* eslint-disable no-undef */
describe('Log in test', () => {

    it('wont log in a non user', () => {
        cy.visit('http://localhost:3000/');

        cy.contains('Log in').click();

        cy.visit('http://localhost:3000/signin');

        cy.get('input[placeholder="User name"]').type('abc');

        cy.get('button[id="signinbtn"]').click();

        cy.contains('Login error');
    });

    it('logs in and logs out a user', () => {
        cy.visit('http://localhost:3000/signin');

        cy.get('input[placeholder="User name"]').type('cypresTesUser');

        cy.get('button[id="signinbtn"]').click();

        cy.contains('Hello cypresTesUser');

        // log out
        cy.get('button[aria-label="Log out"]').click();

        cy.contains('Just recipes');

    });
    
})