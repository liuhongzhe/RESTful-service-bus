import { LoginType } from './entity/login-type';
import { Admin } from './model/admin';
import { User } from './model/user';

export class AppCache {
    loginType: LoginType;
    get loginUser(): Admin {
        return <User>JSON.parse(sessionStorage.getItem('login-user'));
    }
    set loginUser(user: User) {
        sessionStorage.setItem('login-user', JSON.stringify(user));
    }
    get loginAdmin(): Admin {
        return <Admin>JSON.parse(sessionStorage.getItem('login-admin'));
    }
    set loginAdmin(admin: Admin) {
        sessionStorage.setItem('login-admin', JSON.stringify(admin));
    }
}