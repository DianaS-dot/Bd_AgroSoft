import { IsInt } from 'class-validator';

export class CreateEpaTipoCultivoWikiDto {
  @IsInt()
  epaId: number;

  @IsInt()
  tipoCultivoWikiId: number;
}