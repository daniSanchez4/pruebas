export class User {
    id: number | undefined
    name: string
    surname: string
    email: string
    role: string

    constructor(
        id: number | undefined,
        name: string,
        surname: string,
        email: string,
        role: string
    ) {
        this.id = id
        this.name = name
        this.surname = surname
        this.email = email
        this.role = role
    }
}