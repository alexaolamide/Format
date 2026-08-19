# Doerforge by Alex Studio

Doerforge is a practical AI toolkit by Alex Studio for people who want to work, learn, create, and run a business more efficiently. It brings multiple focused tools into one account instead of making users manage a separate app for every task.

## Product Categories

### Career

- AI resume builder
- Cover letter writer
- ATS score checker

### Business

- Business plan builder
- Invoice maker

### Creator

- Social caption studio
- Content calendar

### Productivity

- Email writer
- Meeting notes

### Education

- Study planner
- Quiz maker

The career tools are currently available. The remaining tools are listed in the product catalog and are being released incrementally.

## Features

- Email and Google authentication through NextAuth.js
- AI generation and optimization through OpenRouter
- Resume and cover-letter history stored in MongoDB
- ATS scoring and improvement suggestions
- Telegram account linking
- Telegram Stars payments using Telegram's `XTR` currency
- Responsive Next.js dashboard with categorized tools

## Technology

| Area | Technology |
| --- | --- |
| Frontend and API | Next.js 14, React, TypeScript |
| Styling | Tailwind CSS |
| Database | MongoDB Atlas |
| Authentication | NextAuth.js |
| AI | OpenRouter |
| Payments | Telegram Bot API and Telegram Stars |
| Email | Resend |
| Hosting | Render |

## Getting Started

### Requirements

- Node.js 18-22
- MongoDB database
- OpenRouter API key
- Telegram bot created with [BotFather](https://t.me/BotFather)
- Resend account for verification and password-reset emails

### Install

```bash
npm install
# Create .env.local and add the variables listed below.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doerforge
OPENROUTER_API_KEY=sk-or-your-key

NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_BOT_USERNAME=your-telegram-bot-username
TELEGRAM_WEBHOOK_SECRET=your-webhook-secret

RESEND_API_KEY=re_your-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Never commit `.env.local` or expose server-side secrets in client components.

## Telegram Stars Payments

Doerforge does not use Stripe. Paid tool unlocks are sent to a user's linked Telegram chat as Telegram Stars invoices.

1. Create a bot with BotFather and copy the bot token.
2. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_WEBHOOK_SECRET` in the deployment environment.
3. Deploy the application with a public HTTPS URL.
4. Register the webhook:

```bash
curl -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://your-domain.com/api/telegram/webhook","secret_token":"your-webhook-secret"}'
```

5. Users link Telegram from dashboard settings.
6. When a user buys a tool, Doerforge calls `/api/telegram/invoice` and sends an invoice with currency `XTR`.
7. Telegram calls `/api/telegram/webhook` for pre-checkout validation and successful payments.

For Telegram Stars invoices, do not configure a Stripe provider token. The payment payload is recorded against the user after Telegram confirms payment.

## API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register an account |
| POST | `/api/resume/create` | Create a resume |
| GET | `/api/resume/list` | List resumes |
| GET/PUT/DELETE | `/api/resume/[id]` | Read, update, or delete a resume |
| POST | `/api/resume/optimize` | Optimize a resume for a job description |
| POST | `/api/resume/ats-check` | Calculate ATS feedback |
| POST | `/api/cover-letter/create` | Generate a cover letter |
| GET | `/api/cover-letter/list` | List cover letters |
| POST | `/api/telegram/verify` | Link a Telegram account |
| GET | `/api/telegram/verify` | Read Telegram and plan status |
| POST | `/api/telegram/invoice` | Send a Telegram Stars invoice |
| POST | `/api/telegram/webhook` | Process Telegram payment events |

## Database Collections

### Users

Stores account identity, plan, remaining credits, linked `telegramId`, and purchased tool IDs.

### Resumes

Stores personal information, experience, education, skills, ATS score, template, and timestamps.

### Cover Letters

Stores the linked resume, job details, tone, generated content, and timestamp.

### Usage

Tracks monthly usage for resume optimization, cover letters, and ATS checks.

## Validation

Run the TypeScript check before opening a pull request:

```bash
npx tsc --noEmit
```

Run the production build with all required environment variables configured:

```bash
npm run build
npm start
```

## Deployment

### Render

The repository includes `render.yaml`. Connect the repository as a Render Blueprint, add the required secret values, and deploy the web service. The service uses `/api/health` as its health check.

## Roadmap

1. Release the business, creator, productivity, and education tool engines.
2. Add saved outputs and exports for every tool category.
3. Add usage-based tool credits and bundles priced in Telegram Stars.
4. Add team workspaces for agencies, schools, and small businesses.
5. Add analytics for tool usage, conversion, and successful payments.

## License

MIT
