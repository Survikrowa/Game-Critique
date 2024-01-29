import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const ParseFilePipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ })
  .addMaxSizeValidator({ maxSize: 4_000_000 })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
