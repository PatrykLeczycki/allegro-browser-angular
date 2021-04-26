import * as moment from 'moment';

export class User {
  constructor(
    public id: string,
    public email: string,
    public jwtExpiresIn: Date,
    public allegroExpiresIn: Date,
    public jwtToken: string,
    public allegroToken: string,
    public roles: string[]) {
    this.jwtExpiresIn = new Date(Date.UTC(this.jwtExpiresIn.getFullYear(), this.jwtExpiresIn.getMonth(), this.jwtExpiresIn.getDate(), this.jwtExpiresIn.getHours(), this.jwtExpiresIn.getMinutes()));
  }

  get tokenJwt() {
    if (!this.jwtExpiresIn || new Date() > this.jwtExpiresIn) {
      return null;
    }
    return this.jwtToken;
  }

  get tokenAllegro() {
    if (!this.allegroExpiresIn || new Date() > this.allegroExpiresIn) {
      return null;
    }
    return this.allegroToken;
  }

  setAllegroToken(token: string) {
    this.allegroToken = token;
  }

  setAllegroExpirationTime(expiresIn: number) {
    this.allegroExpiresIn = moment(new Date(expiresIn + Date.now())).toDate();
  }
}
