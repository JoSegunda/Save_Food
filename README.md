# 🥗 Salvar Comida — Plataforma Web  
**1º Trabalho Prático — Tecnologias Web (2025/2026)**

Este projeto consiste no desenvolvimento de uma aplicação web *client-side* (HTML, CSS e JavaScript) para apoiar a associação de restaurantes de Évora na divulgação de promoções de última hora, reduzindo o desperdício alimentar e beneficiando consumidores.

A aplicação não possui backend próprio: toda a comunicação é feita com um **servidor de apoio** que devolve respostas simuladas. A interface foi construída de forma responsiva, fluida e modular, seguindo as boas práticas da disciplina.

---

## 📌 Objetivo do Projeto

Criar uma plataforma onde:

- **Restaurantes** podem listar-se e inserir ofertas de refeições com validade para o dia atual.  
- **Clientes** podem pesquisar restaurantes, visualizar ofertas e reservar refeições.  
- **Administradores** podem consultar listagens completas de restaurantes, clientes e ofertas, com opções de filtragem local.  
- Tudo é executado **apenas no client-side**, consumindo endpoints remotos fornecidos pelo enunciado.

---

## 🧩 Funcionalidades Implementadas

### 👨‍🍳 Restaurante
- Listagem de restaurantes.  
- Pesquisa por nome ou morada.  
- Inserção de ofertas (nome, descrição, foto e número de unidades).  
- Visualização das ofertas ativas.

### 🧑‍💻 Cliente
- Listagem de todas as ofertas disponíveis no dia.  
- Pesquisa de ofertas por nome ou restaurante.  
- Reserva de refeições com exibição de mensagens de sucesso ou erro.

### 🛠️ Administração
- Listagem de:
  - Todos os restaurantes  
  - Todos os clientes  
  - Todas as ofertas  
- Filtros locais para nomes e moradas.  
- Acesso a detalhes exclusivos não visíveis ao público geral.

---

## 🌐 Comunicação com o Servidor

A aplicação comunica com os seguintes endpoints obrigatórios:

- `restaurante/list`  
- `restaurante/search`  
- `restaurante/get`  
- `cliente/list`  
- `oferta/list`  
- `oferta/search`  
- `oferta/insert`  
- `oferta/get`  
- `oferta/reserve`  
- `admin/restaurante/list`  
- `admin/cliente/list`  
- `admin/oferta/list`

> ⚠️ Nota: o servidor é apenas uma maquete. Inserções podem não aparecer imediatamente.  
> A aplicação trata erros e mensagens fornecidas pelo servidor, exibindo feedback claro ao utilizador.

---

## 🖥️ Estrutura da Interface

A aplicação possui:

### 🧭 Topo (Header)
- Título do site  
- Opções de navegação entre:
  - Área Pública  
  - Restaurante  
  - Cliente  
  - Administração 

### 📄 Conteúdo Principal
- Área dinâmica que exibe cada secção conforme a navegação.  
- Layout responsivo e adaptado a vários tamanhos de ecrã.  

### 📞 Rodapé (Footer)
- Contactos  
- Créditos dos autores  
- Link para: https://www.uevora.pt/

---

## 📂 Estrutura do Repositório
//TODO

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3** (responsividade, grid/flex layout)
- **JavaScript (ES6+):**
  - Fetch API  
  - DOM Manipulation  
  - Organização modular  

---

## 🚀 Como Executar

Não é necessário servidor local.

Basta abrir o ficheiro:
num navegador (Chrome, Firefox, Edge, etc.).
