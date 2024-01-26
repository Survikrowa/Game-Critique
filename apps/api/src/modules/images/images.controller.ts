import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { ZodValidationPipe } from '../validation/validation.pipe';
import {
  ImageUploadDTO,
  TransformOptionsDTO,
  TransformOptionsSchema,
} from './images.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ZodValidationPipe(TransformOptionsSchema))
  async upload(
    // @UploadedFile() // new ParseFilePipe({
    // //   validators: [
    // file //     new MaxFileSizeValidator({ maxSize: 4000 }),
    // //     new FileTypeValidator({ fileType: 'image/jpeg' }),
    // //   ],
    // // }),
    // : Express.Multer.File,
    @Body() body: TransformOptionsDTO,
  ): Promise<ImageUploadDTO> {
    // const { url } = await this.imagesService.uploadImage(file);
    // const [firstPartOfUrl, secondPartOfUrl] = url.split('upload/');
    // const transformedUrl = `${firstPartOfUrl}w_${body.transformOptions.width},h_${body.transformOptions.height}/${secondPartOfUrl}`;
    // return {
    //   photo_url: transformedUrl,
    // };

    return {
      photo_url: '',
    };
  }
}
