# Snap Battlers - Monster Battle Strategy Game

A strategic monster battle game powered by **Google Gemini AI**.

## 🚀 How to Deploy on Google Cloud (App Engine)

Since you don't have `gcloud` installed locally, the easiest way is using **Google Cloud Shell** (browser-based terminal).

### Step 1: Open Google Cloud Console
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project: **amit-h2s**
3. Click the **Activate Cloud Shell** icon (top right, >_).

### Step 2: Clone & Build
Run these commands in the Cloud Shell terminal:

```bash
# 1. Clone your repository
git clone https://github.com/Amitkumar729/amit-h2s.git

# 2. Go into the folder
cd amit-h2s

# 3. Install dependencies
npm install

# 4. Build the project
npm run build
```

### Step 3: Deploy
```bash
# Deploy to App Engine
gcloud app deploy
```

- When asked to choose a region, pick one close to you (e.g., `us-central1` or `asia-south1`).
- Type `Y` to confirm.

### 🎉 Done!
The command will output your live URL (e.g., `https://amit-h2s.uc.r.appspot.com`).
