import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Book } from "../book/entity";
import { Category } from "../category/entity";
@Entity()
export class BookCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("char", {nullable: true, length: 100})
  uuid: string;

  @Column("char", {nullable: true, length: 100})
  userUuid: string;

  @ManyToOne(() => Book, (book) => book.uuid, {
    cascade: ["insert", "update", "remove", "soft-remove"],
    lazy: true
  })
  @JoinColumn([
    { name: "bookUuid", referencedColumnName: 'uuid' }
  ])
  public bookUuid: Book;
  
  @ManyToOne(() => Category, (category) => category.uuid, {
    cascade: ["insert", "update", "remove", "soft-remove"],
    lazy: true
  })
  @JoinColumn([
    { name: "categoryUuid", referencedColumnName: 'uuid' }
  ])
  public categoryUuid: Category;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
