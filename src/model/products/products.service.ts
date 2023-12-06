import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { UpdateDto, ProductDto } from './dto';
import { Product, ProductDocument } from './entities';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
        // @Inject('KAFKA_SERVICE') private readonly client: ClientKafka
    ){}
    async findAll(): Promise<Product[]> {
        return await this.model.find().exec(); 
    }

    async create(productDto: ProductDto): Promise<Product> {
        return (await new this.model({
          ...productDto,
          createdAt: new Date(),
        }).save()).toJSON();
    }

    async findOne(id: string): Promise<Product> {
        let product = await this.model.findById(id).exec();
        if(!product) throw new NotFoundException('could not find the product.')
        return product.toJSON();
    }

    async findByProductname(productName: string): Promise<Product> {
        const product = await this.model.findOne({productName}).exec();
        if(!product) throw new NotFoundException('could not find the product.')
        return product.toJSON();
    }

    async findByQuery (query: object) : Promise<Product | undefined> {
        
        let product = await this.model.findOne(query);
        if(!product) throw new NotFoundException('could not find the product.')
        return product.toJSON();
    }

    async update(id: string, updateDto: Partial<UpdateDto>): Promise<ProductDto> {
        let product = await this.model.findOneAndUpdate({_id: id}, {$set: updateDto}, {new: true}).exec();
        if(!product) throw new NotFoundException('could not find the product.')
        return product.toJSON();
    }

    async delete(id: string): Promise<ProductDto> {
        let product = await this.model.findByIdAndDelete(id).exec();
        if(!product) throw new NotFoundException('could not find the product.')
        return product.toJSON();
    }

}
