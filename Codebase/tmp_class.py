import os
from pathlib import Path


class CleanGen:

    ext = 'ts'

    pathDomain = None
    pathEntity = None
    pathAppModel = None

    pathRepository = None
    pathDataSource = None

    entity = None
    appModel = None

    useCase = None
    useCaseImpl = None

    repository = None
    repositoryImpl = None

    dataSource = None
    localDataSource = None
    remoteDataSource = None

    f_entity = None
    f_appModel = None
    f_useCase = None
    f_useCaseImpl = None

    f_repository = None
    f_repositoryImpl = None

    f_dataSource = None
    f_localDataSource = None
    remoteDataSource = None

    def __init__(self):
        self.featureName = input("\nPlease enter Usecase\n")
        self.entityName = input("\nPlease enter the entity\n")

    def getEntityName(self):
        self.pathEntity = './src/domain/entities/'
        self.entity = ("{0}Entity").format(self.entityName)

    def getEntityFileName(self):
        if (None != self.entity and "" != self.entity):
            self.f_entity = os.path.join(
                self.pathEntity, '{0}.{1}'.format(self.entity[0].upper()+self.entity[1:], self.ext))
        else:
            print("The Entity is None, empty, or existed, no need to create")

    def getAppModelName(self):
        self.pathAppModel = './src/data/appModels/'
        self.appModel = ("{0}Model").format(self.entityName)

    def getAppModelFileName(self):
        if (None != self.appModel and "" != self.appModel):
            self.f_appModel = os.path.join(
                self.pathAppModel, '{0}.{1}'.format(self.appModel[0].upper()+self.appModel[1:], self.ext))

    def getUsecaseName(self):
        self.useCase = '{0}Usecase'.format(self.featureName)
        self.useCaseImpl = '{0}UsecaseImpl'.format(self.featureName)

    def getRepoName(self):
        self.repository = '{0}Repository'.format(self.featureName)
        self.repositoryImpl = '{0}RepositoryImpl'.format(self.featureName)

    def getDataSourceName(self):
        self.dataSource = '{0}DataSource'.format(self.featureName)
        self.localDataSource = '{0}LocalDataSource'.format(self.featureName)
        self.remoteDataSource = '{0}RemoteDataSource'.format(self.featureName)

    def getUsecaseFileName(self):
        self.f_useCase = os.path.join(
            self.pathDomain, '{0}.{1}'.format(self.useCase, self.ext))
        self.f_useCaseImpl = os.path.join(
            self.pathDomain, '{0}.{1}'.format(self.useCaseImpl, self.ext))

    def getRepoFileName(self):
        self.f_repository = os.path.join(
            self.pathRepository, '{0}.{1}'.format(self.repository, self.ext))
        self.f_repositoryImpl = os.path.join(
            self.pathRepository, '{0}.{1}'.format(self.repositoryImpl, self.ext))

    def getDataSourceFileName(self):
        self.f_dataSource = os.path.join(
            self.pathDataSource, '{0}.{1}'.format(self.dataSource, self.ext))
        self.f_localDataSource = os.path.join(
            self.pathDataSource, '{0}.{1}'.format(self.localDataSource, self.ext))
        self.f_remoteDataSource = os.path.join(
            self.pathDataSource, '{0}.{1}'.format(self.remoteDataSource, self.ext))

    def generateEntityFiles(self):
        print(self.f_entity)

    def getDomain(self):
        self.pathDomain = './src/domain/usecases/{0}'.format(
            self.featureName[0].lower()+self.featureName[1:])
        if not os.path.exists(self.pathDomain):   # create folders if not exists
            Path(self.pathDomain).mkdir(parents=True, exist_ok=True)

        self.getEntityName()
        self.getEntityFileName()
        self.getUsecaseName()
        self.getUsecaseFileName()
        # self.generateEntityFiles()
        # self.generateUsecaseFiles()

    def getRepo(self):
        self.pathRepository = './src/data/repository/{0}'.format(
            self.featureName[0].lower()+self.featureName[1:])

        if not os.path.exists(self.pathRepository):   # create folders if not exists
            Path(self.pathRepository).mkdir(parents=True, exist_ok=True)

        self.getRepoName()
        self.getRepoFileName()

    def getDataSource(self):

        self.pathDataSource = './src/data/dataSource/{0}'.format(
            self.featureName[0].lower()+self.featureName[1:])
        if not os.path.exists(self.pathDataSource):   # create folders if not exists
            Path(self.pathDataSource).mkdir(parents=True, exist_ok=True)

        self.getAppModelName()
        self.getAppModelFileName()
        self.getDataSourceName()
        self.getDataSourceFileName()

    def generateContent(self):

        self.usecaseFunction = f'DoStuff(entity:{self.entity}):any'
        self.contentUsecase = ("export interface {self.useCase} {{" +
                               "\n  {self.usecaseFunction}\n" +
                               "}} " +
                               "\nexport class {self.useCaseImpl} implements {self.useCase} {{" +
                               "\nprivate repository: {self.repository}" +
                               "\nconstructor(_repository: {self.repository}) {{" +
                               "\n  this.repository = _repository" +
                               "\n}}" +
                               "\n}} ")
        self.contentRepository = ("export interface {0} {{" +
                                  "\n  {3}\n" +
                                  "}} " +
                                  "\nexport class {1} implements {0} {{" +
                                  "\n    private localDataSource: {2}" +
                                  "\n    private remoteDataSource: {2}" +

                                  "\nconstructor(_localDataSource: {2},_remoteDataSource:{2}) {{" +
                                  "\n    this.localDataSource = _localDataSource" +
                                  "\n    this.remoteDataSource = _remoteDataSource" +

                                  "\n}}}}").format(self.repository, self.repositoryImpl, self.dataSource, self.usecaseFunction)

        self.contentDataSource = (
            "\nexport abstract class{0} {{" +
            "\n   protected dispatch = useDispatch()" +
            "\n  {1}\n" +
            "\n   abstract dataSourceFunction():any" +
            "\n}}"
        ).format(self.dataSource, self.usecaseFunction)

        self.localSpecificInterface = (
            "{0}DistinguishedTask").format(self.localDataSource)
        self.localDataSourceTask = "DoLocalTask():void"
        self.DistinguishedLocalDatasourceComment = (
            "//Please replace [{0}] and [{1}] with your desired interface names and function respectively").format(self.localSpecificInterface, self.localDataSourceTask)

        self.contentLocalDataSource = ("{0}" +
                                       "\ninterface  {1}{{" +
                                       "\n  {3} {{}}" +
                                       "\n}}" +
                                       "\n" +
                                       "\nexport class {4} extends {2} implements {0}{{" +

                                       "\n}}").format(self.DistinguishedLocalDatasourceComment, self.localSpecificInterface, self.dataSource, self.localDataSourceTask, self.localDataSource)

        self.remoteSpecificInterface = (
            "{0}DistinguishedTask").format(self.remoteDataSource)
        self.remoteDataSourceTask = "DoRemoteTask():void"
        self.DistinguishedRemoteDatasourceComment = (
            "//Please replace [{0}] and [{1}] with your desired interface names and function respectively").format(self.remoteSpecificInterface, self.remoteDataSourceTask)

        self.contentRemoteDataSource = ("\n//Plase import the required interfaces" +
                                        "\n{3}" +
                                        "\ninterface {2}{{" +
                                        "\n  {4} {{}}" +
                                        "\n}}" +

                                        "\nexport class {0} extends {1} implements {2} {{" +
                                        "\n}}").format(
            self.remoteDataSource, self.dataSource, self.remoteSpecificInterface, self.DistinguishedRemoteDatasourceComment, self.remoteDataSourceTask)

        # print(self.contentUsecase)
        # print(self.contentRepository)
        # print(self.contentDataSource)
        # print(self.contentLocalDataSource)
        # print(self.contentRemoteDataSource)


