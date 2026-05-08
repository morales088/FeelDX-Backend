# FeelDX — Backend

REST API for the FeelDX Room Specification Assistant. Built with NestJS and TypeScript. Provides room data, material options, and AI-powered design analysis via a mock engine or OpenRouter.

---

## Technologies

- [NestJS](https://nestjs.com/) — Node.js framework
- TypeScript
- OpenRouter API — AI analysis engine (optional)
- `class-validator` — request validation
- `@nestjs/throttler` — rate limiting
- `helmet` — HTTP security headers

---

## Project Structure

```
src/
├── rooms/          — GET /api/rooms
├── summary/        — POST /api/summary
├── ai/
│   └── engines/    — mock.engine.ts, openrouter.engine.ts
├── materials/      — shared room and material data
└── guards/         — API key authentication
```

---

## Setup

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Configure environment

Create a `.env` file in the `backend/` root:

```env
ALLOWED_ORIGIN=*
API_SECRET_KEY=feeldx-dev-secret-2026
AI_ENGINE=mock
OPENROUTER_API_KEY=your_openrouter_key_here
OPENROUTER_MODEL=openrouter/free
```

- Set `AI_ENGINE=mock` to use the built-in rule-based engine (no API key needed)
- Set `AI_ENGINE=openrouter` to use a real LLM via OpenRouter

---

## Running Locally

```bash
# development (watch mode)
npm run start:dev

# production
npm run start:prod
```

Server runs at `http://localhost:3000` by default.

---

## API Endpoints

All endpoints require the header:
```
x-api-key: <API_SECRET_KEY>
```

### `GET /api/rooms`
Returns all room types with their categories and material options.

**Response**
```json
[
  {
    "id": "kitchen",
    "label": "Kitchen",
    "code": "KT-01",
    "categories": [
      {
        "id": "flooring",
        "label": "Flooring",
        "options": [
          { "id": "timber", "label": "Timber", "color": "#C8905A", "code": "FL-001", "cost": "medium" }
        ]
      }
    ]
  }
]
```

### `POST /api/summary`
Generates an AI analysis for a room and its selections.

**Request body**
```json
{
  "room": "kitchen",
  "selections": {
    "flooring": "timber",
    "wall_finish": "white",
    "lighting": null
  }
}
```

**Response**
```json
{
  "room": "kitchen",
  "costLevel": "Medium",
  "issues": ["..."],
  "missing": ["Lighting"],
  "recommendations": ["..."],
  "nextActions": ["..."]
}
```

---

## Running Tests

```bash
# unit tests
npm run test

# test coverage
npm run test:cov
```

---

## Assumptions

- The mock AI engine applies rule-based logic (dark tones, marble cost, missing lighting) without any external API call.
- The OpenRouter engine constrains the LLM to only report missing items from the room's defined categories.
- Rate limiting is set to 10 requests per minute per IP.

---

## Limitations & Improvements

- Material data is currently hardcoded in `src/materials/materials.data.ts` — a database layer would allow dynamic updates.
- No user authentication beyond the shared API key.
- OpenRouter model can be swapped via `.env` for better accuracy.
