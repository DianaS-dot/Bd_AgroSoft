export class EpaTipoCultivoWiki {
  private constructor(
    public readonly epaId: number,
    public readonly tipoCultivoWikiId: number,
  ) {}

  static create(params: { epaId: number; tipoCultivoWikiId: number }): EpaTipoCultivoWiki {
    if (!params.epaId) {
      throw new Error('El epaId es obligatorio');
    }
    if (!params.tipoCultivoWikiId) {
      throw new Error('El tipoCultivoWikiId es obligatorio');
    }
    return new EpaTipoCultivoWiki(params.epaId, params.tipoCultivoWikiId);
  }
}