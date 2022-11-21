import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { EventEntity } from '@domain/entities/events/eventEntity'
import { InputCreateEventDto, OutputCreateEventDto } from '@business/dto/events/eventsDto'
import { EventCreationFailed, InvalidEventDate } from '@business/module/errors/events/event'
import { IEventRepository, IEventRepositoryToken } from '@business/repositories/events/iEventRepository'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { userNotFound } from '@business/module/errors/users/user'
import { HandleDate } from '../handle/handleDate'
import { left, right } from '@shared/either'

@injectable()
export class CreateEventUseCase implements IUseCase<InputCreateEventDto, OutputCreateEventDto> {
  public constructor(
    @inject(IEventRepositoryToken) private eventRepository: IEventRepository,
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputCreateEventDto): Promise<OutputCreateEventDto> {
    const handleDate = new HandleDate()
    const eventDateIsValid = handleDate.eventDateIsValid(input.initialDate, input.finalDate)
    const userResult = await this.userRepository.findUserById(input.iduser)

    if (!userResult) {
      return left(userNotFound)
    }

    const eventResult = EventEntity.create({
      title: input.title,
      description: input.description,
      initialDate: input.initialDate,
      finalDate: input.finalDate,
      place: input.place,
      iduser: input.iduser,
    })

    console.log('is valid? ', eventDateIsValid)

    if (!eventDateIsValid) {
      return left(InvalidEventDate)
    }

    if (eventResult.isLeft()) {
      return left(EventCreationFailed)
    }

    try {
      const event = await this.eventRepository.create(eventResult.value.export())

      return right(event)
    } catch (error) {
      console.log('CreateEventUseCase::error => ', error)

      return left(EventCreationFailed)
    }
  }
}
