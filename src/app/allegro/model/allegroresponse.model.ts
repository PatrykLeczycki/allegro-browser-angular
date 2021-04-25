export class AllegroResponse {
  constructor(public access_token: string,
              public token_type: string,
              public refresh_token: string,
              public expires_in: number,
              public scope: string,
              public allegro_api: boolean,
              public jti: string) {
  }
}
