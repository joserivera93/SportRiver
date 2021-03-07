import { DocumentReference } from '@angular/fire/firestore';

export class Cliente{
  id: string;
  nombre: string;
  apellido: string ;
  email: string ;
  fechaNacimiento: Date ;
  ImgUrl: string ;
  telefono: number;
  ref: DocumentReference;
  visible: boolean;

  constructor(){

  }

}
