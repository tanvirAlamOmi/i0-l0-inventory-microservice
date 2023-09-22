import { Body, Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Public } from 'src/common/decorators/metadatas/auth';
import { ProductDto, UpdateDto } from './dto';

@Controller('products')
export class ProductsController {
    
    constructor( private readonly productsService: ProductsService ) {}

    @Public()
    @MessagePattern('getProducts')
    // @UseGuards(RolesGuard)
    // @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    async getAll(): Promise<Product[]> {
        return await this.productsService.findAll(); 
    } 

    @Public()
    @MessagePattern('createProduct')
    create( @Body() productDto: ProductDto ): Promise<Product> {
        return this.productsService.create(productDto);
    }
    
    @Public()
    @MessagePattern('getProduct')
    // @UseGuards(RolesGuard, PermissionsGuard)
    // @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    // @Permissions(PermissionsEnum.MASTER_USER)
    async getById(id: string): Promise<Product> {
        return await this.productsService.findOne(id);
    }


    @Public()
    @MessagePattern('updateProduct')
    // @UseGuards(RolesGuard)
    // @Roles(RolesEnum.ADMIN)
    async update({ id, data }: { id: string, data: UpdateDto }): Promise<ProductDto> {
        return await this.productsService.update(id, data);
    }

    // @Put(':id')
    // async replace(@Param('id') id: string, @Body() userDto: UserDto): Promise<User> {
    //     return await this.service.replace(id, userDto); 
    // }


    @Public()
    @MessagePattern('deleteProduct')
    async delete(id: string): Promise<ProductDto>  {
        return await this.productsService.delete(id);
    }
}
