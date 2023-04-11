// user interface - where we define all the interfaces for Users

export default interface User {
    name: string;
    email: string;
    password: string;
    number: string;
    gender?: 'male' | 'female' | 'other';
    role: 'User';
    address?: string;
    city?: string;
    country?: string;
    photo?: string;
    
}