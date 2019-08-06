const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.SID;
const authToken = process.env.KEY;

const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
/**
* @description class will implement functionalities for order history
*
* @class User
*/
class Whatsapp {
  /**
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static callbot(req, res) {

    try {
      
      
      const twiml = new MessagingResponse();
      var base = 'https://api.duckduckgo.com/?skip_disambig=1&format=json&pretty=1&q=';
      var query = req.body.Body;
      
      request(base + query, function (error, response, body) {
        body = JSON.parse(body)  
        console.log(body);
        if(body["Abstract"] == ""){
            body["Abstract"]= body["RelatedTopics"][0]["Text"]
          }

           const msg = twiml.message(`*`+body["Heading"]+`*`+body["Abstract"]);
                      
         
     });
        
      res.set('Content-Type', 'text/xml');
      return res.status(200).send({
        
        success: true,
        message: 'bot responded',
        msg
      });
   
    } catch (error) {
      return error;
    }
  }
}

export default Whatsapp;
