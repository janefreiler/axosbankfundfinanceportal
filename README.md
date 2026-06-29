# Axos Bank Fund Finance Portal

A client portal for tracking fund facility progress, managing documents, and communicating with underwriters.

## Overview

Clients can see the entire process of their facility from beginning to end, including:
- **Facility Dashboard** - Track the status and progress of your deal
- **Document Management** - Upload and manage due diligence documents
- **Messaging System** - Communicate directly with your assigned underwriter
- **Deal Tracking** - View all active deals and their status

## Current Phase: Static HTML Prototype

We're starting with a static HTML/CSS prototype to validate the user experience and design. This allows us to gather feedback quickly before building the full-stack application.

### What's Included
- Dashboard mockup
- Document upload interface
- Messaging interface
- Client communication flow
- Navigation and UI components

## Tech Stack

### Current (Phase 1)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Static hosting (GitHub Pages ready)

### Planned (Phase 2+)
- **Frontend**: Next.js + React
- **Backend**: Supabase (authentication, database, file storage)
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **File Storage**: Supabase Storage

## Getting Started

### View the Prototype
1. Open `public/index.html` in your browser
2. Navigate through the prototype to explore the user experience
3. Test form interactions and navigation flows

### Project Structure

```
public/
├── index.html           # Main entry point
├── css/
│   ├── styles.css       # Global styles and variables
│   ├── dashboard.css    # Dashboard-specific styles
│   ├── documents.css    # Document management styles
│   └── messaging.css    # Messaging interface styles
└── js/
    └── app.js           # Static interactions and form handling
```

## Development Workflow

### Current (Prototype Phase)
- Work directly on `main` branch for rapid iteration
- Test in browser locally
- Gather stakeholder feedback

### Future (Full-Stack Phase)
- Feature branches: `feature/feature-name`
- Bugfix branches: `bugfix/issue-name`
- Pull requests with code review
- Branch protection on `main`
- CI/CD workflows for testing and deployment

## Roadmap

### Phase 1: Static Prototype (Current)
- [ ] Organize HTML/CSS files
- [ ] Refine dashboard UI
- [ ] Enhance document upload interface
- [ ] Polish messaging interface
- [ ] Gather initial feedback

### Phase 2: Next.js Foundation
- [ ] Set up Next.js project
- [ ] Port static HTML to React components
- [ ] Implement navigation with Next.js routing
- [ ] Set up Supabase project

### Phase 3: Authentication & Backend
- [ ] Implement Supabase authentication
- [ ] Create database schema
- [ ] Connect frontend to backend API
- [ ] User session management

### Phase 4: Core Features
- [ ] Facility tracking and progress updates
- [ ] Document upload and management
- [ ] Real-time messaging system
- [ ] Client notifications

### Phase 5: Team Collaboration
- [ ] GitHub workflow setup (PR reviews, branch protection)
- [ ] Code review guidelines
- [ ] Documentation for contributors
- [ ] CI/CD pipeline

## Contributing

This project is currently being developed individually but is designed with team collaboration in mind. When expanding to a team effort, we'll implement:

- Feature branch workflow
- Pull request reviews
- Automated testing
- Branch protection on `main`

## Contact

For questions about this project, reach out to the repository owner.
