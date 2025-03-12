import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('chat')
export class ChatController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Ensure this folder exists
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/^(image\/(jpeg|png)|application\/pdf)$/)) {
        cb(null, true);
      } else {
        cb(new Error('Only images (jpg, png) and PDFs are allowed'), false);
      }
    },
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log("File received:", file); // Debug log
    return { fileUrl: `/uploads/${file.filename}` };
  }
}