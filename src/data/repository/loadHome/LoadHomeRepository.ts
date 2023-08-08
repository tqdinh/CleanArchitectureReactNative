export interface LoadHomeRepository {} 
export class LoadHomeRepositoryImpl implements LoadHomeRepository {
    private localDataSource: LoadHomeDataSource
    private remoteDataSource: LoadHomeDataSource
constructor(_localDataSource: LoadHomeDataSource,_remoteDataSource:LoadHomeDataSource) {
    this.localDataSource = _localDataSource
    this.remoteDataSource = _remoteDataSource
}}