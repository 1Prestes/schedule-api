import { RepositoryModule } from './repositoryModule'
import { OperatorModule } from './operatorModule'
import { ModelsModule } from './modelsModule'
import { UseCasesModule } from './useCasesModule'
// import { ServicesModule } from './servicesModule'
import { sequelize } from '@framework/utility/database'
import { container } from '@shared/ioc/container'

container.bind('sequelize').toConstantValue(sequelize)
container.load(ModelsModule)
container.load(RepositoryModule)
container.load(UseCasesModule)
container.load(OperatorModule)
// container.load(ServicesModule)
