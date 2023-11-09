import PaginatedResponse from '../../helpers/paginated-response';
import { Field, ArgsType, ObjectType } from 'type-graphql';
@ArgsType()
export default class Args {
  @Field({ defaultValue: 10 })
  limit: number;

  @Field({ defaultValue: 0 })
  offset: number;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  sortBy?: string;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  slug?: string;
}

export class Collection {  
    @Field()
    uuid: string;
    
    @Field()
    name: string;
  
    @Field()
    type: string;
  
    @Field()
    image: string;
  
    @Field()
    slug: string;
  }
  
@ObjectType()
export class CollectionResponse extends PaginatedResponse(Collection) {
  constructor(collectionResponse: CollectionResponse) {
    super();
    Object.assign(this, collectionResponse);
  }
}
