# Cloud Drive

In this project I have created a cloud drive using the AWS S3 service. The cloud drive is a mobile application that allows users to upload and download files from the cloud. The application is built using React Native and AWS Services.

## AWS Services Used

- AWS S3
- AWS DynamoDB
- AWS Lambda
- AWS CloudWatch
- AWS CloudFormation
- EC2 Instance
- AWS API Gateway
- Secrets Manager
- SNS
- AWS Backup

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The things you need before installing the software.

- Node.js
- React Native
- AWS CLI

### Installation

Clone the repository and setup the infrastructure.

```shell
$ git clone https://github.com/Jeet989/Cloud-Drive.git && cd Cloud-Drive
```

> Provision the AWS Services using the CloudFormation Script

```shell
$ cd backend && aws cloudformation create-stack --stack-name CloudTerm --template-body file://cloudformation.yaml --capabilities CAPABILITY_NAMED_IAM
```

> Install the Mobile Application

```shell
$ cd ../frontend && npm install && npx react-native run-android
```

### Team

- [Jeet Mehta](https://github.com/Jeet989)
