import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const ParseFilePipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'image/jpeg' })
  .addFileTypeValidator({ fileType: 'image/png' })
  .addMaxSizeValidator({ maxSize: 4000 })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
