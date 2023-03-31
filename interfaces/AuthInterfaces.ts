import { IncomingHttpHeaders } from 'http';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/UserModel';
export interface Decoded {
  id: string | JwtPayload;
}
export interface DevelopedRequest extends Request {
  user?: any;
  cookies: Record<string, any>;
  headers: Headers;
}
