/// <reference types="cypress" />

describe('Testing navigation', () => {
    beforeEach(() => {
        cy.visit('https://gutovskiy.ru');
    });

    it('chek nav links', () => {
        cy.get('.navigation__content').should('exist');
        cy.get('.navigation__content li a').should('have.length', 4);
    });

    it('check "Home" link', () => {
        cy.get('.navigation__content li a').eq(0).click();
        cy.url().should('equal', 'https://gutovskiy.ru/');
    });

    it('check "For developers" link', () => {
        cy.get('.navigation__content li a').eq(1).click();
        cy.url().should('equal', 'https://gutovskiy.ru/for-developers');
    });
    
    it('check "Notes" link', () => {
        cy.get('.navigation__content li a').eq(2).click();
        cy.url().should('equal', 'https://gutovskiy.ru/notes');
    });
    
    it('check "Portfolio" link', () => {
        cy.get('.navigation__content li a').eq(3).click();
        cy.url().should('equal', 'https://gutovskiy.ru/portfolio');
    });
});

describe('Testing "Home" page', () => {
    it('check title', () => {
        cy.visit('https://gutovskiy.ru');

        cy.get('h1')
            .should('exist')
            .should('contain.text', 'Гутовский Сережа')
            ;
    });
});

describe('Testing "For developers" page', () => {
    beforeEach(() => {
        cy.visit('https://gutovskiy.ru/for-developers');
    });
    
    it('check api posts', () => {
        cy
            .request('https://gutovskiy.ru/api/posts')
            .should((response) => {
                const data = response.body;
                const status = data.status;
                const posts = data.data.posts; 

                expect(status).to.equal(1);
                expect(posts).to.be.an('array');
            });
    });

    it('check page posts', () => {
        cy
            .request('https://gutovskiy.ru/api/posts')
            .then((response) => {
                const data = response.body;
                const status = data.status;
                const posts = data.data.posts;

                cy.get('.for-developers-posts article').should('have.length', posts.length);

                cy.get('.for-developers-posts article').each((item, i) => {
                    cy.get('.post__title').eq(i).should('contain.text', posts[i].title);
                });
            });
    });
});

describe('Testing "Notes" page', () => {
    beforeEach(() => {
        cy.visit('https://gutovskiy.ru/notes');
    });
    
    it('check api notes', () => {
        cy
            .request('https://gutovskiy.ru/api/notes')
            .should((response) => {
                const data = response.body;
                const status = data.status;
                const notes = data.data.notes; 

                expect(status).to.equal(1);
                expect(notes).to.be.an('array');
            });
    });

    it('check page notes', () => {
        cy
            .request('https://gutovskiy.ru/api/notes')
            .then((response) => {
                const data = response.body;
                const status = data.status;
                const notes = data.data.notes; 

                expect(status).to.equal(1);
                expect(notes).to.be.an('array');

                cy.get('.notes-list__item').should('have.length', notes.length);

                for (const note of notes) {
                    cy.get(`.notes-list__item[data-note-id='${note.id}']`).then((note_el) => {
                        cy.wrap(note_el).should('exist');
                        cy.wrap(note_el).contains(note.name);
                    });
                }
            });
    });
});

describe('Testing "Portfolio" page', () => {
    beforeEach(() => {
        cy.visit('https://gutovskiy.ru/portfolio');
    });

    it('check api projects', () => {
        cy
            .request('https://gutovskiy.ru/api/portfolio')
            .should((response) => {
                const data = response.body;
                const status = data.status;
                const projects = data.data.projects; 

                expect(status).to.equal(1);
                expect(projects).to.be.an('array');
            });
    });

    it('check page projects', () => {
        cy
            .request('https://gutovskiy.ru/api/portfolio')
            .then((response) => {
                const data = response.body;
                const status = data.status;
                const projects = data.data.projects;

                cy.get('.portfolio-item').should('have.length', projects.length);
            });
    });
});