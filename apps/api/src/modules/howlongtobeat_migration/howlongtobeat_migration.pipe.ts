import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const ParseCsvFilePipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'text/comma-separated-values' })
  .addMaxSizeValidator({ maxSize: 4_000_000 })
  .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY } as const);
