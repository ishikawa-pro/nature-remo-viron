import { context } from '../app/context';
import { createEvent } from '../app/services/daily_room_data';

(async () => {
  console.log('start batch: get-room-events');
  try {
    await context.init();
    await createEvent();
  } catch(err) {
    console.log(err);
    console.log('failure batch: get-room-events');
    process.exit(-1);
  }
  console.log('scucess batch: get-room-events');
  process.exit(0);
})()