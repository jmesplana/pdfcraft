# PDFCraft 📄✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://jmesplana.github.io/pdfcraft)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-blue)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PDF.js](https://img.shields.io/badge/PDF.js-v3.11-red)](https://mozilla.github.io/pdf.js/)

**Professional PDF Merger & Page Organizer** - A powerful, secure, and completely free web application for combining and organizing PDF documents with advanced page-level control.

## 🚀 [Live Demo](https://jmesplana.github.io/pdfcraft)

![PDFCraft Screenshot](docs/screenshot.png)

## ✨ Features

### 🎯 **Advanced PDF Management**
- **Page-Level Control**: Select, reorder, and organize individual pages from multiple PDFs
- **Visual Preview**: See thumbnail previews of every page before merging
- **Drag & Drop Interface**: Intuitive organization with visual feedback
- **Multi-Format Support**: Combine PDFs, images (JPG, PNG), and text files

### 🔒 **Privacy & Security First**
- **100% Client-Side Processing**: Files never leave your device
- **Zero Data Collection**: No tracking, no analytics, complete anonymity
- **Offline Capable**: Works without internet connection once loaded
- **Open Source**: Full transparency with auditable code

### 💻 **Professional Features**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Lightning Fast**: Instant processing with no server delays
- **Bulk Operations**: Select all, deselect all, batch controls
- **Error Handling**: Robust error handling with user-friendly messages

## 🎬 How It Works

1. **Upload Files**: Drag and drop or click to browse for PDFs, images, or text files
2. **Preview & Organize**: See page thumbnails and drag to reorder
3. **Select Pages**: Choose which pages to include from each document
4. **Merge & Download**: Create your combined PDF instantly

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Visit [https://jmesplana.github.io/pdfcraft](https://jmesplana.github.io/pdfcraft) and start merging immediately!

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/jmesplana/pdfcraft.git

# Navigate to the directory
cd pdfcraft

# Serve the files (Python example)
python -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Option 3: Deploy to Your Own Server
Simply upload all files to any web server - no backend required!

## 📁 Project Structure

```
pdfcraft/
├── 📄 landing.html          # Professional landing page
├── 📄 app.html              # Main PDF merger application
├── 📄 index.html            # Redirects to landing page
├── 🎨 landing-styles.css    # Landing page styles
├── 🎨 styles.css            # Application styles
├── ⚡ landing-script.js     # Landing page interactions
├── ⚡ script.js             # Core PDF merger functionality
├── 📚 README.md             # Project documentation
├── ⚙️ .github/              # GitHub configuration
│   └── workflows/
│       └── pages.yml        # GitHub Pages deployment
└── 📸 docs/                 # Documentation assets
    └── screenshot.png       # Application screenshot
```

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **PDF Processing**: [PDF-lib](https://pdf-lib.js.org/) for creation, [PDF.js](https://mozilla.github.io/pdf.js/) for rendering
- **UI Framework**: Custom CSS with modern design principles
- **Drag & Drop**: [Sortable.js](https://sortablejs.github.io/Sortable/) for intuitive interactions
- **Icons**: Font Awesome 6
- **Typography**: Inter font family

## 🔧 Browser Compatibility

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution
- 🐛 Bug fixes and improvements
- 🎨 UI/UX enhancements
- 📱 Mobile experience optimization
- 🌐 Internationalization (i18n)
- ♿ Accessibility improvements
- 📖 Documentation updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**John Mark Esplana**
- GitHub: [@jmesplana](https://github.com/jmesplana)
- LinkedIn: [John Mark Esplana](https://linkedin.com/in/johnmarkesplana)

## 🙏 Acknowledgments

- **PDF.js Team** - For the excellent PDF rendering library
- **PDF-lib Contributors** - For the powerful PDF manipulation library
- **Sortable.js Team** - For the smooth drag-and-drop functionality
- **Open Source Community** - For inspiration and best practices

## 🎯 Roadmap

- [ ] **Batch Processing**: Handle multiple merge operations
- [ ] **Advanced Page Operations**: Rotate, resize, crop pages
- [ ] **Bookmarks & Metadata**: Preserve and edit PDF metadata
- [ ] **Password Protection**: Add security to merged PDFs
- [ ] **Cloud Integration**: Optional cloud storage integration
- [ ] **API Access**: Programmatic access for developers

## 💡 Use Cases

- **Document Management**: Combine contracts, reports, and presentations
- **Academic Research**: Merge research papers and references
- **Legal Documentation**: Organize case files and evidence
- **Business Operations**: Compile invoices, receipts, and reports
- **Personal Organization**: Combine scanned documents and photos

## 🔐 Security & Privacy

PDFCraft takes your privacy seriously:

- **No Server Processing**: All operations happen in your browser
- **No Data Storage**: Files are processed temporarily in memory only
- **No Tracking**: No analytics, cookies, or user identification
- **Open Source**: Code is publicly auditable for transparency
- **HTTPS Only**: Secure communication when hosted properly

## 📊 Performance

- **File Size Limit**: Depends on your device's available RAM
- **Processing Speed**: Instant for most documents
- **Supported Formats**: PDF, JPG, PNG, TXT
- **Page Limit**: No artificial limits imposed

## 🆘 Support & FAQ

### Common Issues

**Q: The file upload doesn't work on first click**
A: This has been fixed in the latest version. Clear your browser cache and try again.

**Q: Large PDFs are slow to process**
A: Processing happens locally, so speed depends on your device. Consider splitting very large files.

**Q: Can I use this offline?**
A: Yes! Once loaded, PDFCraft works completely offline.

### Getting Help

- 🐛 **Bug Reports**: [Create an issue](https://github.com/jmesplana/pdfcraft/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/jmesplana/pdfcraft/discussions)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/jmesplana/pdfcraft/discussions)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/johnmarkesplana">John Mark Esplana</a></p>
  <p>
    <a href="https://jmesplana.github.io/pdfcraft">🌐 Live Demo</a> •
    <a href="https://github.com/jmesplana/pdfcraft/issues">🐛 Report Bug</a> •
    <a href="https://github.com/jmesplana/pdfcraft/discussions">💡 Request Feature</a>
  </p>
</div>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jmesplana/pdfcraft&type=Timeline)](https://star-history.com/#jmesplana/pdfcraft&Timeline)

---

*PDFCraft - Empowering users with professional PDF management tools, completely free and open source.*