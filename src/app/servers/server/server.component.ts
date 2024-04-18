import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})


export class ServerComponent implements OnInit {

  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {

    // ================== Fetching data with the 'snapshot' approach ==================
    // const id = +this.activatedRoute.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);

    // this.activatedRoute.params
    //   .subscribe(
    //     (params: Params) => {  
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   );

    // ============== Fetching data with the 'resolve' guard ============== 
    this.activatedRoute.data
      .subscribe(
        (data: Data) => {                 // (data: Data) ou (data: { server: { id: number, name: string, status: string }})
          this.server = data['server'];
        }
      );
      
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve'});
  }

}



/*
  Par défaut, les paramètres de requête sont supprimés lors de la navigation.
  L'option 'queryParamsHandling: "preserve"' garantit que tous les paramètres de requête actuels dans l'URL sont conservés lors de cette navigation.
  Ceci est utile pour conserver les filtres, la pagination ou d'autres paramètres.
  Ici on ne veut pas perdre le paramètre 'allowEdit' lors de la navigation car on en a besoin dans le composant 'edit-server' pour savoir si on peut éditer le serveur ou non
  Si on peut edtiter le serveur, on affiche le formulaire d'édition, sinon on affiche un message d'erreur
*/
