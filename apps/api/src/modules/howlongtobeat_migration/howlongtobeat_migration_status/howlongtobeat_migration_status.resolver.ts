import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt.guard';
import { HowLongToBeatMigrationStatusService } from './howlongtobeat_migration_status.service';
import { User } from '../../auth/auth.decorators';
import { UserAuthDTO } from '../../auth/auth.dto';
import { HowLongToBeatMigrationStatusDTO } from './howlongtobeat_migration_status.dto';

@Resolver()
export class HowLongToBeatMigrationStatusResolver {
  constructor(
    private readonly howLongToBeatMigrationStatusService: HowLongToBeatMigrationStatusService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Query(() => HowLongToBeatMigrationStatusDTO)
  async migrationStatus(@User() user: UserAuthDTO) {
    return this.howLongToBeatMigrationStatusService.getMigrationStatus(
      user.sub,
    );
  }
}
