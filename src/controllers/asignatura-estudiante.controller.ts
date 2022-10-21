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
  Asignatura,
  Estudiante,
} from '../models';
import {AsignaturaRepository} from '../repositories';

export class AsignaturaEstudianteController {
  constructor(
    @repository(AsignaturaRepository) protected asignaturaRepository: AsignaturaRepository,
  ) { }

  @get('/asignaturas/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Array of Asignatura has many Estudiante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Estudiante>,
  ): Promise<Estudiante[]> {
    return this.asignaturaRepository.estudiantes(id).find(filter);
  }

  @post('/asignaturas/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Asignatura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estudiante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asignatura.prototype.IdAsignatura,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {
            title: 'NewEstudianteInAsignatura',
            exclude: ['IdEstudiante'],
            optional: ['FkIdAsignatura']
          }),
        },
      },
    }) estudiante: Omit<Estudiante, 'IdEstudiante'>,
  ): Promise<Estudiante> {
    return this.asignaturaRepository.estudiantes(id).create(estudiante);
  }

  @patch('/asignaturas/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Asignatura.Estudiante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {partial: true}),
        },
      },
    })
    estudiante: Partial<Estudiante>,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.asignaturaRepository.estudiantes(id).patch(estudiante, where);
  }

  @del('/asignaturas/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Asignatura.Estudiante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.asignaturaRepository.estudiantes(id).delete(where);
  }
}
