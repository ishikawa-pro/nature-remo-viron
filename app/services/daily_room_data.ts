import dayjs from 'dayjs';
import { context } from '../context';
import { DailyRoomData } from '../entities/daily_room_data';

export const findByDate = async (date: Date) => {
  const repository = context.getDBRrepository(DailyRoomData);
  return await repository
    .createQueryBuilder('daily_room_data')
    .where('daily_room_data.createdAt >= :startDate', {
      startDate: dayjs(date).startOf('date'),
    })
    .andWhere('daily_room_data.createdAt <= :endDate', {
      endDate: dayjs(date).endOf('date'),
    })
    .getOne();
};

export const createEvent = async () => {
  const devices = await context.natureRemo._1devicesGet();
  const event = devices.body[0].newestEvents;
  const repository = context.getDBRrepository(DailyRoomData);
  const todayData = await repository
    .createQueryBuilder('daily_room_data')
    .where('daily_room_data.createdAt >= :startDate', {
      startDate: dayjs().startOf('date'),
    })
    .andWhere('daily_room_data.createdAt <= :endDate', {
      endDate: dayjs().endOf('date'),
    })
    .getOne();
  if (todayData) {
    const newData: DailyRoomData = {
      ...todayData,
      data: [
        ...todayData.data,
        {
          temperature: event?.te,
          humidity: event?.hu,
          illumination: event?.il,
        },
      ],
      updatedAt: new Date(),
    };
    await repository
      .createQueryBuilder()
      .update()
      .where('id = :id', { id: todayData.id })
      .set(newData)
      .execute();
  } else {
    const newData = new DailyRoomData();
    newData.data = [
      {
        temperature: event?.te,
        humidity: event?.hu,
        illumination: event?.il,
      },
    ];
    newData.createdAt = new Date();
    newData.updatedAt = new Date();
    await repository.save(newData);
  }
};
