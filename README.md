# Isuru Sampath — Developer Portfolio

A modern full-stack developer portfolio built with the **MERN stack** to showcase my projects, technical skills, education, experience, and contact information.

The application includes a public portfolio website and a secure admin dashboard that allows portfolio content to be managed dynamically without modifying the source code.

## Live Demo

**Portfolio:**  
https://portfolio-ashen-seven-49.vercel.app/

## Features

### Public Portfolio

- Modern responsive user interface
- Hero and About sections
- Technical skills grouped by category
- Project showcase with category filtering
- GitHub and live project links
- Education section
- Experience section
- Contact form
- Social media links
- Downloadable CV support
- Responsive mobile navigation
- Smooth animations with Framer Motion
- SEO and social sharing metadata
- Lazy loading and code splitting
- Optimized production build

### Admin Dashboard

- Secure admin authentication
- Protected admin routes
- Dashboard overview
- Create, edit, and delete projects
- Create, edit, and delete skills
- Manage education records
- Manage experience records
- View and manage contact messages
- Update portfolio settings
- Upload and manage images
- Manage profile information and social links

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- React Icons
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Multer
- Cloudinary

### Security & Performance

- JWT-based admin authentication
- Password hashing with bcrypt
- Protected API routes
- Helmet security headers
- CORS configuration
- API rate limiting
- Login rate limiting
- Upload rate limiting
- File type and file size validation
- Production-safe error handling
- Response compression
- Frontend lazy loading
- Vendor code splitting

### Deployment

- **Frontend:** Vercel
- **Database:** MongoDB Atlas
- **Media Storage:** Cloudinary
- **Backend:** Node.js production API

## Project Structure

```text
portfolio/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/IsuruSampathRanasinghe/portfolio.git
cd portfolio
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside the `backend` directory.

```env
NODE_ENV=development
PORT=5000

MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173

JWT_SECRET=your_jwt_secret

ADMIN_NAME=your_admin_name
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit your real `.env` file or credentials to GitHub.

### 4. Start the backend

```bash
npm run dev
```

The backend runs by default at:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Configure frontend environment variables

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_URL=http://localhost:5000/api
```

### 7. Start the frontend

```bash
npm run dev
```

Then open the local URL displayed by Vite.

## Production Build

To create the optimized frontend production build:

```bash
cd frontend
npm run build
```

To preview it locally:

```bash
npm run preview
```

## Environment Variables

Sensitive credentials are stored using environment variables and are excluded from Git using `.gitignore`.

Do not commit:

- MongoDB connection strings
- JWT secrets
- Admin passwords
- Cloudinary API secrets
- Other private credentials

Use `.env.example` files to document the required environment variables without exposing real values.

## API Overview

The backend provides REST API endpoints for:

```text
/api/auth
/api/projects
/api/skills
/api/education
/api/experience
/api/contact
/api/settings
/api/dashboard
/api/upload
/api/health
```

Public endpoints provide portfolio content, while administrative operations are protected using authentication middleware.

## Future Improvements

- Move admin authentication to secure HttpOnly cookies
- Add automated testing
- Add project search and advanced filtering
- Add analytics
- Improve image optimization
- Add additional accessibility testing
- Add CI/CD checks

## Author

**Isuru Sampath**

Computer Science Undergraduate | Full-Stack Developer

GitHub:  
https://github.com/IsuruSampathRanasinghe

LinkedIn:  
https://www.linkedin.com/in/isuru-sampath-6325462a9

Portfolio:  
https://portfolio-ashen-seven-49.vercel.app/

## License

This project is intended for personal portfolio and educational purposes.