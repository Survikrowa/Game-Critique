import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Module({
  providers: [CloudinaryProvider, ImagesService],
  exports: [CloudinaryProvider, ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
