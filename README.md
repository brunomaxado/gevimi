
Downloads:

ps. Instale as versões mais recentes disponíveis.

1. **Visual Studio Code (VS Code)**: IDE recomendada para trabalhar com o projeto.  
   - Baixe e instale o VS Code: [Download VS Code](https://code.visualstudio.com/download)

2. **Node.js**: Ambiente de execução para JavaScript, necessário para rodar o projeto tanto no frontend quanto no backend.
   - Baixe e instale o Node.js: [Download Node.js](https://nodejs.org/en/download)

3. **MySQL**: Banco de dados utilizado no projeto.
   - Baixe e instale o MySQL junto com o XAMPP (inclui Apache, MySQL, etc):  
     [Download XAMPP](https://www.apachefriends.org/index.html)

4. **MySQL Workbench**: Ferramenta gráfica para administrar bancos de dados MySQL.
   - Baixe e instale o MySQL Workbench:  
     [Download MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

5. **XAMPP**: Ferramenta que inclui MySQL e outros serviços essenciais.
   - Instale o XAMPP e use-o para ligar o servidor MySQL.

### Instruções de Execução:

1. **Configurar o Frontend (Client):**

   - Navegue até a pasta `client`:
     ```bash
     cd src/client
     ```

   - Instale as dependências do projeto:
     ```bash
     npm install
     ```

2. **Configurar o Backend:**

   - Navegue até a pasta `backend`:
     ```bash
     cd src/backend
     ```

   - Instale as dependências do backend:
     ```bash
     npm install
     ```

3. **Configurar o Banco de Dados:**

   - Abra o XAMPP e ligue o **MySQL**.
   - Acesse o **MySQL Workbench** ou o **phpMyAdmin** no XAMPP.
   - Crie um banco de dados chamado `gevimi` (sem senha):
     ```sql
     CREATE DATABASE gevimi;
     ```

   - Execute as queries necessárias para criar as tabelas e dados iniciais. Essas queries podem ser encontradas no arquivo `/src/backend/db.sql` (ou outro arquivo SQL fornecido).

4. **Executar o Frontend (Client):**

   - Após instalar as dependências, execute o comando para iniciar o projeto:
     ```bash
     npm start
     ```

5. **Executar o Backend:**

   - Navegue até a pasta `backend` e inicie o servidor backend:
     ```bash
     npm start
     ```

6. **Acessar o Sistema:**

   - Utilize as seguintes credenciais para acessar o sistema:
     - **Usuário**: `teste`
     - **Senha**: `123`

