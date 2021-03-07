import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '../models/precio';
import { MensajesService } from '../Services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio: FormGroup;
  precios: Precio[] = new Array<Precio>();
  esEditar: boolean = false;
  id: string = '';
  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private msj: MensajesService,
    ) { }

  ngOnInit(): void {

    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required],
    });

    this.mostrarPrecios();
  }

  mostrarPrecios(){
    this.db.collection<Precio>('precios').get().subscribe((resultado) => {
      this.precios.length = 0;
      resultado.docs.forEach((dato) => {
        const precio: any = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      });
    });
  }
  agregar(){
    this.db.collection<Precio>('precios').add(this.formularioPrecio.value).then(() => {
      this.msj.mensajeCorrecto('Agregado', 'Se ha agregado correctamente');
      this.formularioPrecio.reset();
      this.mostrarPrecios();
    }).catch(() => {
      this.msj.mensajeError('Error', 'Ha ocurrido algun error');
    });
  }

  editarPrecios(precio: Precio){
    this.esEditar = true;
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion,
    });
    this.id = precio.id;
  }
  editar(){
    this.db.doc('precios/' + this.id).update(this.formularioPrecio.value).then(() => {
      this.msj.mensajeCorrecto('Editado', 'Se edito correctamente');
      this.formularioPrecio.reset();
      this.esEditar = false;
      this.mostrarPrecios();
    }).catch(() => {
      this.msj.mensajeError('Error', 'Ha habido un error');
    });
  }
}
