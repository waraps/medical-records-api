import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RolModule } from './rol/rol.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PetSexModule } from './pet-sex/pet-sex.module';
import { PatientModule } from './patient/patient.module';
import { RecordModule } from './record/record.module';
import { TestModule } from './test/test.module';
import { OwnerModule } from './owner/owner.module';
import { MedicalAppointmentModule } from './medical-appointment/medical-appointment.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, 
    AuthModule,
    RolModule, 
    UserModule, 
    PetSexModule, 
    PatientModule, 
    RecordModule, 
    TestModule, 
    OwnerModule, 
    MedicalAppointmentModule,
  ],
})
export class AppModule {}
