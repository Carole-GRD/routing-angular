import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {

  user: {id: number, name: string};

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // Initialisation de la propriété `user` de ce composant avec les valeurs récupérées des paramètres de l'URL actuelle
    // en utilisant `snapshot`. Ceci est utile pour récupérer les valeurs initiales lors du chargement du composant.  
    this.user = {
      id: this.activatedRoute.snapshot.params['id'],
      name: this.activatedRoute.snapshot.params['name']
    }

    // Souscription aux changements des paramètres de l'URL.
    // Ceci est utile pour réagir aux changements des paramètres après le chargement initial du composant.
    this.activatedRoute.params
    .subscribe(
      (params: Params) => {        
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )
  }

}
