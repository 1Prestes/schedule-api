import dayjs from 'dayjs'

export class HandleDate {
  public eventDateIsValid(initialDate: Date, finalDate: Date): boolean {
    console.log('HandleDate::eventDateIsValid => ', initialDate, finalDate)
    console.log(
      'HandleDate::eventDateIsValid => ',
      dayjs().subtract(3, 'hours').isBefore(initialDate) && dayjs(initialDate).isBefore(finalDate)
    )

    return dayjs().subtract(3, 'hours').isBefore(initialDate) && dayjs(initialDate).isBefore(finalDate)
  }
}
