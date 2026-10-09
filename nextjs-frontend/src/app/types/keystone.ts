export type UserAccess = 'seller';

export interface UserInformation {
    id: string
    email: string
    name: string
    access: UserAccess[]
}