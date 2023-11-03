import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dto/create-tax.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxService.create(createTaxDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxService.findOne(id);
  }
}
