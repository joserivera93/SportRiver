import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Cliente } from '../models/cliente';
import { ClientesService } from '../Services/clientes.service';


@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})

export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();
  constructor(private db: AngularFirestore, cli: ClientesService) { }


  ngOnInit(): void {

      this.clientes.length = 0;
      this.db.collection('clientes').get().subscribe((resultado) => {
        console.log(resultado.docs);

        resultado.docs.forEach((item) => {
          let cliente: any = item.data();
          cliente.id = item.id;
          cliente.ref = item.ref;
          this.clientes.push(cliente);
        });
      });
    }

    }

