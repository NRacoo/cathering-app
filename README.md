# Catering App

A modern catering web application built with Next.js, Firebase, and NextAuth.  
Includes an admin dashboard (login: `hello@seacatering.com`, password: `admin123`).

---

## Features

- User registration and login (with email & password)
- Admin dashboard
- Admin can delete menus that have been created
- Protected routes
- Firebase Firestore integration
- Responsive UI with Tailwind CSS
- State management for authentication
- Error handling and validation

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cathering-app.git
cd cathering-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password) and **Firestore Database**.
3. Copy your Firebase config and set the following environment variables in a `.env.local` file at the root of your project:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
NEXTAUTH_SECRET=your-random-secret
```

> For more details, see [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Creating the Admin User

To create the admin dashboard user:

1. Go to [http://localhost:3000/Auth/Register](http://localhost:3000/Auth/Register)
2. Register with:
   - **Email:** `hello@seacatering.com`
   - **Password:** `admin123`
   - **Fullname:** (any name, e.g., "Admin")
3. After registration, you can log in at [http://localhost:3000/Auth/Login](http://localhost:3000/Auth/Login) with these credentials.

> **Note:**  
> By default, new users are assigned the `member` role.  
> To make this user an admin, you must manually update their `role` field in Firestore to `admin` using the Firebase Console.

---

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm start` — Start the production server
- `npm run lint` — Run ESLint

---

## Project Structure

```
src/
  app/                # Next.js app directory
    Auth/             # Login & Register pages
    dashboard/        # Admin dashboard
    api/              # API routes (Next.js)
  components/         # UI components
  lib/firebase/       # Firebase config & service functions
  types/              # TypeScript types
```

---

## Dependencies

- Next.js
- React
- Firebase
- NextAuth
- Tailwind CSS
- bcrypt
- Radix UI
- and more (see `package.json`)

---

## Firestore Security Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## License

MIT
