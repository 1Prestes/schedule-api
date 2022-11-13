import { ContainerModule, interfaces } from 'inversify'

export const ServicesModule = new ContainerModule((bind: interfaces.Bind) => {
  // bind<IService>(IServiceToken).to(Service)
})
