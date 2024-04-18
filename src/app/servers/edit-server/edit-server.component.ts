import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';
import { ComponentCanDeactivate } from './can-deactivate.guard';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})


export class EditServerComponent implements OnInit, ComponentCanDeactivate {

  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false; // Contrôle si l'utilisateur peut éditer le serveur
  changesSaved = false; // Indicateur si les modifications ont été enregistrées

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {

    // "queryParams" et "fragment" sont des observables, on s'abonne pour les lire à chaque changement et pas seulement une fois à l'initialisation du composant
    // pas besoin de se désabonner car Angular le fait pour nous comme pour "params"
    // Angular sait que ces observables sont liés à la durée de vie du composant et qu'ils seront détruits en même temps que le composant
    // S'abonne aux queryParams pour permettre ou non l'édition selon le paramètre 'allowEdit'
    this.activatedRoute.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    this.activatedRoute.fragment.subscribe();
    
    // this.server = this.serversService.getServer(1);
    const id = +this.activatedRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // Subscribe to route params to update the id if params change
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve', fragment: 'loading'});
  }

  // Implémentation de la méthode de l'interface ComponentCanDeactivate
  canDeactivate(): boolean {
    
    // Si l'édition n'est pas autorisée, permet toujours de quitter
    if (!this.allowEdit) {
      return true;
    }
    // Si les noms ou statuts sont modifiés et que ces changements ne sont pas sauvegardés, demande confirmation pour quitter la page
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm("Voulez-vous vraiment quitter cette page ? Des modifications pourraient ne pas être enregistrées.");
    }
    else {
      return true;
    }
  }

}
