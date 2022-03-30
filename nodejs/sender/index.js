const tracer = require('dd-trace').init();
const util = require('util')


// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region we will be using
AWS.config.update({region: 'eu-west-1'});
// Create SQS service client
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
// Setup the sendMessage parameter object


const ingredients = tracer.trace('send sqs message', { resource: 'resource_name' }, () => {
        
        const span = tracer.scope().active()
        span.addTags({
          user_id: sum1(1,2)
        })
        const _datadog = {}
        tracer.inject(span, 'text_map', _datadog)
        const traceID = tracer.scope().active()?.context().toTraceId();
        const spanID = tracer.scope().active()?.context().toSpanId();
        const params = {
                MessageBody: JSON.stringify({
                order_id: 1234,
                date: (new Date()).toISOString(),
                spanID: spanID,
                traceID: traceID
                }),
        QueueUrl: 'https://sqs.eu-west-1.amazonaws.com/601427279990/cathalsqueue'
        };
        console.log(tracer.scope().active()?.context().toTraceId());
        sqs.sendMessage(params, (err, data) => {
        if (err) {
                console.log("Error", err);
        } else {
                console.log("Successfully added message", data.MessageId);

        }
        });

});

function sum1 (x,y)
{ 
   return (x+y);
}

