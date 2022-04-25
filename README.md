# CHANGEME

## Setup

### Node

1.  Install `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm))
2.  `cd` to the project directory and execute the following:
    ```
    nvm install
    nvm use
    npm install
    ```

### IDE Setup

This project uses [EditorConfig](https://editorconfig.org/) for IDE configuration.

See `.editorconfig` for settings.

Many popular IDEs and editors support this out of the box or with a plugin.

### AWS

1.  Install AWS CLI for your computer
2.  Setup AWS CLI with your credentials
3.  Add a configuration for `serverless` in your AWS config files

### Serverless

This project uses [Serverless] to deploy. Install `serverless` as a global:

```
npm install -g serverless
```

Change the bucket to be used for logs in the `custom.logs.bucket` property in `serverless.yml`.

### Domain Name

1.  Register a domain name in AWS Route53
2.  Change the base `custom.baseDomainName` property in `serverless.yml` to the zone name, eg `whatever.com`

## Development

### Running the Local Server

```
npm run server:development
```

The server runs at [http://localhost:5001/](http://localhost:5001/).

The port can be changed by setting the environment variable `WEBPACK_SERVER_PORT` to an open port.

### Prettier

This project uses [Prettier](https://prettier.io/), so please run it before checking in:

```
npm run pretty
```

See `.prettierrc` for settings.

Some IDEs and editors have plugins for running Prettier.

### Linting

This project uses [ESLint](https://eslint.org/). Check linting before checking in:

```
npm run lint
```

See `tslint.json` for settings.

Many IDEs and editors support TSLint.

## Testing

This project uses [Jest](https://jestjs.io/) for testing. Run tests before checking in.

```
npm test
```

## Building

### Development

```
npm run build:development
```

### Production

```
npm run build
```

## Deploy

> NOTE: AWS Certificate validation requires a manual step during the first deployment.
>
> When the following is displayed, go to the AWS Certificate Manager console for the new domain name and create the record in Route 53:
>
> `CloudFormation - CREATE_IN_PROGRESS - AWS::CertificateManager::Certificate - WebAppCertificate`

### Test

```
npm run deploy:test
```

### Production

```
npm run deploy
```

### Troubleshooting

If there are errors when deploying, check the Cloudformation logs for the stack.
