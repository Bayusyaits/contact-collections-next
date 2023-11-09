import { 
  Entity, 
  PrimaryColumn, 
  Column, 
  Generated,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn("char", {length: 100})
  @Generated("uuid")
  uuid: string

  @Column("char", { length: 50 })
  name: string;

  @Column("char", {
    length: 100,
    default: null
  })
  icon: string;

  @Column("char", { length: 60 })
  slug: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
