# Second Brain Project

A simple web application built with **React, TypeScript, and Axios**, allowing users to access shared content via unique URLs.

## 🚀 Features
- Fetch shared content using a unique `shareID`
- Display content dynamically using React components
- Type safety with **TypeScript**
- API calls with **Axios**
- Responsive UI with **Tailwind CSS** 

## 🛠 Tech Stack
- **Frontend**: React, TypeScript
- **Backend**: Node.js (optional, API integration)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

## ⚡ Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/vivekraj2704/Second-Brain.git
   cd Second-Brain
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env` file and add:
     ```sh
     VITE_BACKEND_URL=http://your-backend-url
     ```
4. **Run the project**
   ```sh
   npm run dev
   ```

## 🔥 Usage
1. Navigate to `http://localhost:5173/share/:shareID`
2. The page fetches content from `BACKEND_URL/api/v1/brain/:shareID`
3. Content is displayed dynamically in the UI

## ✅ TODO List
- [ ] Separate YouTube and Twitter URLs using the sidebar button
- [ ] Add support for embedding other content types besides YouTube and Twitter
- [ ] State Management using Redux
- [ ] Enhance UI/UX with better design and animations

---
**Author:** Vivek Raj 🚀