class CleanGenRun(CleanGen):
    def __init__(self):
        super().__init__()
        self.getDomain()
        self.getRepo()
        self.getDataSource()

    def genFile(self, filename):
        try:
            fileDataSource = open(filename, "x")
            fileDataSource.close()
        except:
            print(("gen {0} error ").format(filename))

    def generateEntityFiles(self):
        print(self.f_entity)
        # self.genFile(self.f_entity)

    def generateUsecaseFiles(self):
        self.genFile(self.f_useCase)
        self.genFile(self.f_useCaseImpl)
        print(self.f_useCase)
        print(self.f_useCaseImpl)

    def generateRepoFiles(self):
        self.genFile(self.f_repository)
        self.genFile(self.f_repositoryImpl)
        print(self.f_repository)
        print(self.f_repositoryImpl)

    def generateDataSourceFiles(self):
        self.genFile(self.f_dataSource)
        self.genFile(self.f_localDataSource)
        self.genFile(self.f_remoteDataSource)
        self.genFile(self.f_appModel)

        print(self.f_dataSource)
        print(self.f_localDataSource)
        print(self.f_remoteDataSource)
        print(self.f_appModel)


class CleanGenDebug(CleanGen):
    def __init__(self):
        super().__init__()
        self.getDomain()
        self.getRepo()
        self.getDataSource()

    def generateEntityFiles(self):
        print(self.f_entity)

    def generateUsecaseFiles(self):
        print(self.f_useCase)
        print(self.f_useCaseImpl)

    def generateRepoFiles(self):
        print(self.f_repository)
        print(self.f_repositoryImpl)

    def generateDataSourceFiles(self):
        print(self.f_dataSource)
        print(self.f_localDataSource)
        print(self.f_remoteDataSource)
        print(self.f_appModel)


k = CleanGenRun()
k.generateEntityFiles()
k.generateUsecaseFiles()
k.generateRepoFiles()
k.generateDataSourceFiles()
