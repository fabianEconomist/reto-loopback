import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Profesor,
  Asignatura,
} from '../models';
import {ProfesorRepository} from '../repositories';

export class ProfesorAsignaturaController {
  constructor(
    @repository(ProfesorRepository) protected profesorRepository: ProfesorRepository,
  ) { }

  @get('/profesors/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Array of Profesor has many Asignatura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asignatura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asignatura>,
  ): Promise<Asignatura[]> {
    return this.profesorRepository.asignaturas(id).find(filter);
  }

  @post('/profesors/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Profesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asignatura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Profesor.prototype.IdProfesor,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {
            title: 'NewAsignaturaInProfesor',
            exclude: ['IdAsignatura'],
            optional: ['FkIdProfesor']
          }),
        },
      },
    }) asignatura: Omit<Asignatura, 'IdAsignatura'>,
  ): Promise<Asignatura> {
    return this.profesorRepository.asignaturas(id).create(asignatura);
  }

  @patch('/profesors/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Profesor.Asignatura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {partial: true}),
        },
      },
    })
    asignatura: Partial<Asignatura>,
    @param.query.object('where', getWhereSchemaFor(Asignatura)) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.profesorRepository.asignaturas(id).patch(asignatura, where);
  }

  @del('/profesors/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Profesor.Asignatura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asignatura)) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.profesorRepository.asignaturas(id).delete(where);
  }
}
