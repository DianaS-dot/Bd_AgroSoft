import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailCodesModule } from './email_codes/email_codes.module';
import { PermisosModule } from './permisos/permisos.module';
import { RolPermisosModule } from './rol_permisos/rol_permisos.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosPermisosModule } from './usuarios_permisos/usuarios_permisos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'agrosoft',
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    UsuariosModule,
    RolesModule,
    PermisosModule,
    RolPermisosModule,
    UsuariosPermisosModule,
    EmailCodesModule,
  ],
})
export class AppModule {}
