import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
    private jwt: string | undefined;

    getJwt() {
        return this.jwt;
    }

    setJwt(token: string) {
        this.jwt = token;
    }
}
