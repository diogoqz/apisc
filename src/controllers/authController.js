const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const request = require('request')



const router = express.Router();

router.post('/add', async (req, res)=>{

    const { nome } = req.body;

    try{
        if (await User.findOne({ nome }))
            return res.status(400).send({ error : 'Usuário já cadastrado'});
        
    const user = await User.create(req.body);

        return res.send({ user });

    } catch (err) {
        return res.status(400).send({ error : err});
    }
});

router.post('/register', async (req, res)=>{

    const { nome } = req.body;

    try{
        if (await User.findOne({ nome }))
            return res.status(400).send({ error : 'Usuário já cadastrado'});
        
    const user = await User.create(req.body);

        return res.send({ user });

    } catch (err) {
        return res.status(400).send({ error : err});
    }
});

router.post('/autenticate', async (req, res) => {
    const { nome, email, telefone } = req.body;
    const user = await User.findOne({ nome }).select('+email')
    if (!user)
    return res.status(400).send({ error : 'Usuario não encontrado'});
    if (!email)
    return res.status(400).send({ error : 'Email não encontrado'});
    res.send({ user })
})

router.get('/verifica/:pN/:pTxt', async (req, res) => {
    

    const separa = (vlr)=>{
        var expr = /[\/]/;
        var rst = vlr.split(expr);
        return rst[4]; 
    }
    //const { nome, msg, telefone } = req.body;
    var sessao = req.params.pN;
    const telefone = req.params.pN;
    const nome = separa(sessao);
    const msg = req.params.pTxt;

    try{
        if (await User.findOne({ nome })){
            const resposta = await detectIntent(telefone, msg)
            res.json({"fulfillmentMessages": resposta})
        }
        else if (await User.findOne({ telefone })){
            const resposta = await detectIntent(telefone, msg)
            res.json({"fulfillmentMessages": resposta})
        } else {
            const resposta = await detectIntentCadastro(telefone, msg)
            res.json({"fulfillmentMessages": resposta})
         }
    //const user = await User.create(req.body);
        

    } catch (err) {
        return res.status(400).send({ error : err});
    }


})   
      //  const resposta = await detectIntent(telefone, msg)
        //res.json({"fulfillmentMessages": resposta})

    async function detectIntent(telefone, msg) {


      process.env.GOOGLE_APPLICATION_CREDENTIALS = "chave.json"
      const languageCode = 'pt-BR';
      const dialogflow = require('dialogflow');
      const sessionClient = new dialogflow.SessionsClient();


        const projectId = 'api-v2-qrtkgh';
        const sessionId = telefone;
        const queries = [
          msg
        ] 
        // The path to identify the agent that owns the created intent.
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
        // The text query request.
        const request = {
          session: sessionPath,
          queryInput: {
            text: {
              text: msg,
              languageCode: languageCode,
            },
          },
        };
  
        const [response] = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = response.queryResult;
        // Instantiates a context client
        const contextClient = new dialogflow.ContextsClient();
      
        console.log(`  Query: ${result.queryText}`);
        
        process.env.GOOGLE_APPLICATION_CREDENTIALS = ""
        return result.fulfillmentMessages
        
    };

    async function detectIntentCadastro(telefone, msg) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "chaveCadastro.json"
      const languageCode = 'pt-BR';
      const dialogflow = require('dialogflow');
      const sessionClient = new dialogflow.SessionsClient();

        const projectId = 'cadastro-vgwpua';
        const sessionId = telefone;
        const queries = [
          msg
        ]
        // The path to identify the agent that owns the created intent.
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                text: msg,
                languageCode: languageCode,
              },
            },
          };
    
          const [response] = await sessionClient.detectIntent(request);
          console.log('Detected intent');
          const result = response.queryResult;
          // Instantiates a context client
          const contextClient = new dialogflow.ContextsClient();
        
          console.log(`  Query: ${result.queryText}`);
          console.log(`  Response: ${result.fulfillmentText}`);
          process.env.GOOGLE_APPLICATION_CREDENTIALS = ""
          return result.fulfillmentMessages
          
     
  
        
    };







module.exports = app => app.use('/auth', router)