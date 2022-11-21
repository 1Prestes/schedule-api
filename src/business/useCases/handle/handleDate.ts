import dayjs from 'dayjs'

export class HandleDate {
  public eventDateIsValid(initialDate: Date, finalDate: Date): boolean {
    console.log('HandleDate::eventDateIsValid => ', initialDate, finalDate)
    console.log(
      'HandleDate::eventDateIsValid => ',
      dayjs().isBefore(initialDate) && dayjs(initialDate).isBefore(finalDate)
    )

    return dayjs().isBefore(initialDate) && dayjs(initialDate).isBefore(finalDate)
  }
}
