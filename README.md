# AWS secrets parser

Fetch and parse JSON from AWS secrets manager.

![Review](https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/aws-secrets-parser/review.yaml)
![Version](https://img.shields.io/npm/v/aws-secrets-parser)
![Downloads](https://img.shields.io/npm/dw/aws-secrets-parser)
![Size](https://img.shields.io/bundlephobia/min/aws-secrets-parser)
![Quality](https://img.shields.io/codacy/grade/c404206e7d28495fb7800b1d5666425d)
![Coverage](https://img.shields.io/codacy/coverage/c404206e7d28495fb7800b1d5666425d)

## Motivation

If I have a JSON secret:

```json
{
  "username": "***",
  "password": "***"
}
```

I want to programmatically retrieve and parse it into an object:

```ts
import secrets from "aws-secrets-parser";

secrets.retrieve("database-secret").then(({ username, password }) => { ... });
```

I also want to format and export the values to environment variables:

```bash
> source <(aws-secrets-parser database-secret --format constant --prefix DATABASE)

DATABASE_USERNAME=***
DATABASE_PASSWORD=***
```

## Installing

```bash
npm install aws-secrets-parser
```

To make the cli accessible install the package globally with the `-g` flag or invoke it with `npx`.

## Usage

Fetch and parse a JSON secret:

```ts
import secrets from "aws-secrets-parser";

secrets.retrieve("database-secret", "us-east-1");
```

### CLI

```bash
aws-secrets-parser <name>

Fetch and parse JSON from AWS secrets manager.

Positionals:
  name                                                                  [string]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
  -r, --region                                   [string] [default: "us-east-1"]
  -f, --format                          [string] [choices: "constant", "pascal"]
  -p, --prefix                                                          [string]
```

CaseFormat:

- **`--format constant`** → `CONSTANT_CASE`
- **`--format pascal`** → `PascalCase`

#### Examples

```bash
> source <(aws-secrets-parser database-secret --format constant --prefix DATABASE)

DATABASE_USERNAME=***
DATABASE_PASSWORD=***
```

#### Implementation

Since you can't set environment variables from a script directly the cli instead prints export statements:

```bash
> aws-secrets-parser ...

export KEY=VALUE
```

Running the cli with `source` will consume them:

```bash
> source <(aws-secrets-parser ...)
```

## Tooling

### Dependencies

To install dependencies:

```bash
yarn install
```

### Tests

To run tests:

```bash
yarn test
```

### Documentation

To generate the documentation locally:

```bash
yarn docs
```

### Linters

To run linters:

```bash
yarn lint
```

### Formatters

To run formatters:

```bash
yarn format
```

## Contributing

Please read this repository's [Code of Conduct](CODE_OF_CONDUCT.md) which outlines our collaboration standards and the [Changelog](CHANGELOG.md) for details on breaking changes that have been made.

This repository adheres to semantic versioning standards. For more information on semantic versioning visit [SemVer](https://semver.org).

Bump2version is used to version and tag changes. For example:

```bash
bump2version patch
```

### Contributors

- [Joel Lefkowitz](https://github.com/joellefkowitz) - Initial work

## Remarks

Lots of love to the open source community!

<div align='center'>
    <img width=200 height=200 src='https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif' alt='Be kind to your mind' />
    <img width=200 height=200 src='https://media.giphy.com/media/KEAAbQ5clGWJwuJuZB/giphy.gif' alt='Love each other' />
    <img width=200 height=200 src='https://media.giphy.com/media/WRWykrFkxJA6JJuTvc/giphy.gif' alt="It's ok to have a bad day" />
</div>
