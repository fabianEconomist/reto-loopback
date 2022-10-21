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
  Estudiante,
  Asignatura,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteAsignaturaController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Array of Estudiante has many Asignatura',
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
    return this.estudianteRepository.asignaturas(id).find(filter);
  }

  @post('/estudiantes/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asignatura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.IdEstudiante,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {
            title: 'NewAsignaturaInEstudiante',
            exclude: ['IdAsignatura'],
            optional: ['FkIdEstudiante']
          }),
        },
      },
    }) asignatura: Omit<Asignatura, 'IdAsignatura'>,
  ): Promise<Asignatura> {
    return this.estudianteRepository.asignaturas(id).create(asignatura);
  }

  @patch('/estudiantes/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Estudiante.Asignatura PATCH success count',
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
    return this.estudianteRepository.asignaturas(id).patch(asignatura, where);
  }

  @del('/estudiantes/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Estudiante.Asignatura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asignatura)) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.estudianteRepository.asignaturas(id).delete(where);
  }
}
