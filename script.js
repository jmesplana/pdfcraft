// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

class PDFMerger {
    constructor() {
        this.files = [];
        this.sortable = null;
        this.currentFilePages = [];
        this.currentFileIndex = -1;
        this.pageSortable = null;
        this.initializeElements();
        this.attachEventListeners();
        this.initializeSortable();
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.browseBtn = document.getElementById('browseBtn');
        this.filesSection = document.getElementById('filesSection');
        this.filesContainer = document.getElementById('filesContainer');
        this.fileCount = document.getElementById('fileCount');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.mergeBtn = document.getElementById('mergeBtn');
        this.progressSection = document.getElementById('progressSection');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.successSection = document.getElementById('successSection');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.startOverBtn = document.getElementById('startOverBtn');
        
        // Modal elements
        this.pageModal = document.getElementById('pageModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalClose = document.getElementById('modalClose');
        this.pagesContainer = document.getElementById('pagesContainer');
        this.selectAllPages = document.getElementById('selectAllPages');
        this.deselectAllPages = document.getElementById('deselectAllPages');
        this.applyPageSelection = document.getElementById('applyPageSelection');
    }

    attachEventListeners() {
        this.uploadArea.addEventListener('click', (e) => {
            console.log('Upload area clicked');
            this.fileInput.click();
        });
        this.browseBtn.addEventListener('click', (e) => {
            console.log('Browse button clicked');
            e.stopPropagation();
            this.fileInput.click();
        });
        
        this.fileInput.addEventListener('change', (e) => {
            console.log('File input changed, files:', e.target.files);
            this.handleFileSelect(e.target.files);
            // Reset the input value so the same file can be selected again
            e.target.value = '';
        });
        
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        
        this.clearAllBtn.addEventListener('click', () => this.clearAllFiles());
        this.mergeBtn.addEventListener('click', () => this.mergeToPDF());
        this.startOverBtn.addEventListener('click', () => this.startOver());
        
        // Modal event listeners
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.pageModal.addEventListener('click', (e) => {
            if (e.target === this.pageModal) this.closeModal();
        });
        this.selectAllPages.addEventListener('click', () => this.selectAllPagesInModal());
        this.deselectAllPages.addEventListener('click', () => this.deselectAllPagesInModal());
        this.applyPageSelection.addEventListener('click', () => this.applyPageSelectionToFile());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.pageModal.style.display === 'flex') {
                this.closeModal();
            }
        });
    }

    initializeSortable() {
        this.sortable = new Sortable(this.filesContainer, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            handle: '.drag-handle',
            onEnd: (evt) => {
                const item = this.files.splice(evt.oldIndex, 1)[0];
                this.files.splice(evt.newIndex, 0, item);
            }
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        this.handleFileSelect(files);
    }

    async handleFileSelect(files) {
        console.log('handleFileSelect called with:', files);
        
        if (!files || files.length === 0) {
            console.log('No files provided');
            return;
        }

        const validFiles = Array.from(files).filter(file => this.isValidFile(file));
        console.log('Valid files:', validFiles);
        
        if (validFiles.length === 0) {
            console.log('No valid files found');
            this.showError('Please select valid files (PDF, JPG, PNG, or TXT)');
            return;
        }

        // Show loading state
        this.showLoadingMessage(`Processing ${validFiles.length} file(s)...`);

        try {
            for (const file of validFiles) {
                console.log('Processing file:', file.name);
                await this.addFile(file);
                console.log('File processed successfully:', file.name);
            }
            
            this.hideLoadingMessage();
            this.updateUI();
            console.log('All files processed, UI updated');
        } catch (error) {
            console.error('Error processing files:', error);
            this.hideLoadingMessage();
            this.showError('Error processing files. Please try again.');
        }
    }

    isValidFile(file) {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'text/plain'];
        return validTypes.includes(file.type) || 
               /\.(pdf|jpg|jpeg|png|txt)$/i.test(file.name);
    }

    async addFile(file) {
        console.log('addFile called for:', file.name, 'type:', file.type);
        
        const fileObj = {
            id: Date.now() + Math.random(),
            file: file,
            name: file.name,
            size: this.formatFileSize(file.size),
            type: file.type,
            preview: null,
            pages: [],
            selectedPages: []
        };

        try {
            console.log('Generating preview for:', file.name);
            fileObj.preview = await this.generatePreview(file);
            console.log('Preview generated for:', file.name);
            
            if (file.type === 'application/pdf') {
                console.log('Extracting PDF pages for:', file.name);
                fileObj.pages = await this.extractPDFPages(file);
                fileObj.selectedPages = fileObj.pages.map((_, index) => index);
                console.log('PDF pages extracted:', fileObj.pages.length);
            } else if (file.type.startsWith('image/')) {
                console.log('Processing image file:', file.name);
                fileObj.pages = [{ preview: fileObj.preview, type: 'image' }];
                fileObj.selectedPages = [0];
            } else {
                console.log('Processing text/other file:', file.name);
                fileObj.pages = [{ preview: null, type: 'text' }];
                fileObj.selectedPages = [0];
            }
        } catch (error) {
            console.error('Error processing file:', file.name, error);
            fileObj.pages = [{ preview: null, type: 'unknown' }];
            fileObj.selectedPages = [0];
        }

        this.files.push(fileObj);
        console.log('File added to array. Total files:', this.files.length);
    }

    async extractPDFPages(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            const pages = [];
            
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;
                
                pages.push({
                    preview: canvas.toDataURL(),
                    type: 'pdf',
                    pageNumber: i
                });
            }
            
            return pages;
        } catch (error) {
            console.error('Error extracting PDF pages:', error);
            return [{ preview: null, type: 'pdf', pageNumber: 1 }];
        }
    }

    async generatePreview(file) {
        return new Promise((resolve, reject) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                resolve('fas fa-file-pdf');
            } else if (file.type === 'text/plain') {
                resolve('fas fa-file-alt');
            } else {
                resolve('fas fa-file');
            }
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    updateUI() {
        this.fileCount.textContent = this.files.length;
        this.filesSection.style.display = this.files.length > 0 ? 'block' : 'none';
        this.mergeBtn.disabled = this.files.length === 0;
        
        this.renderFiles();
    }

    renderFiles() {
        this.filesContainer.innerHTML = '';
        
        if (this.files.length === 0) {
            this.filesContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>No files added yet</p>
                </div>
            `;
            return;
        }

        this.files.forEach((fileObj, index) => {
            const fileElement = this.createFileElement(fileObj, index);
            this.filesContainer.appendChild(fileElement);
        });
    }

    createFileElement(fileObj, index) {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.dataset.id = fileObj.id;

        const previewContent = typeof fileObj.preview === 'string' && fileObj.preview.startsWith('fas') 
            ? `<i class="${fileObj.preview}"></i>`
            : `<img src="${fileObj.preview}" alt="Preview">`;

        const totalPages = fileObj.pages.length;
        const selectedPages = fileObj.selectedPages.length;
        const pagesSummary = totalPages > 1 ? `${selectedPages}/${totalPages} pages selected` : '';

        div.innerHTML = `
            <div class="drag-handle">
                <i class="fas fa-grip-vertical"></i>
            </div>
            <div class="file-preview">
                ${previewContent}
            </div>
            <div class="file-info">
                <div class="file-name">${fileObj.name}</div>
                <div class="file-size">${fileObj.size}</div>
                ${pagesSummary ? `<div class="pages-summary">${pagesSummary}</div>` : ''}
                ${totalPages > 1 ? `<button class="file-pages-btn" onclick="pdfMerger.openPageModal(${index})">
                    <i class="fas fa-eye"></i> View Pages
                </button>` : ''}
            </div>
            <div class="file-actions">
                <button class="btn-icon" onclick="pdfMerger.moveUp(${index})" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="btn-icon" onclick="pdfMerger.moveDown(${index})" ${index === this.files.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
                <button class="btn-icon danger" onclick="pdfMerger.removeFile(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        return div;
    }

    openPageModal(fileIndex) {
        this.currentFileIndex = fileIndex;
        const fileObj = this.files[fileIndex];
        this.currentFilePages = [...fileObj.pages];
        
        this.modalTitle.textContent = `Pages: ${fileObj.name}`;
        this.renderPagesModal();
        this.pageModal.style.display = 'flex';
        
        // Initialize sortable for pages
        setTimeout(() => {
            this.pageSortable = new Sortable(this.pagesContainer, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                handle: '.page-drag-handle',
                onEnd: (evt) => {
                    const item = this.currentFilePages.splice(evt.oldIndex, 1)[0];
                    this.currentFilePages.splice(evt.newIndex, 0, item);
                    this.updatePageNumbers();
                }
            });
        }, 100);
    }

    renderPagesModal() {
        this.pagesContainer.innerHTML = '';
        
        this.currentFilePages.forEach((page, index) => {
            const pageElement = this.createPageElement(page, index);
            this.pagesContainer.appendChild(pageElement);
        });
    }

    createPageElement(page, index) {
        const div = document.createElement('div');
        div.className = 'page-item';
        div.dataset.pageIndex = index;
        
        const fileObj = this.files[this.currentFileIndex];
        const originalIndex = fileObj.pages.findIndex(p => p === page);
        const isSelected = fileObj.selectedPages.includes(originalIndex);
        
        if (isSelected) {
            div.classList.add('selected');
        }

        let previewContent = '';
        if (page.preview) {
            if (page.type === 'image' || page.type === 'pdf') {
                previewContent = `<img src="${page.preview}" alt="Page ${index + 1}">`;
            } else {
                previewContent = `<canvas></canvas>`;
            }
        } else {
            previewContent = `<i class="fas fa-file-alt"></i>`;
        }

        div.innerHTML = `
            <div class="page-drag-handle">
                <i class="fas fa-grip-vertical"></i>
            </div>
            <input type="checkbox" class="page-checkbox" ${isSelected ? 'checked' : ''} 
                   onchange="pdfMerger.togglePageSelection(${index})">
            <div class="page-preview">
                ${previewContent}
            </div>
            <div class="page-info">
                <div class="page-number">Page ${index + 1}</div>
            </div>
        `;

        return div;
    }

    togglePageSelection(pageIndex) {
        const fileObj = this.files[this.currentFileIndex];
        const page = this.currentFilePages[pageIndex];
        const originalIndex = fileObj.pages.findIndex(p => p === page);
        
        const checkbox = this.pagesContainer.children[pageIndex].querySelector('.page-checkbox');
        const pageElement = this.pagesContainer.children[pageIndex];
        
        if (checkbox.checked) {
            if (!fileObj.selectedPages.includes(originalIndex)) {
                fileObj.selectedPages.push(originalIndex);
            }
            pageElement.classList.add('selected');
        } else {
            fileObj.selectedPages = fileObj.selectedPages.filter(i => i !== originalIndex);
            pageElement.classList.remove('selected');
        }
    }

    selectAllPagesInModal() {
        const checkboxes = this.pagesContainer.querySelectorAll('.page-checkbox');
        checkboxes.forEach((checkbox, index) => {
            if (!checkbox.checked) {
                checkbox.checked = true;
                this.togglePageSelection(index);
            }
        });
    }

    deselectAllPagesInModal() {
        const checkboxes = this.pagesContainer.querySelectorAll('.page-checkbox');
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                checkbox.checked = false;
                this.togglePageSelection(index);
            }
        });
    }

    applyPageSelectionToFile() {
        const fileObj = this.files[this.currentFileIndex];
        
        // Update the page order based on current sorting
        const newPageOrder = [];
        this.currentFilePages.forEach(page => {
            const originalIndex = fileObj.pages.findIndex(p => p === page);
            if (fileObj.selectedPages.includes(originalIndex)) {
                newPageOrder.push(originalIndex);
            }
        });
        
        fileObj.selectedPages = newPageOrder;
        
        this.closeModal();
        this.updateUI();
    }

    updatePageNumbers() {
        const pageElements = this.pagesContainer.querySelectorAll('.page-item');
        pageElements.forEach((element, index) => {
            const pageNumber = element.querySelector('.page-number');
            pageNumber.textContent = `Page ${index + 1}`;
        });
    }

    closeModal() {
        this.pageModal.style.display = 'none';
        if (this.pageSortable) {
            this.pageSortable.destroy();
            this.pageSortable = null;
        }
        this.currentFilePages = [];
        this.currentFileIndex = -1;
    }

    moveUp(index) {
        if (index > 0) {
            [this.files[index], this.files[index - 1]] = [this.files[index - 1], this.files[index]];
            this.updateUI();
        }
    }

    moveDown(index) {
        if (index < this.files.length - 1) {
            [this.files[index], this.files[index + 1]] = [this.files[index + 1], this.files[index]];
            this.updateUI();
        }
    }

    removeFile(index) {
        this.files.splice(index, 1);
        this.updateUI();
    }

    clearAllFiles() {
        this.files = [];
        this.updateUI();
    }

    async mergeToPDF() {
        if (this.files.length === 0) return;

        this.showProgress();
        
        try {
            const pdfDoc = await PDFLib.PDFDocument.create();
            let processedPages = 0;
            let totalPages = 0;
            
            // Calculate total pages to process
            this.files.forEach(fileObj => {
                totalPages += fileObj.selectedPages.length;
            });
            
            for (let i = 0; i < this.files.length; i++) {
                const fileObj = this.files[i];
                
                this.updateProgress(
                    (processedPages / totalPages) * 100, 
                    `Processing ${fileObj.name}...`
                );
                
                await this.addFileToPDF(pdfDoc, fileObj);
                processedPages += fileObj.selectedPages.length;
                
                await this.delay(300);
            }

            this.updateProgress(100, 'Finalizing PDF...');
            
            const pdfBytes = await pdfDoc.save();
            this.downloadPDF(pdfBytes);
            
            this.showSuccess();
            
        } catch (error) {
            console.error('Error merging PDF:', error);
            this.showError('Failed to merge files. Please try again.');
            this.hideProgress();
        }
    }

    async addFileToPDF(pdfDoc, fileObj) {
        const file = fileObj.file;
        
        if (file.type === 'application/pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            
            // Only add selected pages in the correct order
            for (const pageIndex of fileObj.selectedPages) {
                if (pageIndex < pdf.getPageCount()) {
                    const [page] = await pdfDoc.copyPages(pdf, [pageIndex]);
                    pdfDoc.addPage(page);
                }
            }
            
        } else if (file.type.startsWith('image/')) {
            // For images, there's typically only one page
            if (fileObj.selectedPages.includes(0)) {
                const arrayBuffer = await file.arrayBuffer();
                const image = file.type === 'image/png' 
                    ? await pdfDoc.embedPng(arrayBuffer)
                    : await pdfDoc.embedJpg(arrayBuffer);
                
                const page = pdfDoc.addPage([image.width, image.height]);
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: image.width,
                    height: image.height,
                });
            }
            
        } else if (file.type === 'text/plain') {
            // For text files, there's typically only one page
            if (fileObj.selectedPages.includes(0)) {
                const text = await file.text();
                const page = pdfDoc.addPage();
                const { width, height } = page.getSize();
                
                page.drawText(text, {
                    x: 50,
                    y: height - 50,
                    size: 12,
                    maxWidth: width - 100,
                    lineHeight: 15,
                });
            }
        }
    }

    downloadPDF(pdfBytes) {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        this.downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = url;
            a.download = `merged-document-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
    }

    showProgress() {
        this.filesSection.style.display = 'none';
        this.progressSection.style.display = 'block';
        this.successSection.style.display = 'none';
    }

    updateProgress(percent, text) {
        this.progressFill.style.width = `${percent}%`;
        this.progressText.textContent = text;
    }

    hideProgress() {
        this.progressSection.style.display = 'none';
        this.filesSection.style.display = 'block';
    }

    showSuccess() {
        this.progressSection.style.display = 'none';
        this.successSection.style.display = 'block';
    }

    startOver() {
        this.files = [];
        this.successSection.style.display = 'none';
        this.progressSection.style.display = 'none';
        this.updateUI();
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.insertBefore(errorDiv, container.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    showLoadingMessage(message) {
        // Remove any existing loading message
        this.hideLoadingMessage();
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-message';
        loadingDiv.id = 'loadingMessage';
        loadingDiv.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <span>${message}</span>
            </div>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(loadingDiv, container.firstChild);
    }

    hideLoadingMessage() {
        const loadingDiv = document.getElementById('loadingMessage');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

let pdfMerger;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing PDF Merger...');
    
    // Small delay to ensure all resources are loaded
    setTimeout(() => {
        try {
            pdfMerger = new PDFMerger();
            console.log('PDF Merger with page sorting initialized successfully');
        } catch (error) {
            console.error('Error initializing PDF Merger:', error);
        }
    }, 100);
});