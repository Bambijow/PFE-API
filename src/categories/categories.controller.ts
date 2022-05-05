import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {GetCategoriesDto} from "./dto/get-categories.dto";
import {Categories} from "./categories.entity";
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {}

    @Get()
    getCategories(@Query() getCategoriesDto: GetCategoriesDto): Promise<Categories[]> {
        return this.categoriesService.getCategories(getCategoriesDto);
    }

    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Categories> {
        return this.categoriesService.createCategory(createCategoryDto);
    }
    @Delete('/:id')
    deleteCategory(@Param('id') id: string) {
        return this.categoriesService.deleteCategory(id);
    }
}
