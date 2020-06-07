import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '@modules/shared/match.decorator';

/**
 * Data transfer object for creating a user
 */
export class CreateUserDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @Match('password', {
    message: 'Passwords do not match',
  })
  confirm_password: string;
}
