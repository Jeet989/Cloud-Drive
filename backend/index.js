const app = require('express')
const server = app()
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const port = 3000

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { DynamoDBClient, PutItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb')
const { default: axios } = require('axios')
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

const s3Client = new S3Client({
    region: '------',
    credentials: {
        accessKeyId: '------',
        secretAccessKey: '------'
    }
})

const dynamoDBClient = new DynamoDBClient({
    region: '------',
    credentials: {
        accessKeyId: '------',
        secretAccessKey: '------'
    }
})

const secretManagerClient = new SecretsManagerClient({
    region: '------',
    credentials: {
        accessKeyId: '------',
        secretAccessKey: '-------'
    }
})

server.get('/', (req, res) => {
    return res.send('Hsdsdsdello World!')
})

server.post('/subscribe', async (req, res) => {
    const APIURL = new GetSecretValueCommand({ SecretId: '/cloudy/subscribe' })
    const data = await secretManagerClient.send(APIURL)
    try {
        const resp = await axios.post(data.SecretString, {
            user: req.body.user
        })

        return res.send({ message: 'Subscribed successfully' })
    } catch (error) {
        return res.send({ message: 'Subscribed failed' })
    }
})

server.post('/upload', upload.single('image'), async (req, res) => {
    try {
        console.log(req.file)
        const { user } = req.body
        const { file } = req

        const fileStream = fs.createReadStream(req.file.path)
        const uploadParams = {
            Bucket: 'cloud-drive-term-project',
            Key: req.file.originalname,
            Body: fileStream
        }

        const data = await s3Client.send(new PutObjectCommand(uploadParams))

        if (data.$metadata.httpStatusCode === 200) {
            const getCommand = new GetItemCommand({
                TableName: 'users',
                Key: {
                    email: { S: user }
                },
                AttributesToGet: ['files']
            })
            const data = await dynamoDBClient.send(getCommand)
            const files = data?.Item?.files?.L?.map(val => {
                return val.M
            }) || []
            files.push({
                name: { S: file.originalname },
                uri: { S: `https://cloud-drive-term-project.s3.amazonaws.com/${uploadParams.Key}` },
                type: { S: file.mimetype },
                size: { S: file.size.toString() }
            })
            const command = new PutItemCommand({
                TableName: 'users',
                Item: {
                    email: { S: user },
                    files: {
                        L: files.map(u => {
                            return {
                                M: {
                                    name: { S: u.name.S },
                                    uri: { S: u.uri.S },
                                    type: { S: u.type.S },
                                    size: { S: u.size.S }
                                }
                            }
                        })
                    }
                }
            })
            await dynamoDBClient.send(command)

            const SENDNOTSAPIURL = new GetSecretValueCommand({ SecretId: '/cloudy/sendNotification' })

            const dataAPI = await secretManagerClient.send(SENDNOTSAPIURL)

            await axios.post(dataAPI.SecretString, {
                user: req.body.user
            })
                .then(res => console.log('res ==>', res))
                .catch(err => console.log('err ==>', err))

            return res.send({ url: `https://cloud-drive-term-project.s3.amazonaws.com/${uploadParams.Key}` })
        }
    } catch (error) {
        console.log('inside error catchh ==>', error)
        return res.send({ message: 'Upload failed' })
    }
})

server.get('/get-file', async (req, res) => {
    const { user } = req.query

    const command = new GetItemCommand({
        TableName: 'users',
        Key: {
            email: { S: user }
        }
    })
    const data = await dynamoDBClient.send(command)
    const files = data?.Item?.files?.L?.map(val => {
        return val.M
    }) || []

    return res.send({
        files: files
    })
})

server.post('/logout', async (req, res) => {
    const deleteSubscribeAPIURL = new GetSecretValueCommand({ SecretId: '/cloudy/unsubscribe' })
    const data = await secretManagerClient.send(deleteSubscribeAPIURL)
    try {
        const resp = await axios.post(data.SecretString)

        return res.send({ message: 'Logged out successfully' })
    } catch (error) {
        return res.send({ message: 'Logged out failed' })
    }
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))