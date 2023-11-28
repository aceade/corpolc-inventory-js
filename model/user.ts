import { BinaryLike } from "crypto";

export interface User {
    id: number;
    username: string;
    hashed_password: NodeJS.ArrayBufferView;
    salt: BinaryLike;
    name: string;
    email: string;
    email_verified: string;
    enabled: boolean;
}