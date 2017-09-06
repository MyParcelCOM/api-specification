# MyParcel.com API specification

This repository describes the API specification used by MyParcel.com. The specification adheres to the [Swagger Specification](https://swagger.io/specification) v2.

[![Swagger Validator](https://img.shields.io/swagger/valid/2.0/https/docs.myparcel.com/api-specification/swagger.json.svg)](https://online.swagger.io/validator/debug?url=https://docs.myparcel.com/api-specification/swagger.json)

## TODO:
- [x] Test Docker setup on Linux.
- [x] Test Docker setup on Mac.
- [x] Test Docker setup on Windows.
- [ ] Actually increment version numbers when building.
- [ ] Implement Swagger Editor.
- [ ] Set contributors guidelines.

## Content
- [Installation](#installation)
- [Validating the Spec](#validating-the-spec)
- [Conventions](#conventions)
- [Contributing](#contributing)

## Installation
The repository provides docker containers to validate and preview the spec before committing changes. This is also used when validating pull requests.

### Installing Docker
To install Docker, follow the steps below for your preferred OS.

#### Mac
Install Docker for Mac from [https://docs.docker.com/docker-for-mac/install](https://docs.docker.com/docker-for-mac/install).

#### Windows
Install Docker for Windows from [https://docs.docker.com/docker-for-windows/install](https://docs.docker.com/docker-for-windows/install).
> **NOTE:** We recommend running the commands in a bash shell like Git Bash.

#### Linux
Install Docker by running the following command:
```bash
curl -sSL https://get.docker.com/ | sh
```

Then install Docker Compose by following the instructions [here](https://github.com/docker/compose/releases).

Finally assign yourself to the Docker group:
```bash
sudo usermod -aG docker $(whoami)
```

### Setting up the environment
For validation to work the Docker containers must be running. To start the containers, run:
```bash
./mp.sh up
```
To stop the containers when you are done working, run:
```bash
./mp.sh down
```

## Validating the spec
To validate the spec you can run the command:
```bash
./mp.sh validate
```

> **NOTE:** The validator only works when the containers are already running. Don't forget to start them.

### Tinkering in Swagger Editor
Coming Soon.

## Conventions
Conventions based on the [Swagger](https://swagger.io/specification) and [JSON Schema](http://json-schema.org) specs but enhanced with MyParcel.com conventions.

### PUT, POST, PATCH
To avoid discussion the use of the above HTTP methods is described below.

#### `PUT`
- Used to create or replace a resource.
- Always returns the same response on repeated requests.
- Needs the full resource for the request (including the id for the to be created or replaced resource).

#### `POST`
- Used to create a resource.
- Does not return the same response on repeated requests.
- Does not need the full resource for the request (often does not need the id for the to be created resource.)

#### `PATCH`
- Used to update an existing resource.
- Does not return the same response on repeated requests.
- Does not need the full resource for the request (you might only want to update a user's name for example).

### API versioning
The API versioning follows semantic versioning. The increment in version number is **not** done manually and should not be part of the pull request.

### Definition file naming
Definition file names follow PascalCasing. Where every first letter of a word (including the first word) is uppercase. For example, the definition for a country code would be found in:
```
specification/definitions/CountryCode.json
```

### Path file naming
The files in `specification/paths` are named to their corresponding API endpoints. Where resources start with an uppercase letter and path variables with a lowercase letter. For example, the definition of the following route: 
```
carriers/{carrier_id}/services
```
can be found in:
```
specification/paths/Carriers-carrier_id-Services.json
```

## Contributing
Coming Soon.

## Licence
All software by MyParcel.com is licenced under the [MyParcel.com general terms and conditions](https://www.myparcel.com/terms). 
