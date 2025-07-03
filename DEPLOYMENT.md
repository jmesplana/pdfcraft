# 🚀 Deployment Guide for PDFCraft

This guide will help you deploy PDFCraft to GitHub and set up GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## 🗂️ Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Repository name: `pdfcraft` (or your preferred name)
4. Description: `Professional PDF Merger & Page Organizer - Free, secure, and open source`
5. Make it **Public** (required for free GitHub Pages)
6. ✅ Add a README file (you'll replace it)
7. Choose **MIT License**
8. Click "Create repository"

## 📁 Step 2: Prepare Your Files

Make sure you have all these files in your project folder:

```
pdfcraft/
├── 📄 landing.html
├── 📄 app.html  
├── 📄 index.html
├── 🎨 landing-styles.css
├── 🎨 styles.css
├── ⚡ landing-script.js
├── ⚡ script.js
├── 📚 README.md
├── ⚖️ LICENSE
├── ⚙️ .github/workflows/pages.yml
└── 📖 DEPLOYMENT.md (this file)
```

## 🔧 Step 3: Update README with Your GitHub Username

1. Open `README.md`
2. Replace `[YOUR-USERNAME]` with your actual GitHub username
3. Replace `[YOUR-EMAIL]` with your email if desired
4. Save the file

Example:
```markdown
# Before
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://jmesplana.github.io/pdfcraft)

# After  
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://jmesplana.github.io/pdfcraft)
```

## 📤 Step 4: Upload Files to GitHub

### Option A: Using GitHub Web Interface (Easiest)

1. Go to your new repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop all your files
4. Write commit message: "Initial commit: Add PDFCraft application"
5. Click "Commit changes"

### Option B: Using Git Commands

```bash
# Clone your repository
git clone https://github.com/jmesplana/pdfcraft.git
cd pdfcraft

# Copy all your files to this directory
# (Copy the files from your pdf_merger folder)

# Add all files
git add .

# Commit
git commit -m "Initial commit: Add PDFCraft application"

# Push to GitHub
git push origin main
```

## 🌐 Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically deploy your site

## ⏱️ Step 6: Wait for Deployment

- Go to the "Actions" tab in your repository
- You'll see a workflow running
- Wait for it to complete (usually 2-3 minutes)
- Your site will be available at: `https://jmesplana.github.io/pdfcraft`

## 🎉 Step 7: Test Your Deployment

1. Visit your GitHub Pages URL
2. Test the landing page
3. Click "Try Now" to test the PDF merger
4. Upload some PDFs and test the functionality

## 🔧 Troubleshooting

### Common Issues:

**🚫 404 Error**
- Check that `index.html` exists in your repository root
- Verify GitHub Pages is enabled in Settings → Pages

**📱 Mobile Issues**
- The site should be fully responsive
- Test on different devices

**🔗 Broken Links**
- Make sure all file names match exactly (case-sensitive)
- Check that all CSS and JS files are uploaded

**⚠️ GitHub Actions Failed**
- Go to Actions tab and check the error
- Usually caused by missing files or incorrect file structure

## 🚀 Optional Enhancements

### Custom Domain
1. Buy a domain name
2. In Settings → Pages → Custom domain
3. Add your domain name
4. Add CNAME file to repository root

### Analytics
- Add Google Analytics to track usage
- Use privacy-focused analytics like Plausible

### SEO Optimization
- Add meta descriptions
- Include OpenGraph tags
- Submit to search engines

## 📧 Support

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/jmesplana/pdfcraft/issues)
2. Create a new issue with details
3. Contact via GitHub Issues or Discussions

## 🎯 Next Steps

Once deployed:

1. ⭐ Star your own repository
2. 📢 Share with friends and colleagues  
3. 🐛 Report any bugs you find
4. 💡 Suggest new features
5. 🤝 Contribute improvements

---

**Congratulations! 🎉 Your PDFCraft is now live and ready for the world to use!**

Your professional PDF merger is now:
- ✅ Deployed on GitHub Pages
- ✅ Completely free to use
- ✅ Open source and transparent
- ✅ Automatically updated when you push changes

Share your creation with the world! 🌍