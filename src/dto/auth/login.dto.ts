import { User } from '../user/user.dto';

export interface LoginResponse {
  data: {
    user: User;
    redirectTo: string;
    access_token: string;
    token_type: string;
    token_expires_at: string;
  };
}
