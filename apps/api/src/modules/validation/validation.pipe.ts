import { ZodSchema } from 'zod';
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body') {
        this.schema.parse(value);
      }
      return value;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
