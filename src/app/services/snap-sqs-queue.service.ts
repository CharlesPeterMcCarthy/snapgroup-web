import { Injectable } from '@angular/core';
// import https from 'https';
import { Consumer, SQSMessage } from 'sqs-consumer';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class SnapSqsQueueService {

  private awsRegion = 'eu-west-1';
  private awsAccountId = '068475715603';
  private awsTopicName = 'snapgroup-snaps';
  private awsAccessKeyId = 'AKIAQ74LYQAJQ3HF5PMN';
  private awsSecretAccessKey = '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';
  private SQSPolicy = (queueName: string): string =>
      `{"Version":"2012-10-17","Id":"arn:aws:sqs:${this.awsRegion}:${this.awsAccountId}:undefined/SQSDefaultPolicy",
	"Statement":[{"Sid":"topic-subscription-arn:aws:sns:${this.awsRegion}:${this.awsAccountId}:${this.awsTopicName}",
	"Effect":"Allow","Principal":{"AWS":"*"},"Action":"SQS:SendMessage",
	"Resource":"arn:aws:sqs:${this.awsRegion}:${this.awsAccountId}:${queueName}",
	"Condition":{"ArnLike":{"aws:SourceArn":"arn:aws:sns:${this.awsRegion}:${this.awsAccountId}:${this.awsTopicName}"}}}]}`;

  public constructor() {
    const username: string = localStorage.getItem('username');
    console.log('Creating SQS Queue', username);

    AWS.config.update({
      region: this.awsRegion,
      accessKeyId: this.awsAccessKeyId,
      secretAccessKey: this.awsSecretAccessKey
    });

    this.SetupConsumer(username);
  }

  public SetupConsumer = async (username: string): Promise<void> => {
    const queueName: string = await this.CreateQueue(username);
    await this.SubscribeToSNSTopic(queueName);
    this.ListenToQueue(queueName);
  }

  public ListenToQueue = (queueName: string): void => {
    const consumer: Consumer = Consumer.create({
      queueUrl: `https://sqs.${this.awsRegion}.amazonaws.com/${this.awsAccountId}/${queueName}`,
      handleMessage: async (message: SQSMessage): Promise<void> => {
        await this.HandleMessage(message);
      },
      sqs: new AWS.SQS({
        httpOptions: {
          // agent: new https.Agent({
          //   keepAlive: true
          // })
        }
      })
    });

    consumer.on('error', (err: Error): void => {
      console.error(err.message);
    });

    consumer.on('processing_error', (err: Error): void => {
      console.error(err.message);
    });

    consumer.start();
  }

  private SubscribeToSNSTopic = (queueName: string): Promise<boolean> => {
    const sns: AWS.SNS = new AWS.SNS();

    const topicArn = `arn:aws:sns:${this.awsRegion}:${this.awsAccountId}:${this.awsTopicName}`;
    const sqsEndpoint = `arn:aws:sqs:${this.awsRegion}:${this.awsAccountId}:${queueName}`;

    const params: AWS.SNS.SubscribeInput = {
      Protocol: 'sqs',
      TopicArn: topicArn,
      Endpoint: sqsEndpoint
    };

    return new Promise((resolve: any, reject: any): void => {
      sns.subscribe(params, (err: AWS.AWSError, data: AWS.SNS.SubscribeResponse): void => {
        if (err) {
          console.log(`Failed to subscribe SQS queue ${sqsEndpoint} to SNS Topic ${topicArn}`);
          console.log(err, err.stack);
          reject(false);
        } else {
          console.log(`Successfully subscribed to SNS Topic`);
          resolve(true);
        }
      });
    });
  }

  private CreateQueue = (username: string): Promise<string> => {
    const sqs: AWS.SQS = new AWS.SQS({ apiVersion: '2012-11-05' });

    const queueName = `snapgroup-stream-${username}`;

    const params: AWS.SQS.CreateQueueRequest = {
      QueueName: queueName,
      Attributes: {
        MessageRetentionPeriod: '86400',
        Policy: this.SQSPolicy(queueName)
      }
    };

    return new Promise((resolve: any, reject: any): void => {
      sqs.createQueue(params, (err: AWS.AWSError, data: AWS.SQS.CreateQueueResult): void => {
        if (err) {
          console.error(`Error Creating SQS Queue ${queueName}`, err);
          reject(false);
        } else {
          console.log(`Successfully Created SQS Queue ${queueName}`);
          resolve(queueName);
        }
      });
    });
  }

  private HandleMessage = (message: SQSMessage): void => {
    let messageBody: any;

    console.log(message);

    try {
      if (message.Body) messageBody = JSON.parse(message.Body);
    } catch (err) {
      console.error(`Failed to parse SQS message: ${err}`);
    }

    // if (messageBody) {
    //   const currencySuggestion: CurrencySuggestion = JSON.parse(messageBody.Message);
    //
    //   if (currencySuggestion.symbol) CurrencySuggestionsManager.AddSuggestion(currencySuggestion);
    // }
  }

}
