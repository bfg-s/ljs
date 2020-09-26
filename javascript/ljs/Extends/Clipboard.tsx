import {Helper} from "../../Helper";

/**
 * Work with Clipboard
 */
export class Clipboard {

    /**
     * HTML Textarea element
     * @private
     */
    private text_area: HTMLElement|any;

    /**
     * Create HTML Textarea element
     * @param text
     */
    create_text_area(text: string) {

        this.text_area = document.createElement('textArea');
        this.text_area.value = text;
        document.body.appendChild(this.text_area);
    }

    /**
     * Select text in HTML Textarea element
     */
    select_text() {
        if (Helper.isIos()) {

            // let range: Range,
            //     selection: Selection|any;
            //
            // range = document.createRange();
            // range.selectNodeContents(this.text_area);
            // selection = window.getSelection();
            // selection.removeAllRanges();
            // selection.addRange(range);
            // this.text_area.setSelectionRange(0, 999999);

            let editable = this.text_area.contentEditable,
                readOnly = this.text_area.readOnly,
                range: Range = document.createRange(),
                sel: Selection|any = window.getSelection();

            this.text_area.contentEditable = 'true';
            this.text_area.readOnly = 'false';
            range.selectNodeContents(this.text_area);
            sel.removeAllRanges();
            sel.addRange(range);
            this.text_area.setSelectionRange(0, 999999);
            this.text_area.contentEditable = editable;
            this.text_area.readOnly = readOnly;
        } else {

            this.text_area.select();
        }
    }

    /**
     * Execute copy with selected text
     */
    copy_to_clipboard() {

        document.execCommand('copy');
        document.body.removeChild(this.text_area);
    }

    /**
     * Run copy process
     * @param text
     */
    static copy (text: string) {

        try {
            let clipboard = new Clipboard();
            clipboard.create_text_area(text);
            clipboard.select_text();
            clipboard.copy_to_clipboard();
            return true;
        } catch (e) {
            return false;
        }
    }
}