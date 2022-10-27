import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditRecordDto, RecordDto } from './dto';
import { RecordService } from './record.service';

@UseGuards(JwtGuard)
@Controller('records')
export class RecordController {
    constructor(private recordService: RecordService) {}

    @Post()
    createRecord(@GetUser('id') user_id: number, @Body() record: RecordDto) {
        return this.recordService.createRecord(user_id, record);
    }

    @Get()
    getRecords() {
        return this.recordService.getRecords();
    }

    @Get(':id')
    getRecordById(@Param('id', ParseIntPipe) record_id: number) {
        return this.recordService.getRecordById(record_id);
    }

    @Get('patient/:id')
    getRecordsByPatientId(@Param('id', ParseIntPipe) patient_id: number) {
        return this.recordService.getRecordsByPatientId(patient_id);
    }

    @Put(':id')
    editRecordById(@Param('id', ParseIntPipe) record_id: number, @Body() update_record: EditRecordDto) {
        return this.recordService.editRecordById(record_id, update_record);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteRecordById(@Param('id', ParseIntPipe) record_id: number) {
        return this.recordService.deleteRecordById(record_id);
    }
}
