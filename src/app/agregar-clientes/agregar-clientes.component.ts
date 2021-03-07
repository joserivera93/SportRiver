import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../Services/mensajes.service';

@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.scss']
})
export class AgregarClientesComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubido: number = 0;
  urlImagen: string = '';
  editarCliente: boolean = false;
  id: string;
  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private msj: MensajesService,
    ) { }

  ngOnInit(): void {

    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      fechaNacimieto: ['', Validators.required],
      telefono: [''],
      ImgUrl: [''],
    });

    this.id = this.activeRoute.snapshot.params.clienteID;

    if (this.id != undefined){
      this.editarCliente =  true;
      this.db.doc<any>('clientes' + '/' + this.id).valueChanges().subscribe((cliente) => {
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          telefono: cliente.telefono,
          email: cliente.email,
          fechaNacimieto: new Date(cliente.fechaNacimieto.seconds * 1000).toISOString().substr(0, 10),
          ImgUrl: '',

        });
        this.urlImagen = cliente.ImgUrl;
      });
    }

  }

  agregar() {

    this.formularioCliente.value.ImgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimieto = new Date(this.formularioCliente.value.fechaNacimieto);
    console.log(this.formularioCliente.value);
    this.db.collection('clientes').add(this.formularioCliente.value).then((finalizo) => {
      this.msj.mensajeCorrecto('Agregar', 'Se agrego Correctamente');
    });
  }

  editar(){
    this.formularioCliente.value.ImgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimieto = new Date(this.formularioCliente.value.fechaNacimieto);

    this.db.doc('clientes/' + this.id).update(this.formularioCliente.value).then(() => {
      this.msj.mensajeCorrecto('Editor', 'Se Edito Correctamente');
    }).catch(() => {
      this.msj.mensajeError('Error', 'Ha ocurrido algun error');
    });
  }
  subirImage(evento: any) {

    if (evento.target.files.length > 0) {

      const nombre = new Date().getTime().toString();
      const archivo = evento.target.files[0];

      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      let ruta = 'clientes' + nombre + extension;
      const referencias = this.storage.ref(ruta);
      const tarea = referencias.put(archivo);
      tarea.then((objeto) => {
        console.log('Imagen Subida');
        referencias.getDownloadURL().subscribe((url) => {
          this.urlImagen = url;
        });
      });
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubido = (porcentaje);
      });
    }


  }

}
