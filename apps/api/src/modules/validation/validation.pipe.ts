import { ZodSchema } from 'zod';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: unknown) {
    try {
      console.log('ZodValidationPipe', value);
      this.schema.parse(value);
      return value;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
