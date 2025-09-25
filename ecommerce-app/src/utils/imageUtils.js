// Image upload utilities for product management

/**
 * Converts a File object to a data URL for local storage
 * In a production app, you would upload to a server and get a URL
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Validates image file type and size
 */
export const validateImageFile = (file, maxSizeMB = 5) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please select a JPEG, PNG, GIF, or WebP image.');
  }

  if (file.size > maxSizeBytes) {
    throw new Error(`File size too large. Please select an image under ${maxSizeMB}MB.`);
  }

  return true;
};

/**
 * Compresses an image file (basic compression)
 * In a production app, you might use a more sophisticated compression library
 */
export const compressImage = (file, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions (max 800px width)
      const maxWidth = 800;
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      // Draw and compress
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(resolve, file.type, quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Generates a unique filename for uploaded images
 */
export const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `product_${timestamp}_${random}.${extension}`;
};

/**
 * Sample placeholder images for demo purposes
 */
export const placeholderImages = [
  'https://via.placeholder.com/400x400/e5e7eb/6b7280?text=Product+Image',
  'https://via.placeholder.com/400x400/ddd6fe/7c3aed?text=Electronics',
  'https://via.placeholder.com/400x400/fef3c7/d97706?text=Fashion',
  'https://via.placeholder.com/400x400/d1fae5/059669?text=Home+%26+Garden',
];

/**
 * Gets a random placeholder image
 */
export const getRandomPlaceholder = () => {
  return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
};

/**
 * Image upload handler for ProductManager
 * In a real app, this would upload to your server/cloud storage
 */
export const handleImageUpload = async (file) => {
  try {
    // Validate the file
    validateImageFile(file);

    // Compress the image
    const compressedFile = await compressImage(file);

    // Convert to data URL for local storage
    const dataUrl = await fileToDataUrl(compressedFile);

    // Generate a unique filename
    const filename = generateUniqueFilename(file.name);

    // In a real app, you would upload to a server here
    // For demo purposes, we're using data URLs
    return {
      url: dataUrl,
      filename: filename,
      originalName: file.name,
      size: compressedFile.size,
      type: compressedFile.type
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Instructions for setting up real image uploads
 */
export const imageUploadInstructions = `
To implement real image uploads in production:

1. **Server Setup:**
   - Set up a file upload endpoint on your backend
   - Configure storage (local filesystem, AWS S3, Cloudinary, etc.)
   - Implement proper security (file type validation, size limits, virus scanning)

2. **Frontend Changes:**
   - Replace fileToDataUrl with actual upload API call
   - Add upload progress indicators
   - Handle upload errors gracefully

3. **Example Backend (Node.js/Express):**
   \`\`\`javascript
   const multer = require('multer');
   const upload = multer({ dest: 'uploads/' });
   
   app.post('/api/upload', upload.single('image'), (req, res) => {
     // Process uploaded file
     res.json({ url: '/uploads/' + req.file.filename });
   });
   \`\`\`

4. **Example Frontend API call:**
   \`\`\`javascript
   const formData = new FormData();
   formData.append('image', file);
   
   const response = await fetch('/api/upload', {
     method: 'POST',
     body: formData
   });
   
   const { url } = await response.json();
   \`\`\`
`;

const imageUtils = {
  fileToDataUrl,
  validateImageFile,
  compressImage,
  generateUniqueFilename,
  placeholderImages,
  getRandomPlaceholder,
  handleImageUpload,
  imageUploadInstructions
};

export default imageUtils;