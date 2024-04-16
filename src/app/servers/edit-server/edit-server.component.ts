import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams);
    console.log(this.activatedRoute.snapshot.fragment);

    // "queryParams" et "fragment" sont des observables, on s'abonne pour les lire à chaque changement et pas seulement une fois à l'initialisation du composant
    // pas besoin de se désabonner car Angular le fait pour nous comme pour "params"
    // Angular sait que ces observables sont liés à la durée de vie du composant et qu'ils seront détruits en même temps que le composant
    this.activatedRoute.queryParams.subscribe();
    this.activatedRoute.fragment.subscribe();
    
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
