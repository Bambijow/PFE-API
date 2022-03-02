import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
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

    @Column()
    poster: number;

    @OneToMany(() => Commentaries, (commentary) => commentary.resource,
        {
            onDelete: 'CASCADE',
        })
    commentaries: Commentaries[];
}
