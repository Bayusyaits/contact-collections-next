import PaginatedResponse from '../../helpers/paginated-response';
import { Field, ArgsType, ObjectType } from 'type-graphql';
@ArgsType()
export default class Args {
  @Field({ defaultValue: 10 })
  limit: number;

  @Field({ defaultValue: 0 })
  offset: number;

  @Field({ nullable: true })
  uuid?: string;

  @Field({ nullable: true })
  sortBy?: string;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  userUuid?: string;
}

export class BookCollection {
    @Field()
    id: number;
  
    @Field()
    bookUuid: string;
  
    @Field()
    uuid: string;
  
    @Field()
    userUuid: string;
  }
  
@ObjectType()
export class BookCollectionResponse extends PaginatedResponse(BookCollection) {
  constructor(bookBookCollectionResponse: BookCollectionResponse) {
    super();
    Object.assign(this, bookBookCollectionResponse);
  }
}
