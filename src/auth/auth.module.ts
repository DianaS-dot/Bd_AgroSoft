import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './infrastructure/http/controllers/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { UserTypeOrmRepository } from './infrastructure/persistence/user-typeorm.repository';
import { UserOrmEntity } from './infrastructure/persistence/user.orm-entity';
import { RolOrmEntity } from './infrastructure/persistence/rol.orm-entity';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { USER_REPOSITORY } from './domain/ports/user-repository.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity, RolOrmEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    UserTypeOrmRepository,
    JwtStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [
    LoginUseCase,
    RegisterUseCase,
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}