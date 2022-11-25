import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputFindEventDto, OutputFindEventDto } from '@business/dto/events/eventsDto'
import { IEventRepository, IEventRepositoryToken } from '@business/repositories/events/iEventRepository'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { EventNotFound, FailureOnGetEvent } from '@business/module/errors/events/event'
import { userNotFound } from '@business/module/errors/users/user'
import { left, right } from '@shared/either'

@injectable()
export class FindEventUseCase implements IUseCase<InputFindEventDto, OutputFindEventDto> {
  public constructor(
    @inject(IEventRepositoryToken) private eventRepository: IEventRepository,
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputFindEventDto): Promise<OutputFindEventDto> {
    try {
      const userResponse = await this.userRepository.findUserById(input.iduser)

      if (!userResponse) {
        return left(userNotFound)
      }

      const eventResponse = await this.eventRepository.findEventById(input)

      if (!eventResponse) {
        return left(EventNotFound)
      }

      return right(eventResponse)
    } catch (error) {
      return left(FailureOnGetEvent)
    }
  }
}
