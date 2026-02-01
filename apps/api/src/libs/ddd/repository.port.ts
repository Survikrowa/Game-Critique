export interface RepositoryPort<Entity> {
  save(entity: Entity): Promise<Entity>;
}
