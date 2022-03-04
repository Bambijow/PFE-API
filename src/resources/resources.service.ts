import { Injectable } from '@nestjs/common';
import {CreateResourceDto} from "./dto/create-resource.dto";
import {ResourcesRepository} from "./resources.repository";
import {Resources} from "./resources.entity";
import {GetResourceDto} from "./dto/get-resources.dto";
import {Users} from "../users/users.entity";

@Injectable()
export class ResourcesService {

    constructor(private resourcesRepository: ResourcesRepository) {}

    getResources(getResourceDto: GetResourceDto): Promise<Resources[]> {
        return this.resourcesRepository.getResources(getResourceDto);
    }

    createResource(createResourceDto: CreateResourceDto, user: Users): Promise<Resources> {
        return this.resourcesRepository.createResource(createResourceDto, user);
    }
}
