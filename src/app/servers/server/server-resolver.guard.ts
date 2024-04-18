
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ServersService } from "../servers.service";


interface Server {
    id: number;
    name: string;
    status: string;
}

export const ServerResolver: ResolveFn<Server> = (route: ActivatedRouteSnapshot) => {

    return inject(ServersService).getServer(+route.params['id']);
}