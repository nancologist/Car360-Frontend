import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
    private token: string | undefined;

    getToken() {
        return this.token;
    }

    setToken(token: string) {
        this.token = token;
    }
}
