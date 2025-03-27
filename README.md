# Clock IT

Clock IT is a REST API for time tracking. Users can create, read, update, and delete time reports. The API is built using Node.js, Express, MongoDB, and TypeScript. Authentication is implemented with JWT.

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

### Example
- **POST** `/api/auth/register` - Register account

**Request:**
```json
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

### Time reports

| HTTP-method     | Endpoint             | Function                     |
|-----------------|----------------------|------------------------------|
| **GET**         | `/api/reports`       | Fetch all time reports       |
| **GET**         | `/api/reports/:id`   | Fetch a specific time report |
| **POST**        | `/api/reports`       | Create time report           |
| **PUT**         | `/api/reports/:id`   | Update time report           |
| **DELETE**      | `/api/reports/:id`   | Delete time report           |

### Example
- **GET** `/api/reports/` - Fetch all time reports

**Request:**
```json
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

### Example
- **POST** `/api/reports` - Create time report

**Request:**

```json
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

### Example

- **PUT** `/api/reports/:id` - Update time report

**Request:**
```json
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

### Example

- **DELETE** `/api/reports/:id` - Delete time report

**Request:**
```json
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


## Deployment

If you want to test the API locally, write the two commands in the terminal:

```json
npm install
npm run dev
```
Make sure to set up environment variables and use a secure database connection for production.