import Jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}
const DEFALUT_SING_OPTION: SignOption = { expiresIn: "1h" };

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFALUT_SING_OPTION
) {
  const secret_key = process.env.JWT_ACCESS_TOKEN_SECRET;
  const token = Jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.JWT_ACCESS_TOKEN_SECRET;
    const payload = Jwt.verify(token, secret_key!);
    return payload as JwtPayload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
