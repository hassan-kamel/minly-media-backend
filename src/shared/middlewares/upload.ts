import multer from 'multer';
import AppError from '../utils/AppError';
import { StatusCodes } from '../utils/StatusCodes';

// Store files in memory
const storage = multer.memoryStorage();

// Initialize multer with options
export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('file: ', file);
    // Check file type
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'video/mp4' ||
      file.mimetype === 'video/mkv'
    ) {
      // Accept the file
      cb(null, true);
    } else {
      // Reject the file
      cb(
        new AppError(
          'Invalid file type. Only images (JPEG, PNG) and videos (MP4,mkv) are allowed.',
          StatusCodes.BAD_REQUEST,
          'Invalid file type'
        )
      );
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 100 // 100 MB max file size
  }
});
