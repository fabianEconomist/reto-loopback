import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asignatura, AsignaturaRelations, Estudiante, Profesor} from '../models';
import {EstudianteRepository} from './estudiante.repository';
import {ProfesorRepository} from './profesor.repository';

export class AsignaturaRepository extends DefaultCrudRepository<
  Asignatura,
  typeof Asignatura.prototype.IdAsignatura,
  AsignaturaRelations
> {

  public readonly estudiantes: HasManyRepositoryFactory<Estudiante, typeof Asignatura.prototype.IdAsignatura>;

  public readonly profesores: BelongsToAccessor<Profesor, typeof Asignatura.prototype.IdAsignatura>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>, @repository.getter('ProfesorRepository') protected profesorRepositoryGetter: Getter<ProfesorRepository>,
  ) {
    super(Asignatura, dataSource);
    this.profesores = this.createBelongsToAccessorFor('profesores', profesorRepositoryGetter,);
    this.registerInclusionResolver('profesores', this.profesores.inclusionResolver);
    this.estudiantes = this.createHasManyRepositoryFactoryFor('estudiantes', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiantes', this.estudiantes.inclusionResolver);
  }
}
