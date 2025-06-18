export interface AuthResponse {
    status: string;
    message: string;
    result:{
        token:string;
        username:string;
    }
}
