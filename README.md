# Proxy e Cron Job - LotoFácil

Este projeto é um servidor **Node.js** que fornece um **proxy** para consumo de dados da API da LotoFácil e um **cron job** para atualização automática de dados no Firebase Firestore.

## 🗂️ Estrutura do Projeto

```plaintext
proxy-cron-job/
├── jobs/
│   └── cronJob.js          # Lógica do cron job para atualizar dados no Firestore
├── services/
│   └── lotoFacilService.js # Serviço para interagir com a API da LotoFácil
├── utils/
│   ├── firebase.js         # Configuração do Firebase
│   └── proxy.js            # Configuração do proxy para a API da LotoFácil
├── .env                    # Variáveis de ambiente
├── package.json            # Configurações do Node.js e dependências
├── server.js               # Servidor principal que integra o proxy e o cron job

```

## 🚀 Instalação e Configuração
1. Clonar ou repositório :
```
git clone https://github.com/seu-usuario/proxy-cron-job.git
cd proxy-cron-job
```
2. Instalar dependências :
```
npm install
```
3. Configurar variáveis ​​de ambiente : Crie um arquivo .envna raiz do projeto com os seguintes dados:
```
REACT_APP_FIREBASE_API_KEY=<sua-chave>
REACT_APP_FIREBASE_AUTH_DOMAIN=<seu-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<seu-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<seu-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<seu-sender-id>
REACT_APP_FIREBASE_APP_ID=<seu-app-id>
REACT_APP_FIREBASE_MEASUREMENT_ID=<seu-measurement-id>
```

## ⚙️ Executando o Projeto
#### 🔗 Servidor Proxy
O servidor proxy permite acessar dados da API da LotoFácil por meio de uma rota local:

1. Iniciar o servidor :
```
npm start
```
2. Testar a rotação do proxy : Use ferramentas como Postman ou curl para verificar:
```
curl http://localhost:3000/api/lotofacil/<id-do-sorteio>
```

## ⏰ Tarefa Cron
O cron job coleta dados automaticamente todos os dias às 03:00 AM e atualiza o Firestore.

Configuração do cron job:
A lógica é inovadora no arquivo server.jse definido para executar automaticamente:
```plaintext
schedule.scheduleJob("0 3 * * *", async () => {
  console.log("Executando o cron job às 03:00 AM...");
  try {
    const novosDados = await coletarDadosLotoFacil();
    console.log("Dados coletados com sucesso:", novosDados);
  } catch (error) {
    console.error("Erro ao executar o cron job:", error.message);
  }
});
```

### 🛠️ Tecnologias Utilizadas
```
* Node.js : plataforma para executar código JavaScript no servidor.
* Express : Framework para construção de APIs e servidores HTTP.
* Firebase Firestore : Banco de dados em nuvem para armazenamento dos dados da LotoFácil.
* Node-Schedule : Biblioteca para agendamento de tarefas.
* Axios : Cliente HTTP para extrair APIs.
```

### ⚠️ Problemas conhecidos

#### 1. Certifique-se de que a configuração do Firebase no arquivo .env está correta.
#### 2. O cron job depende do agendamento em um servidor ativo (ou seja, não funciona se o servidor estiver inativo).
