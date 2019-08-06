import { Router } from 'express';
const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.SID;
const authToken = process.env.KEY;

const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const botRouter = Router();


botRouter.post('/incoming', (req, res) => {
  const twiml = new MessagingResponse();
    var base = 'https://api.duckduckgo.com/?skip_disambig=1&format=json&pretty=1&q=';
    var query = req.body.Body;

    request(base + query, function (error, response, body) {
        body = JSON.parse(body)  

        if(body["Abstract"] == ""){
            body["Abstract"]= body["RelatedTopics"][0]["Text"]
          }   

          var msg = twiml.message(`*`+body["Heading"]+`*

`+body["Abstract"]);
            res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
      });

});

export default botRouter;