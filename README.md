# Infinite Scroll Product Store

A modern product listing application with infinite scroll, search, and filtering capabilities. Built with React, TypeScript, React Query, and MSW for a seamless shopping experience.

## 🚀 Live Demo

[View Live Demo](https://your-deployment-url.vercel.app)

## ✨ Features

### Core Requirements ✅
- ✅ **Infinite Scroll** - Automatic loading using Intersection Observer
- ✅ **Pagination** - Load 20 items per page
- ✅ **Mock API** - MSW with realistic 300-1000ms delay
- ✅ **135 Products** - Across 4 categories
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Loading States** - Spinner for initial and next page loads
- ✅ **Error Handling** - Retry mechanism with user feedback
- ✅ **React + TypeScript** - Type-safe development
- ✅ **React Query** - Efficient data fetching and caching

### Bonus Features 🎁
- ✅ **Search** - Real-time product search
- ✅ **Category Filter** - Filter by Electronics, Clothing, Books, Home
- ✅ **Toast Notifications** - User feedback for actions
- ✅ **Well-Commented Code** - Easy to understand and maintain

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Query (TanStack Query)** - Data fetching and caching
- **Mock Service Worker (MSW)** - API mocking
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **react-intersection-observer** - Infinite scroll detection 

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/infinite-scroll-assignment.git

# Navigate to project directory
cd infinite-scroll-assignment

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/              # UI Components
│   ├── Header.tsx          # Sticky header with search and cart
│   ├── Footer.tsx          # Footer section
│   ├── FilterProduct.tsx   # Category filter with clear button
│   ├── ProductCard.tsx     # Product card
│   ├── ProductListPage.tsx # Main page with infinite scroll
│   ├── SearchBar.tsx       # Search input with clear button
│   ├── LoadingSpinner.tsx  # Loading indicator
│   ├── ErrorMessage.tsx    # Error state with retry
│   └── Toast.tsx           # Toast notifications
├── hooks/
│   └── useProducts.ts      # React Query infinite query hook
├── mocks/
│   ├── types.ts            # TypeScript types (Product, PaginatedResponse)
│   ├── browser.ts          # MSW browser setup
│   ├── handlers.ts         # API request handlers with pagination
│   └── data.ts             # Mock product data generator
├── App.tsx                 # Root component with layout
└── index.tsx               # Entry point with React Query setup
```

## ⏱️ Time Spent

**Total: ~13 hours**

## 🚧 Challenges & Solutions

### 1. Filter Not Updating Products & Infinite Scroll
**Problem:** When changing category filter, products didn't update and infinite scroll kept loading old cached data instead of filtered results.

**Solution:** Added category to React Query's `queryKey: ['products', category, searchQuery]`. This tells React Query to treat each filter as a separate query, automatically resetting pagination and refetching data when the key changes.

### 2. Search + Filter Together
**Problem:** Search and filter conflicted - one would override the other.

**Solution:** Applied filters in sequence on backend (MSW): first filter by category, then by search query. Both parameters included in query key for proper caching.

### 3. MSW in Production
**Problem:** MSW was not working in production.

**Solution:** remove MSW from development and make it start in production.

## Author & Contact

<div align="center">
  <img src="https://github.com/3mmar19.png" alt="Author Avatar" width="100" style="border-radius:50%"/>
  <h3>Ammar Bin Hussain</h3>
  <p>
    <a href="https://github.com/3mmar19"><img src="https://img.shields.io/badge/GitHub-3mmar19-2ea44f?logo=github" alt="GitHub"/></a>
    <a href="https://linkedin.com/in/3mmar"><img src="https://img.shields.io/badge/LinkedIn-3mmar-blue?logo=linkedin" alt="LinkedIn"/></a>
    <a href="mailto:ammarhus.ahmed@gmail.com"><img src="https://img.shields.io/badge/Email-ammarhus.ahmed%40gmail.com-red?logo=gmail" alt="Email"/></a>
  </p>
</div>
"# infinite_scroll_app" 
