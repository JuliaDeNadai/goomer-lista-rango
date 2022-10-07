<h1 align="center">
   <a href="#"> Goomer Lista Rango </a>
</h1>

<h3 align="center">
    API RESTful capaz de gerenciar os restaurantes e os produtos do seu cardápio.
</h3>


<p align="center">
 <a href="#%EF%B8%8F-features">Features</a> •
 <a href="#-iniciando-o-projeto">Iniciando o projeto</a> • 
 <a href="#-stack">Stack</a> •
 <a href="#-desafios-&-problemas">Desafios & Problemas</a> •
 <a href="#-melhorias">Melhorias</a> •
  <a href="#-decisões-técnicas">Decisões técnicas</a> •
  <a href="#%EF%B8%8F-autor">Autor</a> 
</p>


## ⚙️ Features

### Rotas da API:  
✔️ Rota para cadastrar restaurante  
✔️ Rota para alterar restaurante   
✔️ Rota para excluir restaurante   
✔️ Rota para listar dados de um restaurante   
✔️ Rota para listar produtos de um restaurante    
✔️ Rota para listar todos os restaurantes. (Feito utilizando paginação)  
✔️ Rota para cadastrar produto  
✔️ Rota para alterar produto   
✔️ Rota para listar todos os produtos. (Os registros são retornados com paginação)    
✔️ Rota para listar dados de um produto    
✔️ Rota para excluir um produto      
✔️ Rota para cadastrar uma promoção para um produto      
✔️ Rota para listar dados de uma promoção    
✔️ Rota para listar promoções relacionadas a um produto   
✔️ Rota para cadastrar uma categoria de produtos   
✔️ Rota para listar dados de uma categoria   

### Recursos técnicos:  
✔️ Documentação com OpenAPI (swagger)  
✔️ Migrations para o banco de dados  

---

## 🚀 Iniciando o projeto

### Pre-requisitos

Antes que possa começar, é necessário ter as seguintes ferramentas instaladas em sua máquina:  
* [Node](https://nodejs.org/en/download/)  
* [MySQL](https://dev.mysql.com/downloads/installer/)
* Também será necessário um editor de texto como [VSCode](https://code.visualstudio.com/)  

> <details open>
>	 <summary>
> 		<b> Rodando localmente </b>
>	 </summary>
> 
>	 1. Clone o repositório:  
>	 	`$ git clone https://github.com/JuliaDeNadai/goomer-lista-rango.git`  
> 	2. Acesse a pasta do projeto pelo terminal:  
>	 	`$ cd goomer-lista-rango`  
> 	3. Instale todas as dependências do projeto:  
> 		`$ npm install`   
> 	4. Rode a aplicação com:  
> 		`$ yarn dev `  
>	 6. O servidor irá iniciar na porta: 3308 - [veja a documentação](http://localhost:3308/goomer-lista-rango-api)
> </details>

> <details open>
>	 <summary>
> 		<b> Rodando testes (Infelizmente boa parte está falha) </b>
>	 </summary>
> 
> 	1. Inicie o servidor de testes:  
> 		`$ yarn test-server `  
>	 2. Em outro terminar, inicie os testes:
>     `$ yarn test `
> </details>

---

## 🛠 Stack

As seguintes ferramentas foram utilizadas para o desenvolvimento do projeto:

  [Typescript](https://www.typescriptlang.org/) + [Nodejs](https://nodejs.org/en/) + [Express](https://expressjs.com/pt-br/)

---
## 😭 Desafios & Problemas

* Criação dos testes, tanto unitários quanto testes de integração. Já havia trabalhado com testes de integração antes, porém com uma versão anterior do Typeorm, tive problemas para limpar os dados do banco após cada teste, dessa forma, infelizmente um teste atrapalhou o outro, não consegui concluir os testes.

* Dificuldade para lidar com a foto do restaurante e do produto. Inicialmente pensei em fazer do campo foto uma string, onde seria armazenado o caminho para a pasta onde a foto estaria armazenada de fato. Mas não consegui executar como o planejado, não consegui fazer requisição com a imagem e o formato json no body na mesma requisição, dessa forma não consegui seguir como planejado.


## 📈 Melhorias

* Trabalhar melhor com TDD, dessa forma sendo possível fazer uma boa utilização de testes unitários e de integração, o que vai assegurar a qualidade e previnir erros inesperados na API.

* Implementar nas rotas de delete a utilização do soft delete, dessa forma, é possível manter histórico de registros mesmo que já tenham sido "apagados". Permite também uma recuperação mais simples caso uma exclusão acidental ocorra.

* Implementar filtros com a utilização de query strings, assim não se faz necessário criar rotas alternativas para cada filtro que seja necessário.

* Adicionar alem da rota PUT, uma rota PATCH, onde é possível alterar algumas propriedades do restaurante e produto.

* Fazer melhor utilização dos middlwares e utilizr verificações para garantir parâmetros corretos vindo do body da requisição.

## 👓 Decisões Técnicas

### Como tratar os diferentes preços da promoção?

Decidi criar uma tabela só para promoções, dessa forma é possível criar mais que 1 promoção para cada produto, além fazer manutenção desses dados de forma mais simples. 

### Categorias de produtos

Para lidar com o campo de categoria, decidi criar uma tabela somente para isso, assim é possível padronizar as categorias, tornando muito mais simples a classificação dos produtos e a recuperação dos dados. Dessa forma também se evita erros operacionais que podem ocorrer as digitar a mesma categoria ao cadastrar cada produto.

---

## 👩‍⚕️ Autor

<a href="https://github.com/JuliaDeNadai">
 <img style="border-radius: 50%;" src="https://github.com/JuliaDeNadai.png" width="100px;" alt=""/>
 <br />
 <sub><b>Julia De Nadai</b></sub></a> <a href="https://github.com/JuliaDeNadai" title="Github Julia">🚀</a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Julia-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://in.linkedin.com/in/juliadenadai)](https://in.linkedin.com/in/juliadenadai) 
[![Gmail Badge](https://img.shields.io/badge/-denadaijulia@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:denadaijulia@gmail.com)](mailto:denadaijulia@gmail.com)
