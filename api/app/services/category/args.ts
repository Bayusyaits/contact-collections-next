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
  orderBy?: string;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  slug?: string;
}

@ObjectType()
export class Category {
    @Field()
    id: number;
  
    @Field()
    uuid: string;
    
    @Field()
    name: string;
  
    @Field()
    icon: string;
  
    @Field()
    slug: string;
  }
  
// we need to create a temporary class for the abstract, generic class "instance"
@ObjectType()
export class CategoryResponse extends PaginatedResponse(Category) {
  // simple helper for creating new instances easily
  constructor(categoryResponse: CategoryResponse) {
    super();
    Object.assign(this, categoryResponse);
  }

  // you can add more fields here if you need
}
