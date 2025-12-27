# Creator Chart CMS

A modern Content Management System for creator teams, built as a demonstration of workflow automation and AI integration.

![Dashboard Preview](screenshot.png)

## 🚀 What It Does

Creator Chart CMS helps content teams manage their entire content lifecycle - from ideation to publication - with intelligent automation features:

### Core Features
- **Content Pipeline Management**: Track content through 5 stages (Ideation → Drafting → Design → Review → Published)
- **Multi-Platform Support**: Manage content for LinkedIn, Instagram, X, Reddit, Substack, YouTube, and Newsletter
- **Team Workload Visualization**: See who's working on what and balance team capacity
- **Bottleneck Detection**: Automatic alerts when content is stuck (>3 days = warning, >5 days = critical)
- **AI-Powered Analysis**: Generate content summaries and title variations with mock AI
- **Creator Onboarding**: Intake form that classifies creators by niche, stage, and provides recommendations

### 7 Main Views
1. **Dashboard** - KPI overview, recent activity, top performers
2. **Content Database** - Searchable table with filters and AI analysis
3. **Pipeline Board** - Drag-and-drop Kanban board
4. **Team View** - Team member cards with workload bars
5. **Analytics** - Platform and status distribution charts
6. **Creator Intake** - Form with AI-powered classification
7. **System Docs** - Complete documentation including 5 scaling improvements

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Vite | Build Tool |
| Lucide React | Icons |

## 📁 Project Structure

```
src/
├── App.tsx                 # Main app with routing
├── components/
│   ├── Header.tsx          # Top navigation
│   ├── Sidebar.tsx         # Side navigation
│   ├── Dashboard.tsx       # KPIs & overview
│   ├── ContentDatabase.tsx # Content table
│   ├── PipelineBoard.tsx   # Kanban board
│   ├── TeamView.tsx        # Team management
│   ├── Analytics.tsx       # Charts & stats
│   ├── CreatorIntake.tsx   # Intake form
│   └── SystemDocs.tsx      # Documentation
├── types/index.ts          # TypeScript interfaces
├── data/sampleData.ts      # Mock data (25 content items, 7 team members)
└── utils/
    ├── mockAI.ts           # AI simulation logic
    └── helpers.ts          # Utility functions
```

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd creator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Demo Features

### AI Content Analysis
Click "Analyze with AI" on any published content to:
- Generate a 2-3 sentence summary
- Get 3 alternative title suggestions
- See key topic extraction

### Creator Classification
Submit the Creator Intake form to see AI classify:
- Content niche (Tech/Business, Design, Finance, etc.)
- Monetization stage based on follower count
- Platform recommendations
- 4-5 personalized growth tips

### Dark Mode
Toggle between light and dark themes using the sun/moon icon in the header.

## 📚 Documentation

The **System Docs** view includes:
- System Overview
- Process Flow diagram
- AI Automation details
- 5 Scaling Improvements (3 → 15 people)
- Technical Architecture

## 🔮 Future Enhancements

- Notion API integration for real data sync
- n8n webhooks for workflow automation
- Claude/OpenAI API for real AI analysis
- Platform analytics API integration
- User authentication

---

Built for the Creator Chart internship assignment.
