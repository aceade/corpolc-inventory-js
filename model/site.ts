import { SecurityLevel } from "./securityLevel";

export interface Site {
    id: number;
    country: string;
    region: string;
    address: string;
    security_level: SecurityLevel;
}
