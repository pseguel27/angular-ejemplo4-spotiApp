import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from '../../services/spotify.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {

  artista:any = {};
  songs:any[] = [];
  pistas:any[] = [];

  constructor( private activatedRoute: ActivatedRoute,
                public _spotify: SpotifyService ) { }

  ngOnInit() {

    this.activatedRoute.params
          .map( params => params['id'] )
          .subscribe( id => {

            this._spotify.getArtista( id )
              .subscribe( artista => {
                this.artista = artista;
            });

            this._spotify.getTop( id )
              .map( (resp:any) => resp.tracks )
              .subscribe( pistas => {
                this.pistas = pistas;
                console.log(this.pistas);
            });
          });

  }

}
