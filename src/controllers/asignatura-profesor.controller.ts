import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asignatura,
  Profesor,
} from '../models';
import {AsignaturaRepository} from '../repositories';

export class AsignaturaProfesorController {
  constructor(
    @repository(AsignaturaRepository)
    public asignaturaRepository: AsignaturaRepository,
  ) { }

  @get('/asignaturas/{id}/profesor', {
    responses: {
      '200': {
        description: 'Profesor belonging to Asignatura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profesor)},
          },
        },
      },
    },
  })
  async getProfesor(
    @param.path.string('id') id: typeof Asignatura.prototype.IdAsignatura,
  ): Promise<Profesor> {
    return this.asignaturaRepository.profesores(id);
  }
}
