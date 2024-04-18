import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth.guard";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate.guard";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.guard";


export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users',
        component: UsersComponent,
        children: [
            { path: ':id/:name', component: UserComponent }
        ]
    },
    {
        path: 'servers',
        // canActivate: [AuthGuard], 
        canActivateChild: [AuthGuard],
        component: ServersComponent,
        children: [
            {
                path: ':id',
                resolve: { server: ServerResolver },
                component: ServerComponent
            },
            {
                path: ':id/edit',
                canDeactivate: [CanDeactivateGuard],
                component: EditServerComponent
            }
        ]
    },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
    { path: '**', redirectTo: '/not-found' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule { }


/*
    Configuration du RouterModule pour votre application Angular

    imports: [RouterModule.forRoot(routes, { useHash: true })],
        ... au lieu de ...
    imports: [RouterModule.forRoot(routes)],
 
    useHash: true signifie que le routage de l'application utilisera le mode de hash
    Dans ce mode, l'URL contiendra un '#' après le nom de domaine de base
    Exemple : http://example.com/#/users
    Cela permet de gérer le routage côté client sans que le serveur ne doive intervenir pour chaque changement de route
    Le mode de hash est particulièrement utile si le serveur n'est pas configuré pour renvoyer l'index.html pour les routes gérées par Angular
    Cela aide également à éviter des problèmes avec les routes qui pourraient être interceptées ou mal gérées par le serveur
*/