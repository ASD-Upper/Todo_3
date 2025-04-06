# AI-Powered ToDo List Application

A multilingual (English/Arabic) ToDo list application for multiple users with AI-powered productivity insights.

## Features

- Support for 3 different users with individual task management
- Multilingual interface (English/Arabic)
- Task categorization by size (small, medium, large)
- Points system based on task completion and task size
- AI-powered analysis of user productivity using Google Gemini AI
- Personalized recommendations for improving productivity

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS for styling
- Zustand for state management
- Google Gemini AI (via Google Generative AI package)

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app`: Main application routes
  - `/(users)`: Individual user pages
  - `/dashboard`: Dashboard showing all users
- `src/components`: Reusable UI components
- `src/lib`: Utility functions, types, and services
  - `ai-service.ts`: Integration with Google Gemini AI
  - `store.ts`: Zustand store for state management
  - `types.ts`: TypeScript type definitions
  - `utils.ts`: Utility functions

## Task Sizes and Points

- Small: 1 point
- Medium: 3 points
- Large: 5 points

Points are awarded upon task completion and used for productivity analysis.

## AI Analysis

The application uses Google Gemini AI to analyze user productivity data and provide:

1. A personalized analysis of productivity
2. Specific recommendations for improvement
3. Performance rating (excellent, good, average, needs-improvement)

## License

MIT
