import {Entity, model, property, hasMany} from '@loopback/repository';
import {Asignatura} from './asignatura.model';

@model()
export class Profesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  IdProfesor?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @hasMany(() => Asignatura, {keyTo: 'FkIdProfesor'})
  asignaturas: Asignatura[];

  constructor(data?: Partial<Profesor>) {
    super(data);
  }
}

export interface ProfesorRelations {
  // describe navigational properties here
}

export type ProfesorWithRelations = Profesor & ProfesorRelations;
