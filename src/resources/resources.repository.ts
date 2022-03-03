import {Resources} from "./resources.entity";
import {EntityRepository, Repository} from "typeorm";
import {CreateResourceDto} from "./dto/create-resource.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {GetResourceDto} from "./dto/get-resources.dto";

@EntityRepository(Resources)
export class ResourcesRepository extends Repository<Resources> {

    async getResources(getResourceDto: GetResourceDto): Promise<Resources[]> {
        const { id } = getResourceDto;
        const query = this.createQueryBuilder('resources');

        if(id) query.andWhere('resources.id = :id', { id });
        query.relation('poster')
        try {
            console.log(await query.getMany())
            return await query.getMany();
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }

    async createResource(createResourceDto: CreateResourceDto): Promise<Resources> {
        const { title, content, filesPath, categories, poster } = createResourceDto;
        const resource = this.create({
            title,
            content,
            filesPath,
            categories,
            date: `${Date.now()}`,
            active: false,
            views: 0,
            _: poster
        });
        try {
            await this.save(resource);
            return resource;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
