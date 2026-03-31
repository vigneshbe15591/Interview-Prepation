# 🚀 DevPrep - Developer Interview Preparation

An interactive React-based learning platform designed to help developers prepare for technical interviews with comprehensive Q&A resources, code examples, and hands-on coding challenges across multiple programming topics.

## 📋 Features

- **Multi-Topic Coverage**: Prepare for interviews across 7 different technologies:
  - JavaScript
  - React
  - TypeScript
  - Angular
  - HTML5
  - CSS3

- **Comprehensive Q&A Sections**: Each topic includes frequently asked interview questions with detailed answers

- **Interactive Code Examples**: View and test code snippets directly in the browser

- **Coding Challenges**: 
  - Encode/Decode section for string manipulation problems
  - Min/Max algorithms for array operations
  - Repeated words detection and analysis

- **Responsive Design**: Fully responsive UI with sidebar navigation for easy topic browsing

- **Search & Navigation**: Quick access to all topics with intuitive sidebar menu

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router DOM 7
- **Build Tool**: Create React App
- **Language**: JavaScript/JSX
- **Styling**: CSS3

## 📁 Project Structure

```
Interview-Preparation/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AccordionItem.jsx      # Collapsible Q&A display
│   │   ├── CodeBlock.jsx          # Code snippet viewer
│   │   ├── Sidebar.jsx            # Navigation sidebar
│   │   └── demo/
│   │       ├── EncodeDecodeSection.jsx
│   │       ├── MinMaxSection.jsx
│   │       └── RepeatedWordsSection.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx          # Topic overview page
│   │   ├── TopicHome.jsx          # Topic detail page
│   │   └── TopicQA.jsx            # Q&A questions view
│   ├── data/
│   │   ├── angular.js             # Angular Q&A data
│   │   ├── css3.js                # CSS3 Q&A data
│   │   ├── html5.js               # HTML5 Q&A data
│   │   ├── javascript.js          # JavaScript Q&A data
│   │   ├── react.js               # React Q&A data
│   │   ├── typescript.js          # TypeScript Q&A data
│   │   └── index.js               # Data aggregation
│   ├── styles/
│   │   ├── global.css             # Global styles
│   │   └── styles.css             # Component styles
│   ├── utils/
│   │   └── functions.js           # Utility functions
│   ├── App.jsx                    # Main app component
│   └── index.js                   # Entry point
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Interview-Preparation
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## 📖 Usage

1. **Browse Topics**: Start from the Dashboard to see all available topics
2. **View Details**: Click on a topic to see its overview and learning resources
3. **Study Questions**: Navigate to the Q&A section to review interview questions
4. **Practice Code**: Use the demo sections to solve coding challenges
5. **Quick Navigation**: Use the sidebar to jump between topics

## 🔧 Available Scripts

- `npm start` - Run the app in development mode
- `npm build` - Build the app for production
- `npm test` - Run the test suite
- `npm eject` - Eject from Create React App (irreversible)

## 🎯 Topics Covered

Each topic includes:
- Key concepts and definitions
- Common interview questions with answers
- Code examples and best practices
- Related follow-up questions

### Supported Topics:
- **JavaScript**: Core concepts, ES6+, async/await, closures, etc.
- **React**: Components, hooks, state management, lifecycle, performance
- **TypeScript**: Type system, interfaces, generics, decorators
- **Angular**: Components, services, dependency injection, RxJS
- **HTML5**: Semantic elements, forms, multimedia, APIs
- **CSS3**: Flexbox, Grid, animations, responsive design

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop browsers
- Tablets
- Mobile devices

## 🔄 Routes

- `/` - Dashboard (home page)
- `/:topicId` - Topic detail page
- `/:topicId/qa` - Q&A section for a topic

## 📝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT

## 🤝 Support

For questions or issues, please open an issue in the repository.

---

**Happy Learning! 🎓** Built to help developers ace their interviews.
