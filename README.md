# MyParcel.com API specification
This repository describes the API specification used by MyParcel.com. The specification adheres to the [Swagger Specification](https://swagger.io/specification/) v2.

## TODO:
- [x] Test Docker setup on Linux.
- [ ] Test Docker setup on Windows.
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
- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://docs.docker.com/docker-for-windows/install/)
- Linux:
```
curl -sSL https://get.docker.com/ | sh
curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### Setting up the environment
Variables defined in `.env` are used when running the Docker containers. An example can be found in `docker/.env.dist`. You can copy this file to the root of the project and adjust the variables to your liking.

For validation to work the Docker containers must be running. To start the containers, run:
```
./mp.sh up
```
To stop the containers when you are done working, run:
```
./mp.sh down
```

## Validating the spec
To validate the spec you can run the command:
```
./mp.sh validate
```

### Tinkering in Swagger Editor
Coming Soon.

## Conventions
Conventions based on the [Swagger](https://swagger.io/specification/) and [JSON Schema](http://json-schema.org/) specs but enhanced with MyParcel.com conventions.

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
All software by MyParcel.com is licenced under the [MyParcel.com general terms and conditions](https://www.myparcel.com/terms/). 