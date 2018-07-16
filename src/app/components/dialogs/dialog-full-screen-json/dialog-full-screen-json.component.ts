import { Component, Inject, HostListener, InjectionToken } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';

export let injectableJsonString = new InjectionToken<object>('injectableJsonString');

@Component({
    selector: 'mist-dialog-full-screen-json',
    templateUrl: './dialog-full-screen-json.component.html',
    styleUrls: ['./dialog-full-screen-json.component.scss']
})
export class DialogFullScreenJsonComponent {
    data: object;

    @HostListener('document:keydown.escape')
    public onEsc(): void {
        this.dialogRef.hide();
    }

    constructor(
        @Inject(injectableJsonString) data: object,
        public dialogRef: MdlDialogReference
    ) {
        this.data = data;
    }

    public get codeMirrorOptions() {
        return {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: true,
            scrollbarStyle: 'null'
        }
    }

}
