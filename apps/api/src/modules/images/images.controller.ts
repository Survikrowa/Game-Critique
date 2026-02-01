import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/infrastructure/guards/auth-jwt.guard';
import { ZodValidationPipe } from '../validation/validation.pipe';
import {
  ImageUploadDTO,
  TransformOptionsDTO,
  TransformOptionsSchema,
} from './images.dto';
import { ParseFilePipe } from './images.pipe';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fieldSize: 25 * 1024 * 1024,
      },
    }),
  )
  @UsePipes(new ZodValidationPipe(TransformOptionsSchema))
  async upload(
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
    @Body() body: TransformOptionsDTO,
  ): Promise<ImageUploadDTO | undefined> {
    const { secure_url } = await this.imagesService.uploadImage(file);
    const [firstPartOfUrl, secondPartOfUrl] = secure_url.split('upload/');
    const transformedUrl = `${firstPartOfUrl}upload/w_${body.transformOptions.width},h_${body.transformOptions.height}/${secondPartOfUrl}`;
    return {
      photo_url: transformedUrl,
    };
  }
}
