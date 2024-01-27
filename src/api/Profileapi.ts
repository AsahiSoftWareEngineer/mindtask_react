import { DEFAULT_HOST } from "../env/endpoint";
import { get } from "./api";
import { AuthenticationService } from "./Authenticationapi";

export class ProfileService {
    authEnticationSvc = new AuthenticationService();
    accountCheck = async () => {
      if (!(await this.authEnticationSvc.hasRefreshToken())) {
        window.location.href = "/auth/login/";
      }
      if (await this.authEnticationSvc.isExpiredToken()) {
        await this.authEnticationSvc.renewToken();
      }
    };

    getProfile = async () => {
        await this.accountCheck()
        const request = await get(`${DEFAULT_HOST}/api/v1/profile/`)
        console.log(request)
        return request
    };
}
