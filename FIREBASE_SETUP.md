# Firebase Setup dan Penggunaan

## Overview
Aplikasi ini menggunakan Firebase untuk autentikasi dan penyimpanan data. Firebase menyediakan:
- **Authentication**: Login/Register dengan email dan password
- **Firestore**: Database untuk menyimpan data user

## Fitur yang Sudah Diimplementasi

### 1. Registrasi User
- Form registrasi dengan validasi
- Password confirmation
- Penyimpanan data user ke Firestore
- Redirect ke halaman login setelah berhasil

### 2. Login User
- Form login dengan validasi
- Error handling untuk kredensial salah
- Redirect ke home page setelah berhasil

### 3. Logout
- Fungsi logout yang membersihkan session
- Redirect ke home page

### 4. State Management
- Hook `useAuth` untuk mengelola state autentikasi
- Auto-detect user login status
- Loading state

### 5. Navigation
- Dynamic navigation berdasarkan status login
- Tampilan nama user yang sedang login
- Tombol logout untuk user yang sudah login

## Struktur File

```
src/
├── lib/firebase/
│   ├── init.ts          # Firebase configuration
│   └── service.ts       # Firebase functions (Register, Login, Logout)
├── components/
│   ├── hooks/
│   │   └── use-auth.ts  # Custom hook untuk auth state
│   └── section/
│       └── Navigation.tsx # Navigation dengan auth status
├── app/
│   ├── Auth/
│   │   ├── Login/
│   │   │   └── page.tsx
│   │   └── Register/
│   │       └── page.tsx
│   ├── Profile/
│   │   └── page.tsx
│   └── Middleware.ts    # Route protection
```

## Cara Penggunaan

### 1. Registrasi
1. Buka halaman `/Auth/Register`
2. Isi form dengan data yang valid
3. Password minimal 6 karakter
4. Konfirmasi password harus sama
5. Klik "Daftar"
6. Setelah berhasil, akan diarahkan ke halaman login

### 2. Login
1. Buka halaman `/Auth/Login`
2. Masukkan email dan password yang sudah didaftarkan
3. Klik "Login"
4. Setelah berhasil, akan diarahkan ke home page

### 3. Logout
1. Klik tombol "Logout" di navigation bar
2. Session akan dibersihkan
3. Diarahkan kembali ke home page

## Firebase Configuration

Pastikan file `src/lib/firebase/init.ts` sudah berisi konfigurasi Firebase yang benar:

```typescript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## Security Rules

Pastikan Firestore security rules sudah dikonfigurasi dengan benar:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Error Handling

Aplikasi sudah menangani berbagai error:
- Email sudah terdaftar
- Password salah
- Email tidak valid
- Password terlalu pendek
- Password tidak cocok

## Dependencies

Pastikan package berikut sudah terinstall:
```json
{
  "firebase": "^11.9.1"
}
```

## Testing

Untuk testing:
1. Jalankan `npm run dev`
2. Buka browser ke `http://localhost:3000`
3. Test registrasi user baru
4. Test login dengan user yang sudah dibuat
5. Test logout
6. Test navigation yang berubah sesuai status login 