// Packages
import multer from 'multer';

// Utils
import AppError from './appError';

const storage = multer.memoryStorage();
const limits = {
  fileSize: 1024 * 1024
};

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(
      new AppError('Not an image! Please upload only images', 400),
      false
    );
  }
  cb(null, true);
};

export const singleFile = (name) => (req, res, next) => {
  const upload = multer({
    storage,
    limits,
    fileFilter
  }).single(name);

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return next(new AppError(`Cannot Upload More Than 1 Image`, 500));
      }
    }

    if (err) return next(new AppError(err, 500));
    next();
  });
};

export const anyMulter = () => (req, res, next) => {
  const upload = multer({
    storage,
    limits,
    fileFilter
  }).any();

  upload(req, res, (err) => {
    if (err) return next(new AppError(err, 500));
    next();
  });
};

export const multipleFiles = (name, number) => (req, res, next) => {
  const uploads = multer({
    storage,
    limits,
    fileFilter
  }).fields([{ name, maxCount: number }]);

  uploads(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return next(
          new AppError(`Cannot Upload More Than ${number} Images`, 500)
        );
      }
    }

    if (err) {
      return next(new AppError(err, 500));
    }

    next();
  });
};

export const upload = multer({
  dest: './uploads'
});
