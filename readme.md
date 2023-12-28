
# Lumi - extracao de dados

Projeto feito para extracao de dados de fatura de energia e exibi-los no frontend



## Stack utilizada

**Front-end:** React, Jest, Sass

**Back-end:** Node, Express

**Bot Extracao:** Python, pdfplumber, sqlAlchemy


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/ViniciusCosta126/lumi.git
```

Entre no diretório do projeto

```bash
cd lumi
```
Configurando front
```bash
  cd front
```
Instale as dependencias
```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

Configurando backend
```bash
  cd backend
```
Instale as dependencias
```bash
  yarn
```

Inicie o servidor

```bash
  yarn start
```

Configurando bot
```bash
  cd extracao
```
Crie o ambiente virtual

```bash
    python -m venv env
```

Ative o ambiente virtual

- Windows
```bash
    .\env\Scripts\activate
```
- Linux ou macos
```bash
    source env/bin/activate
```

Instale os requisitos
```bash
    pip install -r requirements.txt
```

Para rodar o projeto 

```bash
    python app.py
```

**Lembre de ter o postgresql instalado em sua maquina**