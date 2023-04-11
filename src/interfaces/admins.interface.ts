// admin interfaces - where we definr all the interfaces for admins

export default interface admin {
    user: any;
    token: any;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'superadmins';
    active: boolean;
}
