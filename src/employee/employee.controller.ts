import { Controller, Get, Post, Body, Patch, Param, Delete, Query ,Ip} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from '@prisma/client'
import { MyLoggerService } from 'src/my_logger/my_logger.service';


@Controller('employee')
export class EmployeeController {
  private readonly logger = new MyLoggerService(EmployeeController.name)
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Ip() ip:string, @Query('role') role: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    this.logger.log(`Request Ip\t $ {ip}`)
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
