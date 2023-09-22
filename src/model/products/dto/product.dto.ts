import { IsEnum, IsNotEmpty, IsOptional, IsString, IsEmail, IsPhoneNumber, IsArray } from "class-validator";

export class ProductDto {
    @IsString()
    name: string;

    @IsString()
    slug: string;
    
    @IsString()
    description: string;
}