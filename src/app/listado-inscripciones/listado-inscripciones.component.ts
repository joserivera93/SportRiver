import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: any[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.inscripciones.length = 0;
    this.db.collection('inscripciones').get().subscribe((resultado) =>
    {
      resultado.forEach((inscripcion) =>
      {
        // tslint:disable-next-line:prefer-const
        let inscripcionObtenida: any = inscripcion.data();
        inscripcionObtenida.id = inscripcion.id;
        this.db.doc(inscripcionObtenida.cliente.path).get().subscribe((cliente) => {
          inscripcionObtenida.clienteObtenido = cliente.data();
          inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds * 1000);
          inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds * 1000);
          this.inscripciones.push(inscripcionObtenida);
          console.log(inscripcionObtenida);
        });
      });
    });
  }

}

