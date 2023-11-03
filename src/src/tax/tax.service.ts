import { Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';

import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TaxService {
  constructor(private prisma: PrismaService) {}
  async create(createTaxDto: CreateTaxDto) {
    const { income, location, gender, age } = createTaxDto;

    let tax = 0;
    let taxable = 0;
    let taxfree = 0;
    let canTax = false;
    if (gender == 'male') {
      if (age > 65) {
        taxfree = 400000;
      } else {
        taxfree = 350000;
      }
    } else {
      taxfree = 400000;
    }

    if (income <= taxfree) {
      tax = 0;
    } else {
      taxable = income - taxfree;
      canTax = true;
    }

    if (taxable >= 100000) {
      taxable = taxable - 100000;
      tax += 100000 * 0.05;

      if (taxable >= 300000) {
        taxable = taxable - 300000;
        tax += 300000 * 0.1;

        if (taxable >= 400000) {
          taxable = taxable - 400000;
          tax += 400000 * 0.15;

          if (taxable >= 500000) {
            taxable = taxable - 500000;
            tax += 500000 * 0.2;

            if (taxable > 0) {
              tax += taxable * 0.25;
            } else {
              tax += 0;
            }
          } else {
            tax += taxable * 0.2;
          }
        } else {
          tax += taxable * 0.15;
        }
      } else {
        tax += taxable * 0.1;
      }
    } else {
      tax += taxable * 0.05;
    }

    if (location == 'Dhaka' || location == 'Chattogram') {
      if (tax < 5000 && canTax) {
        tax = 5000;
      }
    }

    if (location == 'City Corporation') {
      if (tax < 4000 && canTax) {
        tax = 4000;
      }
    }

    if (location == 'Non-city Corporation') {
      if (tax < 3000 && canTax) {
        tax = 3000;
      }
    }

    try {
      const resp = await this.prisma.tax.create({
        data: { ...createTaxDto, tax },
      });

      return resp;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async findOne(id: string) {
    try {
      const rest = await this.prisma.tax.findMany({
        where: {
          userId: id,
        },
      });

      return rest;
    } catch (e) {
      return e;
    }
  }
}
