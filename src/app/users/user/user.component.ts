import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit, OnDestroy {

  user: {id: number, name: string};
  paramsSubscription: Subscription;

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
    this.paramsSubscription = this.activatedRoute.params
    .subscribe(
      (params: Params) => {        
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )
  }

  ngOnDestroy() {
    // Cette méthode est appelée avant la destruction du composant.
    // Il est recommandé de se désabonner de toutes les souscriptions pour éviter les fuites de mémoire.

    // ⬇️ Ce désabonnement n'est pas obligatoire car Angular le fait automatiquement en ce qui concerne les souscriptions aux paramètres de l'URL.
    this.paramsSubscription.unsubscribe();  
  }

}
