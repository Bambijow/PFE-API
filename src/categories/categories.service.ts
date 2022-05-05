import {Injectable, NotFoundException} from '@nestjs/common';
import {GetCategoriesDto} from "./dto/get-categories.dto";
import {CategoriesRepository} from "./categories.repository";
import {Categories} from "./categories.entity";
import {CreateCategoryDto} from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {

    constructor(private categoriesRepository: CategoriesRepository) {}

    getCategories(getCategoriesDto: GetCategoriesDto): Promise<Categories[]> {
        return this.categoriesRepository.getCategories(getCategoriesDto);
    }

    createCategory(createCategoryDto: CreateCategoryDto): Promise<Categories> {
        return this.categoriesRepository.createCategory(createCategoryDto);
    }

    async deleteCategory(id: string) {
        const result = await this.categoriesRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException();
    }
}
