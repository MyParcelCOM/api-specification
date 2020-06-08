# MyParcel.com API specification

[![Packagist](https://img.shields.io/packagist/v/myparcelcom/api-specification.svg)](https://packagist.org/packages/myparcelcom/api-specification)
[![OpenAPI Specification](https://img.shields.io/badge/OpenAPI-3.0-brightgreen.svg)](https://github.com/OAI/OpenAPI-Specification)

Description of the API specification used by MyParcel.com located at [https://docs.myparcel.com/api-specification](https://docs.myparcel.com/api-specification). This specification adheres to the [OpenApi 3.0 specification](https://github.com/OAI/OpenAPI-Specification) and implements the [JSON API specification](https://jsonapi.org).

## Content
- [Installation](#installation)
- [Commands](#commands)
- [Conventions](#conventions)
- [License](#license)

## Installation
The repository provides Docker containers to validate and preview the spec before committing changes. This is also used when validating pull requests. To install Docker, follow the steps in the [documentation](https://docs.myparcel.com/github/#docker).

To setup the project for development run:

```bash
./mp.sh setup
```

## Commands

`./mp.sh up` - Start the containers which will start a server to watch file changes and reload automatically.

`./mp.sh down` - Stop the containers.

`./mp.sh validate` - Validate the specification.

> **NOTE:** The validator only works when the containers are already running. Don't forget to start them.

## Conventions
Conventions based on the [Swagger](https://swagger.io/specification) and [JSON Schema](https://json-schema.org) specs.

Our internal conventions are described below.

### PUT, POST, PATCH
To avoid discussion, the use of the above HTTP methods is described below.

#### `PUT`
- Used to create or replace a resource.
- Always returns the same response on repeated requests.
- Needs the full resource for the request (including the id for the to be created or replaced resource).

#### `POST`
- Used to create a resource.
- Does not return the same response on repeated requests.
- Does not need the full resource for the request (often does not need the id for the to be created resource).

#### `PATCH`
- Used to update an existing resource.
- Does not return the same response on repeated requests.
- Does not need the full resource for the request (you might only want to update a user's name for example).

### API versioning
The API versioning follows semantic versioning. The increment in version number is done manually and should be part of the pull request.

### Schema file naming
Definition file names follow PascalCasing. Where every first letter of a word (including the first word) is uppercase. For example, the definition for a country code would be found in:

```
specification/schemas/CountryCode.json
```

### Path file naming
The files in `specification/paths` are named after their corresponding API endpoints. Where resources start with an uppercase letter and path variables with a lowercase letter. For example, the definition of the following route:
 
```
carriers/{carrier_id}/services
```

can be found in:

```
specification/paths/Carriers-carrier_id-Services.json
```

### Parameter file naming
Parameter file names are prefixed with the corresponding parameter type. A path parameter for `carrier_id` would get the following file path:

```
specification/parameters/path-carrier_id.json
```

Unique parameters can just remain in the path file and do not need to be extracted to their own files.

## License
All software by MyParcel.com is licensed under the [MyParcel.com general terms and conditions](https://www.myparcel.com/terms). 
