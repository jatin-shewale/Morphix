# Morphix - Logo Processing and Email Delivery

Upload a PNG or JPG logo, generate three computer-vision outputs, and email them automatically.

## What It Does

- Accepts one image upload up to 5 MB
- Generates `silhouette`, `border`, and `grayscale` PNG outputs
- Sends all three outputs as email attachments after processing
- Lets the frontend download the generated files directly from the backend

## Tech Stack

### Backend

- Python
- FastAPI
- OpenCV
- Pillow
- NumPy
- SMTP via `smtplib`

### Frontend

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Icons

## Project Structure

```text
Morphix/
|-- Backend/
|   |-- app/
|   |   |-- api/
|   |   |   `-- routes/
|   |   |-- core/
|   |   |-- schemas/
|   |   |-- services/
|   |   `-- utils/
|   |-- .env.example
|   |-- main.py
|   `-- requirements.txt
|-- Frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- config/
|   |   `-- pages/
|   |-- package.json
|   `-- vite.config.js
`-- README.md
```

## Backend Design

The backend is now fully modular instead of keeping all logic in one file:

- `app/api/routes/` holds route handlers
- `app/services/image_service.py` handles CV transformations
- `app/services/email_service.py` handles SMTP delivery
- `app/services/storage_service.py` manages request-scoped output storage
- `app/utils/validators.py` handles upload and email validation
- `app/core/config.py` centralizes environment-driven settings
- `app/schemas/responses.py` defines API response models

This keeps routing, processing, storage, validation, and email logic separated and easier to extend.

## Setup

### 1. Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload --port 8000
```

Backend URL: `http://localhost:8000`

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

The Vite dev server proxies `/process` and `/download` requests to the backend automatically.

## Environment Variables

Create `Backend/.env` from `Backend/.env.example`.

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP server port |
| `SMTP_USER` | Sender email address |
| `SMTP_PASSWORD` | App password or SMTP password |
| `RECIPIENT_EMAIL` | Optional fallback recipient if frontend does not send one |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |

## API

### `POST /process`

Accepts multipart form data:

- `image`: required PNG or JPG file
- `recipient_email`: optional email, overrides `RECIPIENT_EMAIL`

Example response:

```json
{
  "job_id": "abc123",
  "silhouette": "generated",
  "border": "generated",
  "grayscale": "generated",
  "email_status": "sent",
  "recipient_email": "you@example.com",
  "downloads": {
    "silhouette": "/download/abc123/silhouette",
    "border": "/download/abc123/border",
    "grayscale": "/download/abc123/grayscale"
  }
}
```

### `GET /download/{job_id}/{output}`

Downloads the request-specific generated PNG.

Allowed `output` values:

- `silhouette`
- `border`
- `grayscale`

### `GET /download/{output}`

Downloads the latest generated file for backward compatibility.

## CV Pipeline

### Silhouette

- Uses the alpha channel when present
- Falls back to luminance thresholding for RGB images
- Applies morphological closing to fill gaps
- Outputs a solid black shape on white background

### Border

- Converts to grayscale
- Applies Gaussian blur
- Runs Canny edge detection
- Outputs black edges on white background

### Grayscale

- Uses Pillow `convert("L")`
- Preserves transparency when the source has alpha

## Error Handling

- `400` for unsupported file types, empty uploads, or invalid recipient email
- `413` for files larger than 5 MB
- `422` for image decode failures
- `500` for processing failures
- Email failures are non-fatal and return `200` with `email_status: "failed: ..."`

## Verification

Verified locally with:

- Backend route import and route registration check
- Backend smoke test using FastAPI `TestClient` and a generated PNG upload
- Frontend production build via `npm run build`
