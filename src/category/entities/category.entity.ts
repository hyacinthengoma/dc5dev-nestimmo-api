import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../post/entities/post.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @OneToMany(() => PostEntity, (post) => post.category)
  posts: PostEntity[];
}
