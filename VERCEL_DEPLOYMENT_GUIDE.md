# 🚀 Vercel Deployment Guide for GoPratle

This guide provides step-by-step instructions for deploying the **GoPratle** frontend application to **Vercel**.

Repository: [https://github.com/yerrakaushik/GoPratle](https://github.com/yerrakaushik/GoPratle)

---

## ⚡ Option 1: 1-Click Import from GitHub (Recommended)

Since the repository is already pushed to GitHub, importing into Vercel takes less than 60 seconds:

1. **Go to Vercel**:
   - Open [https://vercel.com/new](https://vercel.com/new) in your browser.
   - Log in with your GitHub account if prompted.

2. **Import Repository**:
   - Locate **`yerrakaushik/GoPratle`** in the list and click **Import**.

3. **Configure Project Settings**:
   - **Framework Preset**: `Next.js` (Vercel automatically detects this).
   - **Root Directory**: Click **Edit** next to Root Directory, select or type `client`, and click **Continue**.
   - **Build Command**: `npm run build` (Default)
   - **Output Directory**: `.next` (Default)

4. **Environment Variables (Optional)**:
   - If you have deployed your Express backend (e.g. to Render or Railway):
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://<your-backend-domain>/api`
   - *Note: If left empty, GoPratle will seamlessly fall back to its internal serverless Next.js API handlers so all features, submissions, and the `/postings` feed remain 100% operational on Vercel without broken links!*

5. **Deploy**:
   - Click **Deploy**.
   - Your live URL will be ready at `https://gopratle-<your-username>.vercel.app`!

---

## 💻 Option 2: Deploy Using Vercel CLI

If you prefer deploying directly from your local terminal:

1. **Log in to Vercel CLI**:
   ```powershell
   npx vercel login
   ```
   *(Select your email or GitHub and confirm in the browser)*

2. **Deploy the Client Directory**:
   ```powershell
   cd client
   npx vercel --prod
   ```

3. **Answer the Quick CLI Prompts**:
   - `Set up and deploy “client”?` → **Y**
   - `Which scope do you want to deploy to?` → *(Select your account)*
   - `Link to existing project?` → **N**
   - `What’s your project’s name?` → `gopratle`
   - `In which directory is your code located?` → `./`
   - `Want to modify these settings?` → **N**

4. **Done!** The CLI will output your live production URL.

---

## 🌐 Pairing with a Deployed Express + MongoDB Backend

For full separation of concerns where your Express server runs independently:

1. **Host the Backend on Render or Railway**:
   - Connect the same repository: `https://github.com/yerrakaushik/GoPratle`
   - Set **Root Directory** to `server`
   - Set **Build Command**: `npm install`
   - Set **Start Command**: `npm start`
   - Set Environment Variables:
     - `PORT` = `5000`
     - `MONGODB_URI` = `mongodb+srv://<user>:<pwd>@cluster0.mongodb.net/gopratle?retryWrites=true&w=majority`
     - `CLIENT_ORIGIN` = `https://<your-deployed-app>.vercel.app`

2. **Point Vercel to the Backend**:
   - In your Vercel Project Dashboard → **Settings** → **Environment Variables**:
     - Set `NEXT_PUBLIC_API_URL` = `https://<your-backend-app>.onrender.com/api`
   - Trigger a redeployment.
