import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    entry_date: string;

    @Column()
    last_name: string;

    @Column()
    first_name: string;

    @Column()
    age: number;

    @Column({ nullable: true })
    banned_date: string;
}
