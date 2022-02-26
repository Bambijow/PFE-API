import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRoleEnum} from "./enums/user-role.enum";
import {UserStatusEnum} from "./enums/user-status.enum";

import * as bcrypt from 'bcrypt';

@Entity()
export class Users {
    constructor(
        user_id: number,
        email: string,
        entry_date: string,
        last_name: string,
        first_name: string,
        age: number,
        salt: string,
        password: string,
        banned_date: string
    ) {
        this.user_id = user_id;
        this.email = email;
        this.entry_date = entry_date;
        this.last_name = last_name;
        this.first_name = first_name;
        this.age = age;
        this.salt = salt;
        this.password = password;
        this.banned_date = banned_date;
    }

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    entry_date: string;

    @Column({
        type: 'enum',
        enum: UserStatusEnum,
        default: UserStatusEnum.STATUS_AUTHORIZED
    })
    status: UserStatusEnum;

    @Column()
    last_name: string;

    @Column()
    first_name: string;

    @Column()
    age: number;

    @Column()
    salt: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    banned_date: string;

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.ROLE_CITIZEN
    })
    role: UserRoleEnum;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash == this.password;
    }

    isSuperAdmin(): boolean {
        return this.role === UserRoleEnum.ROLE_SUPERADMIN;
    }

    isAdmin(): boolean {
        return this.role === UserRoleEnum.ROLE_ADMIN;
    }

    isModerator(): boolean {
        return this.role === UserRoleEnum.ROLE_MODERATOR;
    }

    ban() {
        this.banned_date = `${Date.now()}`;
        this.status = UserStatusEnum.STATUS_BANNED;
    }
}
