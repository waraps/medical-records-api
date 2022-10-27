import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TestDto } from './dto';
import { TestService } from './test.service';

@UseGuards(JwtGuard)
@Controller('tests')
export class TestController {
    constructor(private testService: TestService) {}

    @Post()
    createTest(@Body() new_test: TestDto) {
        return this.testService.createTest(new_test);
    }

    @Get()
    getTests() {
        return this.testService.getTests();
    }

    @Get(':id')
    getTestById(@Param('id', ParseIntPipe) test_id: number) {
        return this.testService.getTestById(test_id);
    }

    @Put(':id')
    editTestById(@Param('id', ParseIntPipe) test_id: number, @Body() new_test: TestDto) {
        return this.testService.editTestById(test_id, new_test);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteTestById(@Param('id', ParseIntPipe) test_id: number) {
        return this.testService.deleteTestById(test_id);
    }
}
