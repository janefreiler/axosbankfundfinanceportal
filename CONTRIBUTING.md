# Contributing to Axos Bank Fund Finance Portal

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for getting involved.

## Current Status

This project is currently in the **prototype phase** with a single developer. The following workflow will be implemented when the project expands to a team:

## Future Development Workflow

### Branch Structure
- `main` - Production-ready code (protected)
- `develop` - Integration branch for features (optional)
- `feature/*` - Individual feature branches
- `bugfix/*` - Bug fix branches
- `docs/*` - Documentation updates

### Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### Submitting Changes

1. Make your changes on your feature branch
2. Commit with clear, descriptive messages
3. Push to your branch
4. Create a Pull Request (PR) against `main`
5. Describe what your changes do
6. Link any related issues

### Pull Request Requirements

- Clear description of changes
- Reference to related issues (if any)
- Testing notes
- Screenshots/demos (for UI changes)

### Code Review Process

When the team grows:
- At least one code review required before merge
- All CI checks must pass
- Branch must be up-to-date with `main`
- Author responsible for resolving feedback

## Development Guidelines

### HTML/CSS Prototype Phase

- Keep semantic HTML structure
- Use CSS custom properties (already defined in `styles.css`)
- Follow mobile-first responsive design
- Test across different screen sizes

### Commit Messages

```
[type]: Brief description

Optional detailed explanation if needed.

Related to issue #123 (if applicable)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: CSS/styling changes
- `refactor`: Code refactoring
- `chore`: Build, dependencies, etc.

## Testing Locally

1. Open `public/index.html` in a web browser
2. Test all interactive features
3. Check responsive design on mobile
4. Validate forms and inputs
5. Test file upload functionality

## Reporting Issues

When reporting bugs or suggesting features:

1. Check existing issues to avoid duplicates
2. Provide clear description
3. Include steps to reproduce (for bugs)
4. Add screenshots or examples
5. Note your browser/device if relevant

## Questions?

Feel free to open an issue for questions or discussions about the project.
