import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [CloudinaryProvider, ImagesService, AuthModule],
  exports: [CloudinaryProvider, ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
