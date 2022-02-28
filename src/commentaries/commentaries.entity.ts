import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Resources} from "../resources/resources.entity";

@Entity()
export class Commentaries {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    poster: number;

    @ManyToOne(() => Resources, (resource) => resource.commentaries,
        {
            onDelete: 'CASCADE',
        })
    resource: Resources
}
