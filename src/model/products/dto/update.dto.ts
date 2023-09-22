import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDto {
    @IsOptional()
    name: string;

    @IsOptional()
    slug: string;
    
    @IsOptional()
    description: string;
}