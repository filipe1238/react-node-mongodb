describe('Usuario CRUD', () => {
    it('Deve listar todos os usuarios', () => {
        cy.visit('localhost:5173/users');
    });

    // testes de criação, edição e exclusão de usuários

    it('Deve criar um novo usuario', () => {
        cy.visit('localhost:5173/users');
        cy.get('.RaCreateButton-root').click();
        cy.get('#name').type('Teste');
        cy.get('#username').type('teste');
        cy.get('#email').type('teste@teste');
        cy.get('#password').type('123456');
        cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();

        // validar se o usuário foi criado
        cy.visit('localhost:5173/users');
        cy.contains('Teste');
    });

    it.only('Deve remover um usuario', () => {
        cy.task('db:erase');
        cy.task('db:create:user', {
            name: 'Teste',
            username: 'teste',
            email: 'teste@teste',
            password: '123456',
        });
        
        cy.visit('localhost:5173/users');
        cy.get('.MuiTableBody-root > :nth-child(1) > .column-id').click();
        cy.get('.ra-delete-button').click();
        cy.contains('Element deleted');
    });

});

