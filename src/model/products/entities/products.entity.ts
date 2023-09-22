import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document

@Schema({ timestamps: true })
export class Product extends Document{
    @Prop({
        required:true,
        unique:true
    })
    name: string;

    @Prop({
        required:true,
        unique:true
    })
    slug: string;

    @Prop({
        required:true,
    })
    description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);