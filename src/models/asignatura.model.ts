import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Estudiante} from './estudiante.model';
import {Profesor} from './profesor.model';

@model()
export class Asignatura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  IdAsignatura?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Aula: string;

  @property({
    type: 'string',
    required: true,
  })
  Semestre: string;

  @property({
    type: 'string',
  })
  FkIdEstudiante?: string;

  @hasMany(() => Estudiante, {keyTo: 'FkIdAsignatura'})
  estudiantes: Estudiante[];

  @belongsTo(() => Profesor, {name: 'profesores'})
  FkIdProfesor: string;

  constructor(data?: Partial<Asignatura>) {
    super(data);
  }
}

export interface AsignaturaRelations {
  // describe navigational properties here
}

export type AsignaturaWithRelations = Asignatura & AsignaturaRelations;
