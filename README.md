# Travel-Tips-And-Destination-Guides

## Important Links

1. **Live Deployment Link :**

- [Live Server]([https://car-washing-system-client-gilt.vercel.app](https://travel-tips-and-destination-guides-client.vercel.app/))

2. **GitHub Repository Link :**

- [Client](https://github.com/mkmasudrana806/Travel-Tips-AndDestination-Guides-Client)

- [Server](https://github.com/mkmasudrana806/Travel-Tips-And-Destination-Guides-Backend)

## Introduction

Welcome to Travel Tips & Destination Guides, your ultimate companion for planning unforgettable journeys and discovering hidden gems around the world. Our platform is designed to inspire, inform, and assist travelers in creating personalized travel experiences.

## Project Description

Travel Tips & Destination Guides is a comprehensive web application that combines expert travel advice, user-generated content, and cutting-edge technology to provide a one-stop solution for all your travel needs. Whether you're a seasoned globetrotter or a first-time adventurer, our platform offers valuable insights, practical tips, and immersive guides to enhance your travel experience.

## Features

- **User Dashboard**: Personalized dashboard for managing trips, profile, and user preferences.
- **Admin Dashboard**: Well and comprehensive dashboard with insights and manageable all task seamlessly
- **Custom Authentication**: Custom authentication with login, register, change and forgot password, Reset password link
- **Customizable Profiles**: Create and customize your traveler profile.
- **Travel Posts**: Post you travel story using vast editor.
- **Responsive Design**: Enjoy a seamless experience across desktop, tablet, and mobile devices.

## Technology Stack

Our project leverages a modern and robust technology stack to deliver a high-performance, scalable, and user-friendly application:

- **Frontend**:
  - Next.js (React framework)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Database)

- **Authentication**:
  - Custom auth implementation

- **Deployment and Hosting**:
  - Vercel (both frontend and backend)
  - MongoDB Atlas (Database hosting)

- **Version Control**:
  - Git
  - GitHub

- **Other Tools**:
  - ESLint (Code linting)
  - Prettier (Code formatting)
    
## Prerequisites

- Ensure `nodejs` and `typescript` installed on your machine before

## Installation Guideline

`Note:` first install the backend project provided top of this readme file

To get the project up and running locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/mkmasudrana806/Car-Washing-System-Client.git
cd Car-Washing-System-Client
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Build the project:**

```bash
npm run build
```

4. **Start the development server:**

```bash
npm run dev
```

## Usages Guidline

- keep in mind that after cloning the project,
  must replace `baseUrl` with the `https://localhost:5000/api` inside `baseApi.ts` file

```json
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:5000/api',
});
```

