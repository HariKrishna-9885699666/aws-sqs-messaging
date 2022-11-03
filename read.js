import {sqs, QueueUrl, createConsumerAndReadMessage} from './config.js';

let readUserDetails = function () {
    const params = {
        MaxNumberOfMessages: 10,
        AttributeNames: ["SentTimestamp"],
        MessageAttributeNames: ["All"],
        VisibilityTimeout: 2,
        WaitTimeSeconds: 0,
        QueueUrl: QueueUrl
    };

    // sqs.receiveMessage(params, function (err, data) { 
    //     if (err) {
    //         console.log("Receive Error", err); 
    //     } else if (data.Messages) {
    //         data.Messages.forEach(msg => {
    //             console.log(msg.Body); 
    //             console.log(JSON.stringify(msg.MessageAttributes)); 
    //         });
    //         const deleteParams = {
    //             QueueUrl: QueueUrl,
    //             ReceiptHandle: data.Messages[0].ReceiptHandle
    //         };
    //         sqs.deleteMessage(deleteParams, function(err, data) {
    //             if (err) {
    //                 console.log("Delete Error", err);
    //             } else {
    //                 // console.log("Message Deleted", data);
    //             }
    //         });
    //     }
    // });

    createConsumerAndReadMessage();
}
readUserDetails();