import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//para utilizar .map
import 'rxjs/add/operator/map';


@Injectable()
export class SpotifyService {

	artistas: any[] = [];
	urlSpotify: string = "https://api.spotify.com/v1/";
	token: string = 'BQB6mj1QqV1NO3_EFTfzmtku9JaSbPBSeff46575rqTTFYwDan33KN3DCBjCpjGyHm-BjajOV4LcJ3q2Lsw';

  constructor( public http: HttpClient ) {
  	console.log('spotify listo!');
  }

	private getHeaders() {

		let headers = new HttpHeaders({
  		'Authorization': "'Bearer " + this.token + "'"
		});
		return headers;
	}

	getTop( id: string ){

		let url:string = `${ this.urlSpotify }artists/${ id }/top-tracks?country=ES`;

		let headers = this.getHeaders();

		return this.http.get( url, { headers } );

	}

	getArtista( id:string ){

		let url:string = `${ this.urlSpotify }artists/${ id }`;

		let headers = this.getHeaders();

  	return this.http.get( url, { headers } );
		/*.map( (resp: any) => {
			this.artistas = resp.artists.items;
			return this.artistas;
		})*/

	}

  getArtistas( termino: string ){

  	let url:string = `${ this.urlSpotify }search?query=${ termino }&type=artist&limit=10`;

		let headers = this.getHeaders();

  	return this.http.get( url, { headers } )
		.map( (resp: any) => {
			this.artistas = resp.artists.items;
			return this.artistas;
		})

  }

}
