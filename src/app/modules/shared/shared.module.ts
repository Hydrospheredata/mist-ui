import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CodemirrorModule } from 'ng2-codemirror';
import { ClipboardModule } from 'ngx-clipboard';
import {
    AgoDatePipe,
    JobIdCutPipe,
    JobStatusFilterPipe,
    ReplaceToBrNewLineCharPipe,
    SearchPipe,
    SortByPipe,
    TimeTransfromPipe
} from '@app/modules/shared/pipes';
import { InputTextComponent, PaginationComponent, FilterComponent, InputTextareaComponent } from '@app/modules/shared/components';

const Pipes = [
    AgoDatePipe,
    JobIdCutPipe,
    JobStatusFilterPipe,
    ReplaceToBrNewLineCharPipe,
    SearchPipe,
    SortByPipe,
    TimeTransfromPipe,
]

const Components = [
    InputTextComponent,
    PaginationComponent,
    FilterComponent,
    InputTextareaComponent
]

const Modules = [
    CodemirrorModule,
    FlexLayoutModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    MdlSelectModule,
]

@NgModule({
    declarations: [...Pipes, ...Components],
    imports: [
        CommonModule,
        MdlModule,
        FormsModule,
        ...Modules
    ],
    exports: [...Pipes, ...Components, ...Modules],
    providers: [],
})
export class SharedModule { }
