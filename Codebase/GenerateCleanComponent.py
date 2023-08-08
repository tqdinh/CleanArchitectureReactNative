import os
from pathlib import Path

featureName = input("Please enter Usecase\n")
ext = 'ts'
pathDomain = './src/domain/usecases/{0}'.format(
    featureName[0].lower()+featureName[1:])
pathRepository = './src/data/repository/{0}'.format(
    featureName[0].lower()+featureName[1:])
pathDataSource = './src/data/dataSource/{0}'.format(
    featureName[0].lower()+featureName[1:])

if not os.path.exists(pathDomain):   # create folders if not exists
    Path(pathDomain).mkdir(parents=True, exist_ok=True)

if not os.path.exists(pathRepository):   # create folders if not exists
    Path(pathRepository).mkdir(parents=True, exist_ok=True)

if not os.path.exists(pathDataSource):   # create folders if not exists
    Path(pathDataSource).mkdir(parents=True, exist_ok=True)


useCase = '{0}Usecase'.format(featureName)
useCaseImpl = '{0}UsecaseImpl'.format(featureName)


repository = '{0}Repository'.format(featureName)
repositoryImpl = '{0}RepositoryImpl'.format(featureName)


dataSource = '{0}DataSource'.format(featureName)
localDataSource = '{0}LocalDataSource'.format(featureName)
remoteDataSource = '{0}RemoteDataSource'.format(featureName)


f_useCase = os.path.join(pathDomain, '{0}.{1}'.format(useCase, ext))
f_useCaseImpl = os.path.join(pathDomain, '{0}.{1}'.format(useCaseImpl, ext))


f_dataSource = os.path.join(pathDataSource, '{0}.{1}'.format(dataSource, ext))
f_localDataSource = os.path.join(
    pathDataSource, '{0}.{1}'.format(localDataSource, ext))
f_remoteDataSource = os.path.join(
    pathDataSource, '{0}.{1}'.format(remoteDataSource, ext))


f_repository = os.path.join(pathRepository, '{0}.{1}'.format(repository, ext))
f_repositoryImpl = os.path.join(
    pathRepository, '{0}.{1}'.format(repositoryImpl, ext))


contentUsecase = ("export interface {0} {{}} " +
                  "\nexport class {1} implements {0} {{" +
                  "\nprivate repository: {2}" +
                  "\nconstructor(_repository: {2}) {{" +
                  "\n  this.repository = _repository" +
                  "\n}}" +
                  "\n}} ").format(
    useCase, useCaseImpl, repository)


contentRepository = ("export interface {0} {{}} " +
                     "\nexport class {1} implements {0} {{" +
                     "\n    private localDataSource: {2}" +
                     "\n    private remoteDataSource: {2}" +

                     "\nconstructor(_localDataSource: {2},_remoteDataSource:{2}) {{" +
                     "\n    this.localDataSource = _localDataSource" +
                     "\n    this.remoteDataSource = _remoteDataSource" +

                     "\n}}}}").format(
    repository, repositoryImpl, dataSource)


contentDataSource = "export interface {0} {{}}".format(
    dataSource)

contentLocalDataSource = "export class {0} implements {1} {{}}".format(
    localDataSource, dataSource)


contentRemoteDataSource = "export class {0} implements {1} {{}}".format(
    remoteDataSource, dataSource)


fileUseCase = open(f_useCase, "x")
fileUseCase.write(contentUsecase)
fileUseCase.close()


fileRepository = open(f_repository, "x")
fileRepository.write(contentRepository)
fileRepository.close()


fileDataSource = open(f_dataSource, "x")
fileDataSource.write(contentDataSource)
fileDataSource.close()


fileLocalDataSource = open(f_localDataSource, "x")
fileLocalDataSource.write(contentLocalDataSource)
fileLocalDataSource.close()


fileRemoteDataSource = open(f_remoteDataSource, "x")
fileRemoteDataSource.write(contentRemoteDataSource)
fileRemoteDataSource.close()
