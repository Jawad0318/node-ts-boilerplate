
/// auth interfaces - where we define all the interface for auth

export default interface Auth{
    email: string;
    password: string;
}

export interface ChangePassword{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}