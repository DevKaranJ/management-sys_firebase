# User Management System with Firebase

A backend application built with TypeScript, Firebase Functions, Firebase Authentication, and Firebase Firestore that provides APIs for user management and note-taking functionality.

## 🏗 Database Structure

### Users Collection
```
users/
  ├── {uid}/
  │   ├── email: string
  │   ├── name: string
  │   ├── createdAt: timestamp
  │   └── updatedAt: timestamp
```

### Notes Collection
```
notes/
  ├── {noteId}/
  │   ├── userId: string (references user.uid)
  │   ├── title: string
  │   ├── content: string
  │   ├── createdAt: timestamp
  │   └── updatedAt: timestamp
```

## 🚀 API Endpoints

### User Management

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
}
```

#### Update User
```http
PUT /api/users/update
Authorization: Bearer {idToken}
Content-Type: application/json

{
    "name": "Updated Name"
}
```

#### Delete User
```http
DELETE /api/users/delete
Authorization: Bearer {idToken}
```

### Notes Management

#### Create Note
```http
POST /api/notes
Authorization: Bearer {idToken}
Content-Type: application/json

{
    "title": "Note Title",
    "content": "Note Content"
}
```

#### Get User's Notes
```http
GET /api/notes
Authorization: Bearer {idToken}
```

## 🛠 Setup & Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies
```bash
cd functions
npm install
```

3. Set up Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init
```

4. Configure Firebase project
- Create a new project in Firebase Console
- Enable Authentication (Email/Password)
- Enable Firestore
- Update `.firebaserc` with your project ID

5. Local Development
```bash
npm run build
firebase emulators:start
```

## 🧪 Testing

### Using Postman

1. Import the Postman collection from the `postman` directory
2. Set up environment variables:
   - `baseUrl`: Your Firebase Functions URL
   - `authToken`: ID token from Firebase Authentication

### Getting Authentication Token

1. Register a user using the registration endpoint
2. Use Firebase Authentication to sign in and get ID token
3. Use the ID token in the `Authorization` header for authenticated endpoints:
   ```
   Authorization: Bearer <your-id-token>
   ```

## 📦 Deployment

1. Build the project
```bash
cd functions
npm run build
```

2. Deploy to Firebase
```bash
firebase deploy --only functions
```

Your APIs will be available at:
```
https://{region}-{project-id}.cloudfunctions.net/api
```

## ⚡ Environment Variables

Configure the following environment variables in Firebase:

```bash
firebase functions:config:set 
  someconfig.key="value"
```

## 🔒 Security Rules

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /notes/{noteId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## 🚨 Error Handling

The API returns standardized error responses:
```json
{
    "success": false,
    "error": "Error message"
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 500: Internal Server Error

## 📝 Input Validation

Input validation is implemented using Zod schemas:
- User registration/update requires: email, password, name
- Notes require: title, content

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details
