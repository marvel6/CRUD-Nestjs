import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            role: "INTERN"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "INTERN"
        },
        {
            id: 3,
            name: "Emily Johnson",
            email: "emily.johnson@example.com",
            role: "ENGINEER"
        },
        {
            id: 4,
            name: "Michael Brown",
            email: "michael.brown@example.com",
            role: "ENGINEER"
        },
        {
            id: 5,
            name: "Sarah Davis",
            email: "sarah.davis@example.com",
            role: "ADMIN"
        }
    ];

    findAll(role?: "ADMIN" | "ENGINEER" | "INTERN") {

        if (role) {

            return this.users.filter(user => user.role === role)
        }

        return this.users
    }

    findOne(id: number) {

        const user = this.users.find(user => user.id === id)

        if(!user) throw new NotFoundException('user not found')

        return user
    }

    createUser(user: { name: string, email: string, role: "ADMIN" | "ENGINEER" | "INTERN" }) {

        const sortByHighestId = [...this.users].sort((a, b) => b.id - a.id)

        const newUsers = {
            id: sortByHighestId[0].id + 1,
            ...user
        }

        this.users.push(newUsers)

        return this.users

    }

    updateUser(id: number, updateUser: { name?: string, email?: string, role?: "ADMIN" | "ENGINEER" | "INTERN" }) {

        this.users = this.users.map(user => {

            if (user.id === id) {

                return { ...user, ...updateUser }

            }

            return user
        })

        return this.findOne(id)

    }

    Delete(id: number) {

        const users = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return users

    }
}
