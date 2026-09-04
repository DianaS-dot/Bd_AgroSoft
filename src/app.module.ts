import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CultivosModule } from './cultivos/cultivos.module';
import { LotesModule } from './lotes/lotes.module';
import { SublotesModule } from './sublotes/sublotes.module';
import { CultivoHistorialModule } from './cultivo-historial/cultivo-historial.module';

import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { PermisosModule } from './permisos/permisos.module';
import { RolPermisosModule } from './rol_permisos/rol_permisos.module';
import { UsuariosPermisosModule } from './usuarios_permisos/usuarios_permisos.module';
import { EmailCodesModule } from './email_codes/email_codes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

   TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => ({
    type: 'postgres',

    host: configService.get<string>('DB_HOST'),

    port: Number(
      configService.get<string>('DB_PORT'),
    ),

    username: configService.get<string>('DB_USERNAME'),

    password: configService.get<string>('DB_PASSWORD'),

    database: configService.get<string>('DB_DATABASE'),

    autoLoadEntities: true,
    synchronize: true,
  }),
}),

    CultivosModule,
    LotesModule,
    SublotesModule,
    CultivoHistorialModule,

    UsuariosModule,
    RolesModule,
    PermisosModule,
    RolPermisosModule,
    UsuariosPermisosModule,
    EmailCodesModule,

    AuthModule,
  ],
})
export class AppModule {}