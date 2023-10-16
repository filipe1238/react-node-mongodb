describe('Usuario CRUD', () => {
    it('Deve listar todos os usuarios', () => {
        cy.visit('localhost:5173/users');
    });
    // cypress beforeEach
    beforeEach(() => {
        cy.task('db:erase');
    });

    // validar 'no users yet'
    it('Deve validar que não existem usuarios', () => {
        cy.visit('localhost:5173/users');
        cy.contains('No User yet');
    });

    // valida listagem de usuarios
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

    // valida criação de usuario com a tecla enter
    it('Deve criar um novo usuario com a tecla enter', () => {
        cy.visit('localhost:5173/users');
        cy.get('.RaCreateButton-root').click();
        cy.get('#name').type('Teste');
        cy.get('#username').type('teste');
        cy.get('#email').type('teste@teste');
        cy.get('#password').type('123456');
        cy.get('#password').type('{enter}');

        // validar se o usuário foi criado
        cy.visit('localhost:5173/users');
        cy.contains('Teste');
    });

    it('Deve remover um usuario', () => {
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

    it('Remove um usuario e clicar em undo', () => {
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
        cy.get('.MuiSnackbarContent-action > .MuiButtonBase-root').click();
        cy.contains('teste@teste');
    });

    it('Deve editar um usuario', () => {
        cy.task('db:create:user', {
            name: 'Teste',
            username: 'teste',
            email: 'teste@teste',
            password: '123456',
        });

        cy.visit('localhost:5173/users');
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .column-id').click();
        cy.get('#name').clear();
        cy.get('#name').type('Teste 2');
        cy.get('.RaToolbar-defaultToolbar > .MuiButton-contained').click();
        cy.contains('Element updated');
        cy.contains('Teste 2');
    });

    it('Deve editar um usuario e clicar em undo', () => {
        cy.task('db:create:user', {
            name: 'Teste',
            username: 'teste',
            email: 'teste@teste',
            password: '123456',
        });

        cy.visit('localhost:5173/users');
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .column-id').click();
        cy.get('#name').clear();
        cy.get('#name').type('Teste 2');
        cy.get('.RaToolbar-defaultToolbar > .MuiButton-contained').click();
        cy.contains('Element updated');
        cy.contains('Teste 2');
        cy.get('.MuiSnackbarContent-action > .MuiButtonBase-root').click();
        cy.contains('Teste');
    });
});

