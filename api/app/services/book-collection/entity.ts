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
import { Collection } from "../collection/entity";
@Entity()
export class BookCollection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("char", {
    nullable: true, 
    length: 100,
    unique: true
  })
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
  
  @ManyToOne(() => Collection, (collection) => collection.uuid, {
    cascade: ["insert", "update", "remove", "soft-remove"],
    lazy: true
  })
  @JoinColumn([
    { name: "collectionUuid", referencedColumnName: 'uuid' }
  ])
  public collectionUuid: Collection;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
