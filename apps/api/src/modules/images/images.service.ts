import { Injectable } from '@nestjs/common';
import { CloudinaryResponse } from './cloudinary.types';
import { v2 as cloudinary } from 'cloudinary';
import { createReadStream } from 'streamifier';

@Injectable()
export class ImagesService {
  async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.config({
        secure: true,
      });
      const uploadStream = cloudinary.uploader.upload_stream(
        (err, callResult) => {
          if (err) {
            reject(err);
          }
          if (callResult) {
            resolve(callResult);
          }
          reject('Something went wrong during file upload');
        },
      );
      createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
