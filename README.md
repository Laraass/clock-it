# Clock IT

Clock IT is a REST API for time tracking. Users can create, read, update, and delete time reports. The API is built using Node.js, Express, MongoDB, and TypeScript. Authentication is implemented with JWT.

**Visit the deployed page**:

- [Clock IT](https://clock-it-pd7b.onrender.com/)

**Table of Contents**:

1. [Object Modeling](#object-modeling)
2. [Resource URIs](#resource-uris)
3. [Resource Representations](#resource-representations)
4. [Endpoints with cURL examples](#endpoints-with-curl-examples)
5. [Error Handling](#error-handling)
6. [Assign HTTP Methods](#assign-http-methods)
7. [Deployment](#deployment)

## Object modeling

### Time reports

- `id` - Unique identifier
- `userId` - ID of the user who created the time report
- `date` - Date of time entry
- `hoursWorked` - Number of hours worked
- `project` - Name of project
- `description` - Description of the work

### User

- `id` - Unique identifier
- `name` - User's name
- `email` - User's email
- `password` - Hashed password

## Resource URIs

### Middleware Implementation

A middleware function is used to protect routes and ensure that only authenticated users can create, update, or delete time reports.

### Authentication

| HTTP-method     | Endpoint              | Function                     |
|-----------------|-----------------------|------------------------------|
| **POST**        | `/api/users/register` | Register account             |
| **POST**        | `/api/users/login`    | Log in and receive JWT token |

### Time reports

| HTTP-method     | Endpoint             | Function                     |
|-----------------|----------------------|------------------------------|
| **GET**         | `/api/reports`       | Fetch all time reports       |
| **GET**         | `/api/reports/:id`   | Fetch a specific time report |
| **POST**        | `/api/reports`       | Create time report           |
| **PUT**         | `/api/reports/:id`   | Update time report           |
| **DELETE**      | `/api/reports/:id`   | Delete time report           |

## Resource Representations

### User

```json
{
  "id": "123456",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Time report

```json
{
  "id": "650ff8c2e4b0a1234c567890",
  "userId": "123456",
  "date": "2025-03-06",
  "hoursWorked": 8,
  "project": "IMDB-clone",
  "description": "Fixed list-cover component"
}
```

## Assign HTTP methods

| HTTP-method | Endpoint            | Function                |
|-------------|---------------------|-------------------------|
| **POST**    | /api/users/register | Register account        |
| **POST**    | /api/users/login    | Log in and recieve JWT  |
| **GET**     | /api/reports        | Fetch all reports       |
| **GET**     | /api/reports/:id    | Fetch a specific report |
| **POST**    | /api/reports        | Create report           |
| **PUT**     | /api/reports/:id    | Update report           |
| **DELETE**  | /api/reports/:id    | Delete report           |

## Endpoints with cURL examples

### GET `/api/reports` - Fetch all time reports

**Request:**

```sh
curl -X GET http://localhost:3000/api/reports \
-H "Authorization: secret_key"
```

**Response:**

```json
[
  {
    "_id":"67daf04be714ed478c9d5c1d",
    "userId":"67d46d680d31c2171523a61e",
    "date":"2025-03-19T00:00:00.000Z",
    "hoursWorked":8,
    "project":"Project Chas Challenge",
    "description":"Worked on UX design",
    "createdAt":"2025-03-19T16:26:51.055Z",
    "updatedAt":"2025-03-19T16:26:51.055Z"
  },
  {
    "_id":"67daf0cf4b57351b2eb215c6",
    "userId":"67d46d680d31c2171523a61e",
    "date":"2025-03-19T00:00:00.000Z",
    "hoursWorked":8,
    "project":"Project Chas Challenge",
    "description":"Worked on UX design",
    "createdAt":"2025-03-19T16:29:03.112Z",
    "updatedAt":"2025-03-19T16:29:03.112Z"
  }
]
```

### POST `/api/users/register` - Register account

**Request:**

```sh
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
      "name":"Jane Doe",
      "email":"jane@example.com",
      "password":"password123"
    }'
```

**Response:**

```json
{
  "message": "User registered!"
}
```

### POST `/api/reports` - Create time report

**Request:**

```sh
curl -X POST http://localhost:3000/api/reports \
-H "Content-Type: application/json" \
-H "Authorization: Bearer_token" \
-d '{
      "date": "2025-03-19",
      "hoursWorked": 8,
      "project": "Project Chas Challenge"
    }'
```

**Response:**

```json
{
  "userId": "67daeff5e714ed478c9d5c1a",
  "date": "2025-03-19T00:00:00.000Z",
  "hoursWorked": 8,
  "project": "Project Chas Challenge",
  "description": "Worked on UX design",
  "_id": "67e54f1035d8cad14abba602",
  "createdAt": "2025-03-27T13:13:52.694Z",
  "updatedAt": "2025-03-27T13:13:52.694Z"
}
```

### PUT `/api/reports/:id` - Update time report

**Request:**

```sh
curl -X PUT "http://localhost:3000/api/reports/67e5bccee63c5ec34903eb72" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer_token" \
-d '{ 
      "hoursWorked": 10,
      "project": "Project Clock IT",
      "description": "Updated UX design work"
    }'
```

**Response:**

```json
{
  "_id":"67e5bccee63c5ec34903eb72",
  "userId":"67daeff5e714ed478c9d5c1a",
  "date":"2025-03-19T00:00:00.000Z",
  "hoursWorked":10,
  "project":"Project Clock IT",
  "description":"Updated UX design work", 
  "createdAt":"2025-03-27T21:02:06.587Z", 
  "updatedAt":"2025-03-27T21:44:34.115Z"
}
```

### DELETE `/api/reports/:id` - Delete time report

**Request:**

```sh
curl -X DELETE "http://localhost:3000/api/reports/67e5bccee63c5ec34903eb72" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer_token"
```

**Response:**

```json
{
  "message":"Time report deleted"
}
```

## Error handling

| Status Code | Cause                                   |
|-------------|-----------------------------------------|
| 400         | Required fields missing                 |
| 404         | Trying to access something non-existent |
| 500         | Server error                            |

## Deployment

If you want to test the API locally, follow these steps:

1. Clone the repository.
2. Install dependencies: ``npm install``
3. Run the project: ``npm run dev``

For production, make sure to set up environment variables and use a secure database connection.
