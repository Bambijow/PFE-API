import {Categories} from "./categories.entity";
import {EntityRepository, Repository} from "typeorm";
import {GetCategoriesDto} from "./dto/get-categories.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {CreateCategoryDto} from "./dto/create-category.dto";

@EntityRepository(Categories)
export class CategoriesRepository extends Repository<Categories> {
    async getCategories(getCategoriesDto: GetCategoriesDto): Promise<Categories[]> {
        const { id } = getCategoriesDto;
        const query = this.createQueryBuilder('categories');

        if(id) query.andWhere('categories.id = :id', { id });

        try {
            return await query.getMany();
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Categories> {
        const { name } = createCategoryDto;
        const category = this.create({
            name
        });

        try {
            await this.save(category);
            return category;
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }
}
