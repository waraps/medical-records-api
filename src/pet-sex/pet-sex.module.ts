import { Module } from '@nestjs/common';
import { PetSexController } from './pet-sex.controller';
import { PetSexService } from './pet-sex.service';

@Module({
  controllers: [PetSexController],
  providers: [PetSexService]
})
export class PetSexModule {}
