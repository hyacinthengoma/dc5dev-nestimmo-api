import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  // importer repositroy and categoryEntiry
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(createcategoryDto: CreateCategoryDto) {
    console.log(createcategoryDto);
    try {
      const category = this.categoryRepository.create(createcategoryDto);
      return this.categoryRepository.save(category);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this.categoryRepository.createQueryBuilder('category').getMany();
  }

  findOne(id: number) {
    try {
      return this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .getOne();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updatecategoryDto: UpdateCategoryDto) {
    try {
      return this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .update(updatecategoryDto)
        .execute()
        .then((result) => {
          return result;
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: number) {
    try {
      return this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .delete()
        .execute();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
