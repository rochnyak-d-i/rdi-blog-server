import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  mime: string;

  @Column({default: ''})
  path: string;

  @Column({default: 'unknown'})
  name: string;

  @Column({nullable: true})
  size: number;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  created: Date;
}
