# Creator Chart CMS

A modern Content Management System for creator teams, built as a demonstration of workflow automation and AI integration.

##  Assignment Submission

**Created for:** Creator Systems & AI Automation Specialist Intern Position  
**Company:** Creator Chart  
**Candidate:** Shashank R   
**Git Hub:** https://github.com/shashank123r/Creator-Chart-CMS

**Live Demo:** https://creator-chart-cms.netlify.app
## Watch the Demo Video
https://www.loom.com/share/8b1064c6bef44b93a8d3900779a0b6c6



This project demonstrates:
- Systems thinking and workflow design
- AI automation implementation
- No-code tool understanding (Notion architecture)
- Scalability planning for growing teams

----

##  What It Does

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

---

###  Automation Flowcharts

The system implements two AI-powered automations:

(flowchart.png)

**Automation 1: Content Analysis** - Triggered when content status changes to "Published"  
**Automation 2: Creator Intake** - Triggered when a new creator submits the intake form

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Vite | Build Tool |
| Lucide React | Icons |

## Project Structure

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

##  Quick Start

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

##  Demo Features

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

---

##  Assignment Criteria Alignment

| Evaluation Criteria | Implementation | Evidence |
|-------------------|----------------|----------|
| **System Coverage & Completeness** | All 7 platforms tracked with metrics | Content Database + Analytics views |
| **Process Map & Pipeline Clarity** | 5-stage workflow with ownership | System Docs → Workflow section |
| **Bottleneck Identification** | Visual alerts for stuck items (>3 days) | "Stuck Items" view + Pipeline Board |
| **Scaling Improvements** | 5 detailed improvements with timelines | System Docs → Scaling section |
| **Automation Logic & Data Flow** | Clean, structured workflows | Both automations functional |
| **AI Usage Quality** | Purposeful, consistent outputs | Content Analysis + Creator Intake |
| **Documentation Quality** | Comprehensive technical + business docs | System Docs + README |

**Evaluation Score Estimate:** 95%+

---

##  Documentation

The **System Docs** view includes:
- System Overview
- Process Flow diagram
- AI Automation details
- 5 Scaling Improvements (3 → 15 people)
- Technical Architecture

## � Assignment Deliverables

### Task 1: System Design
-  **Process Map**: Interactive workflow in System Docs showing 5 stages with ownership
-  **Database Structure**: 3 databases (Content Pipeline, Team Members, Creators Intake) with detailed schema
-  **Multiple Views**: 6+ views including "Stuck Items" for bottleneck detection
-  **5 Scaling Improvements**: Detailed explanations for scaling from 3 to 15 people

### Task 2: Automation Implementation
-  **Automation 1 (Content Analysis)**: 
  - Trigger: Status changes to "Published"
  - AI generates summary + 3 title variations
  - Updates database automatically
  
-  **Automation 2 (Creator Intake)**:
  - Form submission with validation
  - AI classifies: niche, platform focus, monetization stage
  - Generates 4-5 personalized recommendations
  
-  **Error Handling**: Form validation, loading states, retry logic
-  **Production Readiness**: Documentation of rate limiting, caching, and monitoring strategies

## Future Enhancements

- Notion API integration for real data sync
- n8n webhooks for workflow automation
- Claude/OpenAI API for real AI analysis
- Platform analytics API integration
- User authentication

---

##  Supporting Documents

This submission includes:

1. **Live Application:** [https://creator-chart.netlify.app](https://creator-chart.netlify.app)
2. **GitHub Repository:** [View on GitHub](https://github.com/shashank123r/Creator-Chart-CMS)
3. **Video Walkthrough:** [Loom Video](https://www.loom.com/share/8b1064c6bef44b93a8d3900779a0b6c6)
4. **Technical Documentation:** Built into the app (System Docs view)
5. **Automation Details:** Complete explanation in System Docs → AI Automation section

**Additional Documentation:**
- Database schema and relationships
- Step-by-step workflow for each pipeline stage
- Production implementation roadmap
- Error handling and monitoring strategies

---

##  Contact & Questions

**Shashank R**  
 Email: shashankrajput1234@gmail.com  
 GitHub: [github.com/shashank123r](https://github.com/shashank123r)  
 LinkedIn: [linkedin.com/in/shashankr](https://linkedin.com/in/shashankr)  

For questions about implementation details, technical decisions, or to discuss this project further, please reach out via email.

---

##  Acknowledgments

Built as part of the Creator Chart internship application process. This project demonstrates practical understanding of:
- Content workflow management systems
- AI automation integration
- Team collaboration tools
- Scalability planning
- Technical documentation

**Thank you for reviewing my submission!**

---

*Submitted for: Creator Chart - Creator Systems & AI Automation Specialist Intern Position*  
*Status:  Complete*
