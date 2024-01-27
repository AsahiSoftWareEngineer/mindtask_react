import { DEFAULT_HOST } from "../env/endpoint"
import { get, post } from "./api"
import { AuthenticationService } from "./Authenticationapi";

export class TaskService {
    authEnticationSvc = new AuthenticationService();
    accountCheck = async () => {
        if(!await this.authEnticationSvc.hasRefreshToken()){
            window.location.href = "/auth/login/"
        }
        if(await this.authEnticationSvc.isExpiredToken()){
            await this.authEnticationSvc.renewToken()
        }
    }
    
    getTasks = async () => {
        await this.accountCheck();
        const request = await get(`${DEFAULT_HOST}/api/v1/task/`);
        return request
    }

    createTask = async (id:string, name:string, task_id:number) => {
        await this.accountCheck();
        const request = await post(`${DEFAULT_HOST}/api/v1/task/`, {
            task_id: task_id,
            uuid: id,
            name: name
        });
        return request;
    }

    deleteTask = async (id:string, task_id:number) => {
        await this.accountCheck();
        const request = await post(`${DEFAULT_HOST}/api/v1/task/delete/`, {
            task_id: task_id,
            uuid: id
        })
        return request;
    }

    checkTask = async(id:number, task_id: number) => {
        await this.accountCheck();
        const request = await post(`${DEFAULT_HOST}/api/v1/task/check/`, {
            task_id: task_id,
            id: id,
        })
        return request;
    }
}