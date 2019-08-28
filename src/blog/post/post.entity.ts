import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  title: string;

  @Column({default: ''})
  description: string;

  @Column({type: 'text', default: ''})
  text: string;

  @Column(
    'timestamp with time zone', {
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP'
    }
  )
  created: Date;

  @Column({
    type: 'text',
    array: true,
    nullable: false,
    default: '{}'
  })
  tags: string[];
}
