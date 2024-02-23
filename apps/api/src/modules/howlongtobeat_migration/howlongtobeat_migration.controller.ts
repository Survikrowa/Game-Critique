import {
  Controller,
  Post,
  Req,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseCsvFilePipe } from './howlongtobeat_migration.pipe';
import { HowLongToBeatMigrationService } from './howlongtobeat_migration.service';
import { HowLongToBeatAccountCsvGamesSchema } from './howlongtobeat_migration.dto';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { RequestWithUser } from '../auth/auth.dto';
import { HowLongToBeatMigrationStatusService } from './howlongtobeat_migration_status/howlongtobeat_migration_status.service';
import { MigrationStatus } from '@prisma/client';

@Controller('hltb')
export class HowLongToBeatMigrationController {
  constructor(
    private readonly howLongToBeatMigrationService: HowLongToBeatMigrationService,
    private readonly howLongToBeatMigrationStatusService: HowLongToBeatMigrationStatusService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('migrate')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fieldSize: 25 * 1024 * 1024,
      },
    }),
  )
  async migrate(
    @Req() req: RequestWithUser,
    @UploadedFile(ParseCsvFilePipe) file: Express.Multer.File,
  ) {
    await this.howLongToBeatMigrationStatusService.upsertMigrationStatus(
      req.user.sub,
      MigrationStatus.IN_PROGRESS,
    );
    const accountGamesData =
      this.howLongToBeatMigrationService.parseCsvFile(file);
    const safeParseResult =
      HowLongToBeatAccountCsvGamesSchema.safeParse(accountGamesData);
    if (!safeParseResult.success) {
      await this.howLongToBeatMigrationStatusService.upsertMigrationStatus(
        req.user.sub,
        MigrationStatus.FAILED,
      );
      throw new UnprocessableEntityException(safeParseResult.error);
    }
    await this.howLongToBeatMigrationService.createMigrationJob(
      safeParseResult.data,
      req.user.sub,
    );
    return safeParseResult.data;
  }
}
