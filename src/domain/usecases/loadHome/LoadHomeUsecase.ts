export interface LoadHomeUsecase {} 
export class LoadHomeUsecaseImpl implements LoadHomeUsecase {
private repository: LoadHomeRepository
constructor(_repository: LoadHomeRepository) {
  this.repository = _repository
}
} 