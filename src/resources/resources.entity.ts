import { Users } from "src/users/users.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Commentaries} from "../commentaries/commentaries.entity";

@Entity()
export class Resources {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('longtext')
    content: string;

    @Column()
    date: string;

    @Column('longtext',  { nullable: true })
    filesPath: string[];

    @Column('longtext')
    categories: string[];

    @Column()
    active: boolean;

    @Column()
    views: number;

    @ManyToOne(() => Users, (user) => user.user_id, {onDelete: "CASCADE"})
    _: Users;

    @OneToMany(() => Commentaries, (commentary) => commentary.resource,
        {
            onDelete: 'CASCADE',
        })
    commentaries: Commentaries[];

    isActive(): boolean {
        return this.active;
    }
}
