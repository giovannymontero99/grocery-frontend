export interface User {
    Name: string;
    Email?: string;
    FullName?: string;
    Password: string;
}

export interface UserRs {
    id?: number,
    name?: string,
    email?: string,
    numberPhone?: string | null,
    password?: string | null,
    fullName?: string
}