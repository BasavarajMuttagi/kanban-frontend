# Kanban

This project is a web application for Kanban board.

## Features

### User Authentication

- **Signup/Login:** Users can create an account or log in with existing credentials to access the platform also can proceed without password using Google Signin and SignUp.

### Home Page

- **List Boards:** All boards created by user are listed.
- **Create Boards:** User can create new board.

### Board

- **Create Task:** User can create new tasks.
- **Delete Task:** User can delete tasks.
- **Update Task:** User can update tasks.
- **View Task:** User can view tasks.
- **Move Task:** User can move tasks between columns and change the order.

## Technologies Used

- **Frontend:** React using Typescript, Tailwind, Zod, Zustand, hookform, react-hot-toast, axios,moment
- **Backend:** Node.js, Express.js using Typescript, Zod, Mongo DB, google-auth-library, jsonwebtoken.
- **Database:** MongoDB
- **Deployment:** Project deployed on Vercel

## How to Run

1. Clone this repository using `git clone [repository_url]`
2. Install dependencies using `npm install`.
3. Run the server using `npm run dev`.

## Environment Variables for backend

To run this project, you will need to add the following environment variables to your .env file

`PORT=`
`DATABASE_URL=""`
`SECRET_SALT=""`
`GOOGLE_CLIENT_ID=""`
`GOOGLE_CLIENT_SECRET=""`
`APP_BASE_URL=""`
`SERVER_BASE_URL=""`

## Environment Variables for frontend

To run this project, you will need to add the following environment variables to your .env file

`VITE_BASE_URL=""`

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
