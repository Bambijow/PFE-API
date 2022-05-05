import { Users } from "src/users/users.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Resources} from "../resources/resources.entity";

@Entity()
export class Likes {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.likes)
    user: Users;


    @ManyToOne(() => Resources, (resource) => resource.commentaries,
        {
            onDelete: 'CASCADE',
        })
    resource: Resources

    

    @Column()
    positive: boolean;

    
}
