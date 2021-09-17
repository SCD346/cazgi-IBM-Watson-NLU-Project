const express = require('express');
const app = new express();

/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

const dotenv = require('dotenv');
const { request } = require('express');
dotenv.config();


    const api_key = process.env.API_KEY;
    const api_url = process.env.API_URL;
    app.get("/",(req,res)=>{
        res.render('index.html');
        });
        
        
       
       
        
       //add the getNLUInstance method here
        
const getNLUInstance = ()=>{
    
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
    
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;
}
//DECLARATION PORTION END


// ENDPOINTS START
//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req,res) => {
 
const analyzeParams = {
 "url": req.query.url,
 "features": {
 "entities": {
 "emotion": true,
 "sentiment": true,
 "limit": 1
//  },
//  "keywords": {
//  "emotion": true,
//  "sentiment": true,
//  "limit": 1
 }
 }
 }
 
 const naturalLanguageUnderstanding = getNLUInstance();
 
 naturalLanguageUnderstanding.analyze(analyzeParams)
 .then(analysisResults => {
 console.log(analysisResults);
 console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
 return res.send(analysisResults.result.entities[0].emotion,null,2);

 })
 .catch(err => {
 return res.send("Could not do desired operation "+err);
 });

});



//The endpoint for the webserver ending with /url/sentiment
app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
     "url": req.query.url,
     "features": {
     "entities": {
     "sentiment": true,
     "limit": 1
    //  },
    //  "keywords": {
    //  "emotion": true,
    //  "sentiment": true,
    //  "limit": 1
     }
     }
     }
     
     const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
     console.log(analysisResults);
     console.log(JSON.stringify(analysisResults.result.entities[0].sentiment,null,2));
     return res.send(analysisResults.result.entities[0].sentiment.label,null,2);
     })
     .catch(err => {
     return res.send("Could not do desired operation "+err);
     });
    });


//The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req,res) => {
 const analyzeParams = {
 "text": req.query.text,
 "features": {
 "entities": {
 "emotion": true,
 "limit": 1
//  },
//  "keywords": {
//  "emotion": true,
//  "sentiment": true,
//  "limit": 1
 }
 }
 }
 
 const naturalLanguageUnderstanding = getNLUInstance();
 
 naturalLanguageUnderstanding.analyze(analyzeParams)
 .then(analysisResults => {
 console.log(analysisResults);
 //console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
return res.send(analysisResults.result.entities[0].emotion,null,2);
 //return res.send(analysisResults);
 })
 .catch(err => {
 return res.send("Could not do desired operation "+err);
 });
 
});


// app.get("/text/emotion", (req,res) => {
//     return res.send({"happy":"10","sad":"90"});
// });


//The endpoint for the webserver ending with /text/sentiment
app.get("/text/sentiment", (req,res) => {
 const analyzeParams = {
 "text": req.query.text,
 "features": {
 "entities": {
 "sentiment": true,
 "limit": 1
//  },
//  "keywords": {
//  "emotion": true,
//  "sentiment": true,
//  "limit": 1
 }
 }
 }
 
 const naturalLanguageUnderstanding = getNLUInstance();
 
 naturalLanguageUnderstanding.analyze(analyzeParams)
 .then(analysisResults => {
 console.log(analysisResults);
 console.log(JSON.stringify(analysisResults.result.entities[0].sentiment,null,2));
return res.send(analysisResults.result.entities[0].sentiment.label,null,2);
 //return res.send(analysisResults);
 })
 .catch(err => {
 return res.send("Could not do desired operation "+err);
 });
 
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

//Updated by removing keyword object