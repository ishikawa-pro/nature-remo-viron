import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DailyRoomData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ type: 'simple-json' })
  data: {
    temperature?: {
      val?: number;
      createdAt?: Date;
    };
    humidity?: {
      val?: number;
      createdAt?: Date;
    };
    illumination?: {
      val?: number;
      createdAt?: Date;
    };
  }[];
}
