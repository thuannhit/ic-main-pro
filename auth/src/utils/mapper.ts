import { UserSimpleInfoResDTO } from 'src/dtos/user-simple-info-response.dto';
import { UserEssentialInfoDTO } from '../dtos/user-esstential-info.dto';
import { UserSimpleInfoDTO } from '../dtos/user-simple-info.dto'

export const toSimpleUserDto = (data: UserEssentialInfoDTO | UserSimpleInfoDTO): UserSimpleInfoDTO => {
    const { _id, email, user_name, _role_id } = data;

    let userLoginDto: UserSimpleInfoDTO = {
        _id,
        email,
        user_name,
        _role_id
    };

    return userLoginDto;
};
