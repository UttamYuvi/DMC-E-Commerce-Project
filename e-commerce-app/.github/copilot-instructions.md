# DMC E-Commerce App - AI Agent Instructions

## Project Overview
This is a React Native e-commerce application built with Expo, featuring user authentication (Login/Register) and product browsing. Currently in early development with mock data.

## Architecture
- **Framework**: React Native with Expo (~54.0.31)
- **Navigation**: React Navigation v7 with native stack navigator
- **Screens**: Login, Home, Register (defined in App.js navigation stack)
- **Data**: Mock product data in `/mock/productsList.js` with structure: `{id, categoryId, subCategoryId, category, subCategory, name, description, price, stock, status, images, createdAt}`
- **Structure**: 
  - `/src/screens/` - Screen components
  - `/src/components/` - Reusable UI components  
  - `/src/services/` - API/business logic services
  - `/mock/` - Static data for development

## Development Workflow
- **Start**: `npm start` or `expo start` (launches Expo DevTools)
- **Platform specific**: `npm run android/ios/web` 
- **New Architecture**: Enabled in app.json for better performance
- **Build**: Use Expo CLI for builds, no custom build scripts yet

## Key Patterns
- **Navigation**: Import screens in App.js and register in Stack.Navigator
- **Product Images**: Comma-separated filenames in `images` field, stored in assets
- **Status Values**: Product status can be "continue", "discontinue", or null
- **Categories**: Hierarchical with categoryId/subCategoryId mapping

## Dependencies
- Core: React 19.1.0, React Native 0.81.5
- Navigation: @react-navigation/native-stack v7
- Expo modules: expo-status-bar, safe-area-context, screens

## Conventions
- Use absolute imports from project root
- Follow React Native component naming (PascalCase)
- Mock data structure must match product schema for consistency