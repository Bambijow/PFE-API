import { Resources } from "./resources.entity";
import { EntityRepository, Repository, UpdateResult } from "typeorm";
import { CreateResourceDto } from "./dto/create-resource.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { GetResourceDto } from "./dto/get-resources.dto";
import { Users } from "../users/users.entity";
import { editResourceDto } from "./dto/edit-resource.dto";

@EntityRepository(Resources)
export class ResourcesRepository extends Repository<Resources> {

    async getResources(getResourceDto: GetResourceDto): Promise<Resources[]> {
        const { id, active, title } = getResourceDto;
        const query = this.createQueryBuilder('resources');
        const activeParam = Number.parseInt(active);

        if (id) query.andWhere('resources.id = :id', { id });
        if (activeParam) query.andWhere('resources.active = :active', { active: activeParam > 0 });
        if (title) query.andWhere('LOWER(resources.title) LIKE :title', { title: `%${title.toLowerCase()}%` });

        query.loadAllRelationIds({ relations: ['_'] });
        try {
            return await query.getMany();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async createResource(createResourceDto: CreateResourceDto, user: Users): Promise<Resources> {
        const { title, content, filesPath, categories } = createResourceDto;
        const resource = this.create({
            title,
            content,
            filesPath,
            categories,
            date: `${Date.now()}`,
            active: false,
            views: 0,
            _: user
        });
        try {
            await this.save(resource);
            return resource;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async editResource(resource: editResourceDto): Promise<UpdateResult> {
        const query = this.createQueryBuilder("resources").update();
        if (resource.filesPath) {
            query.set({ title: resource.title, content: resource.content, date: `${Date.now()}`, filesPath: resource.filesPath })
        } else {
            query.set({ title: resource.title, content: resource.content, date: `${Date.now()}` })
        }
        query.where("id = :id", { id: resource.id })
        return query.execute();
    }


}
