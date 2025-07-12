# ReWear Frontend

A beautiful, responsive frontend for the ReWear sustainable fashion exchange platform.

## Features

- 🎨 **Beautiful UI**: Modern, clean design with smooth animations
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🔐 **Authentication**: Secure login/register with JWT tokens
- 🛍️ **Item Management**: Browse, add, edit, and delete items
- 🔄 **Swap System**: Request and manage item swaps
- 👤 **User Profiles**: Complete user profile management
- 🎯 **Search & Filters**: Advanced search and filtering capabilities
- ⚡ **Fast & Optimized**: Built with React and optimized for performance

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client
- **Framer Motion** - Animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd ReWear/FE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Environment Setup

The frontend is configured to proxy requests to the backend at `http://localhost:5000`. Make sure your backend server is running on that port.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation bar
│   ├── Footer.js       # Footer component
│   └── ProtectedRoute.js # Route protection
├── contexts/           # React contexts
│   ├── AuthContext.js  # Authentication state
│   └── ItemContext.js  # Items state management
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   ├── Dashboard.js    # User dashboard
│   ├── Items.js        # Items listing
│   ├── ItemDetail.js   # Item details
│   ├── AddItem.js      # Add new item
│   ├── Profile.js      # User profile
│   └── Swaps.js        # Swap management
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Features Overview

### Authentication
- Secure login/register with form validation
- JWT token management
- Protected routes
- User profile management

### Item Management
- Browse items with search and filters
- Add new items with image upload
- Edit and delete items
- Detailed item views with image galleries

### Swap System
- Request swaps between users
- Accept/decline swap requests
- Track swap status and history
- Complete swaps

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states and error handling

## API Integration

The frontend integrates with the following backend endpoints:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/:id` - Get item details
- `POST /api/swaps` - Create swap request
- `GET /api/swaps` - Get user swaps
- `PUT /api/swaps/:id` - Update swap status

## Styling

The project uses Tailwind CSS with custom components:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-outline` - Outline button style
- `.input-field` - Form input style
- `.card` - Card container style
- `.gradient-bg` - Gradient background

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the ReWear sustainable fashion platform.

## Support

For support or questions, please contact the development team. 