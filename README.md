# Clock IT

Clock IT is a REST API for time tracking. Users can create, read, update, and delete time reports. The API is built using Node.js, Express, MongoDB, and TypeScript. Authentication is implemented with JWT.

## Object modeling

### Time reports

- id
- userId
- date
- hoursWorked
- project
- description

### User

- id
- name
- email
- password

## Resource URIs

### Authentication

| HTTP-method     | Endpoint             | Function                     |
|-----------------|----------------------|------------------------------|
| **POST**        | `/api/auth/register` | Register account             |
| **POST**        | `/api/auth/login`    | Log in and receive JWT token |

### Time reports

| HTTP-method     | Endpoint             | Function                            |
|-----------------|----------------------|-------------------------------------|
| **GET**         | `/api/reports`       | Fetch all reports (log in required) |
| **GET**         | `/api/reports/:id`   | Fetch a specific report             |
| **POST**        | `/api/reports`       | Create report                       |
| **PUT**         | `/api/reports/:id`   | Update report                       |
| **DELETE**      | `/api/reports/:id`   | Delete report                       |

## Resource Representations

### GET `/api/reports`

#### Response example

```json
[ {
    "id": "650ff8c2e4b0a1234c567890",
    "userId": "123456",
    "date": "2025-03-06",
    "hoursWorked": 8,
    "project": "IMDB-clone",
    "description": "Fixed list-cover component" },

{
    "id": "650ff8c2e4b0a1234c567891",
    "userId": "123456",
    "date": "2025-03-05",
    "hoursWorked": 6,
    "project": "Admin Dashboard",
    "description": "Implemented search function"
} ]
```

### POST `/api/reports`

#### Request example

```json
{
    "date": "2025-03-06",
    "hoursWorked": 8,
    "project": "IMDB-clone",
    "description": "Fixed list-cover component"
}
```

#### Response example

```json
{
  "message": "Report created successfully",
  "report": {
    "id": "650ff8c2e4b0a1234c567890",
    "userId": "123456",
    "date": "2025-03-06",
    "hoursWorked": 8,
    "project": "IMDB-clone",
    "description": "Fixed list-cover component"
  }
}
```

## Assign HTTP methods

| HTTP-method | Endpoint           | Function                |
|-------------|--------------------|-------------------------|
| **POST**    | /api/auth/register | Register user           |
| **POST**    | /api/auth/login    | Log in and recieve JWT  |
| **GET**     | /api/reports       | Fetch all reports       |
| **GET**     | /api/reports/:id   | Fetch a specific report |
| **POST**    | /api/reports       | Create report           |
| **PUT**     | /api/reports/:id   | Update report           |
| **DELETE**  | /api/reports/:id   | Delete report           |
