export const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_SECRET;

export interface jwtEncoded {
    _id?: string,
    email: string,
    first_name: string,
    last_name: string,
    role: string,
}

export interface jwtDecoded {
    _id: string,
    email: string,
    first_name: string,
    last_name: string,
    role: string,
    iat: number,
    exp: number,
}