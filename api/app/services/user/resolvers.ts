import { v4 } from "uuid";
const crypto = require('crypto')
import { User as UserEntity } from "./entity";
import { AppDataSource } from "../../data-source"
import { setSpaceToDash, generateKey } from "../../helpers/mixins";
import slugify from '../../helpers/slugify'

const hashPassword = (password: string) => {
  return crypto.createHash('sha256').update(password).digest('hex')
}
// Provide resolver functions for your schema fields
export const Query = {
    getUser: async (_: any, args: any) => {
      const userEntity = AppDataSource.getRepository(UserEntity)
      const { userName } = args;
      return await userEntity.findOne({ where: { userName: userName } });
    }
}

export const Mutation = {
  addUser: async (_: any, args: any) => {
    try {
      const { payload: {
          firstName, lastName, birthdayDate, password
        } 
      } = args;
      const user = new UserEntity()
      user.firstName = firstName
      user.lastName = lastName
      user.birthdayDate = birthdayDate
      user.password = hashPassword(password)
      user.uuid = v4()
      const name = slugify(`${firstName}${lastName}`)
      user.userName = name ? `${setSpaceToDash(name, '_')}_${Math.floor(generateKey(100))}` : 
      `${firstName}_${generateKey()}`
      const userRepository = AppDataSource.getRepository(UserEntity)
      return await userRepository.save(user);
    } catch (error) {
      return {};
    }
  },
  editUser: async (_: any, args: any) => {
    try {
      const { payload: {
          firstName, 
          lastName, 
          birthdayDate, 
          userName, 
          uuid
        } 
      } = args;
      const userEntity = AppDataSource.getRepository(UserEntity)
      const user = await userEntity.findOneBy({
        userName: userName,
        uuid: uuid
      })
      if (!user || !userName || userName.length == 0) {
        return {};
      }
      if (firstName) {
        user.firstName = firstName
      }
      if (lastName) {
        user.lastName = lastName
      }
      if (birthdayDate) {
        user.birthdayDate = birthdayDate
      }
      return await userEntity.save(user);
    } catch (error) {
      return {};
    }
  },
  deleteUser: async (_: any, args: any) => {
    try {
      const { uuid } = args;
      const userEntity = AppDataSource.getRepository(UserEntity)
      const user = await userEntity.findOneBy({
        uuid: uuid,
      })
      if (!user || !uuid || uuid.length == 0) {
        return false;
      }
      user.softRemove()
      await userEntity.save(user)
      return true;
    } catch (error) {
      return false;
    }
  }
}
