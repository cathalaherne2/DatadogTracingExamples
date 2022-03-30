
const tracer = require('dd-trace').init();
const https = require('https');
const AWS = require('aws-sdk');
const SQS = new AWS.SQS({apiVersion: '2012-11-05'});

const util = require('util')

SQS.config.update({
  region: 'eu-west-1'
});

const queueUrl = "https://sqs.eu-west-1.amazonaws.com/601427279990/cathalsqueue";
var SQS_PARAMS = {    
    QueueUrl: queueUrl,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 10,
    MessageAttributeNames: [
        "All"
     ],
};

SQS.receiveMessage(SQS_PARAMS,function(err,result){
    if(err){
        console.log("Error reading SQS");
        console.log(err);
        return;
    }
    //Full result object including message metadata
    console.log(result);

    //Only the messages
    console.log(result.Messages)

    //List of attributes for an individual message [0]
    console.log(result.Messages[0].MessageAttributes);
    console.log(tracer.scope().active()?.context().toTraceId());
})
