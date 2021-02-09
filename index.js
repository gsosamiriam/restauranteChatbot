const express = require('express');
const app = express();
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const { Carousel } = require('actions-on-google');

 
app.get('/', function (req, res) {
  res.send('Hello World')
});

app.post('/webhook', express.json(),function (req, res) {
  const agent = new WebhookClient({ request:req, response:res });
  console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
 
  function welcome(agent) {
    agent.add(`Benvenuti a Romano. Mi nombre es Bianca, soy un asistente virtual en Romano y puedo: \n 1. Mostrarte el menú \n 2. Tomar tu orden \n`);
    agent.add(`Benvenuto. Mi nombre es Bianca, soy un asistente virtual en Romano y puedo: \n 1. Mostrarte el menú \n 2. Tomar tu orden \n`);
    agent.add(`Bienvenido a Romano. Mi nombre es Bianca, soy un asistente virtual en Romano y puedo: \n 1. Mostrarte el menú \n 2. Tomar tu orden \n`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function probandowebhook(agent) {
    agent.add(`weebhook: `);
     
  }

  function menuAperitivos(agent) {
    agent.add(`Aperitivos: `);
    agent.add(new Card({
      title: `Title: this is a card title`,
      imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
      text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
      buttonText: 'This is a button',
      buttonUrl: 'https://assistant.google.com/'
    })
  );
    
  }
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('probandowebhook', probandowebhook);

  intentMap.set('menuAperitivos', menuAperitivos);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
 
/*app.listen(3000, ()=>{
    console.log("Servidor corriendo en el puerto "+3000);
});*/
app.listen((process.env.PORT || 3000), function(){
  console.log('listening on *:3000');
});
