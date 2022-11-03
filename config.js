import AWS from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import https from 'https';

AWS.config.update({
    region: 'REGION',
    accessKeyId: 'ENTERYOURACCESSKEY',
    secretAccessKey: 'ENTERYOURSECRETACCESSKEY'
});
export const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
export const QueueUrl = "https://sqs.us-east-1.amazonaws.com/087323768361/aws-sqs";

export const createConsumerAndReadMessage = () => {
    const app = Consumer.create({
        queueUrl: QueueUrl,
        messageAttributeNames: ['All'],
        handleMessage: async (message) => {
            console.log(message.Body);
            console.log(JSON.parse(JSON.stringify(message.MessageAttributes)));
        },
        sqs: new AWS.SQS({
            httpOptions: {
                agent: new https.Agent({keepAlive: true})
            }
        })
    });

    app.on('error', (err) => {
        console.error(err.message);
    });
      
    app.on('processing_error', (err) => {
        console.error(err.message);
    });
    
    app.start();
}