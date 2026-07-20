# URL Shortener API 

A lightweight, highly performant URL shortener microservice built with **Fastify**, **TypeScript**, and **Neon (PostgreSQL)**.

---

##  Tech Stack

- **Runtime/Framework:** Node.js, Fastify
- **Language:** TypeScript
- **Database:** Neon Serverless PostgreSQL
- **Security & Optimization:** Rate limiting (`@fastify/rate-limit`)
- **Environment Management:** `dotenv`

---

##  Project Structure

```
URL-SHORTENER/
├── src/
│   ├── controllers/        # Request handlers & HTTP logic
│   │   ├── redirect.ts     # Redirect controller
│   │   └── shorten.ts      # URL creation controller
│   ├── database/           # Database connection & schema definitions
│   │   └── neon.ts         # Neon Postgres client config
│   ├── lib/                # Helper utilities & validation
│   │   └── validate.ts     # URL & input validators
│   ├── plugins/            # Fastify custom plugins
│   │   └── ratelimit.ts    # Rate-limiting setup
│   ├── routes/             # Fastify route definitions
│   │   ├── redirect.ts     # GET /:shortCode route
│   │   └── shorten.ts      # POST /shorten route
│   ├── services/           # Core business logic & database queries
│   │   └── url.ts          # URL shortening logic
│   └── server.ts           # Application entry point
├── .env                     # Environment variables
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies & scripts
```

---

##  Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm
- Neon PostgreSQL account & database URI

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/M1chael-01/url-shortener
   cd url-shortener
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL=your_neon_postgres_connection_string
   PORT=3000
   ```

4. **Run the development server**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000` (or the port defined in `.env`).

---

##  API Endpoints

### 1. Create Short URL

Creates a new shortened URL from a long/original URL.

- **HTTP Method:** `POST`
- **Endpoint:** `/shorten`
- **Content-Type:** `application/json`

**Request Body:**

```json
{
  "url": "https://example.com/very-long-url-path"
}
```

**Response:** `201 Created`

```json
{
  "shortCode": "4ntvvn",
  "shortUrl": "http://localhost:3000/4ntvvn",
  "originalUrl": "https://www.example.com"
}
```

---

### 2. Redirect to Original URL

Redirects the client to the original URL associated with the given short code.

- **HTTP Method:** `GET`
- **Endpoint:** `/:shortCode`

**Example:**

```
GET http://localhost:3000/4ntvvn
```

**Response:** `302 Found` — redirects to the original URL.

---

##  Rate Limiting

This API uses `@fastify/rate-limit` to protect endpoints from abuse and excessive requests. Limits and time windows can be configured in `src/plugins/ratelimit.ts`.

---

##  Database

The project uses **Neon Serverless PostgreSQL**. Connection configuration lives in `src/database/neon.ts`.

---

##  License

This project is open source and available under the [MIT License](LICENSE).

---

##  Author

**M1chael-01**
[GitHub Repository](https://github.com/M1chael-01/url-shortener)
