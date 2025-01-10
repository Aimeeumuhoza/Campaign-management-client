
# Campaign Management App - Frontend

This is the frontend part of the Campaign Management App, built using **React**, **Vite**, and **Tailwind CSS**. It interacts with a **NestJS** backend and displays influencer campaigns where users can submit applications, approve or reject submissions, and view campaign details.

The frontend is served on **http://localhost:5173**.

## Prerequisites

Before running the app, make sure you have the following installed:

- **Node.js** (v18 or later)
- **Git** (for cloning the repository)

## Project Setup

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/Aimeeumuhoza/Campaign-management-client.git
cd Campaign-management-client
```

### 2. Install Dependencies

Navigate to the `frontend` folder and install the necessary dependencies:

```bash
cd Campaign-management-client
npm install
```

This will install all the required dependencies specified in the `package.json` file.

### 3. Run the Development Server

To start the development server, use the following command:

```bash
npm run dev
```

This will start the frontend app, and you can access it in your browser at:

```
http://localhost:5173
```

### 4. Environment Configuration

- **Authentication**: The frontend uses JWT tokens for authentication. Upon logging in, the JWT token is stored in the `localStorage` of the browser for subsequent API requests.
- Ensure the backend server is running on **http://localhost:3000** for API calls to work correctly.

## Features

- **Campaign Dashboard**: View all campaigns that are available to influencers and manage submissions.
- **Submission Management**: Approve or reject influencer submissions for each campaign.
- **Dynamic Tabs**: Display different tabs for each campaign, showing which influencers have submitted their applications and their status.

## API Integration

The frontend makes API calls to the backend to fetch campaign data and influencer submissions.

### Key Endpoints

- `GET /campaigns/all` – Get all campaigns.
- `GET /campaigns/influencers/status/{campaignId}` – Get all influencer submissions for a specific campaign.
- `PATCH /campaigns/submission/{campaignId}` – Approve or reject an influencer submission.

## Development Scripts

- **Start Development Server**:  
  Start the local development server and open the app in your browser:
  ```bash
  npm run dev
  ```

- **Build the Frontend**:  
  Build the production version of the frontend for deployment:
  ```bash
  npm run build
  ```