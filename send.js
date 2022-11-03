import { faker } from '@faker-js/faker';
import {sqs, QueueUrl} from './config.js';

const sendUserDetails = function () {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const middleName = faker.name.middleName();
    const gender = faker.name.gender();
    const phoneNumber = faker.phone.number();
    const email = faker.internet.email(firstName, lastName);
    const avatar = faker.image.avatar();
    const city = faker.address.cityName();
    const country = faker.address.country();
    const params = {
        DelaySeconds: 2, 
        MessageAttributes: { 
            "Title": {
                DataType: "String", 
                StringValue: "AWS SQS POC"
            },
            "FirstName": {
                DataType: "String", 
                StringValue: firstName
            },
            "LastName": {
                DataType: "String", 
                StringValue: lastName
            },
            "MiddleName": {
                DataType: "String", 
                StringValue: middleName
            },
            "Gender": {
                DataType: "String", 
                StringValue: gender
            },
            "Mobile": {
                DataType: "String", 
                StringValue: phoneNumber
            },
            "Email": {
                DataType: "String", 
                StringValue: email
            },
            "ProfilePic": {
                DataType: "String", 
                StringValue: avatar
            },
            "City": {
                DataType: "String", 
                StringValue: city
            },
            "Country": {
                DataType: "String", 
                StringValue: country
            }
        },
        MessageBody: `Personal Information about ${firstName} ${lastName}`,
        QueueUrl: QueueUrl
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log(`Details of ${firstName} ${lastName} sent successfully to AWS SQS, Message ID: `, data.MessageId);
        } 
    });
}

sendUserDetails();