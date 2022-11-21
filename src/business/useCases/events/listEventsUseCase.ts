import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { failureOnGetUsers } from '@business/module/errors/users/user'
import { left, right } from '@shared/either'
import { InputListEventsDto, OutputListEventsDto } from '@business/dto/events/eventsDto'
import { IEventRepository, IEventRepositoryToken } from '@business/repositories/events/iEventRepository'

@injectable()
export class ListEventsUseCase implements IUseCase<InputListEventsDto, OutputListEventsDto> {
  public constructor(@inject(IEventRepositoryToken) private eventRepository: IEventRepository) {}

  async exec(input: InputListEventsDto): Promise<OutputListEventsDto> {
    try {
      const user = await this.eventRepository.list(input)
      console.log('ListUsersUseCase::input => ', input)

      return right(user)
    } catch (error) {
      console.log('ListUsersUseCase::error => ', error)
      return left(failureOnGetUsers)
    }
  }
}
