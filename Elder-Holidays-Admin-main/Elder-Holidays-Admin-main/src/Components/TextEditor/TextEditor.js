import React, { useEffect, useState } from 'react';
import RichTextEditor from 'react-rte';
import './TextEditor.css';

const TextEditor = ({ description, setDescription }) => {

    const [editorState, setEditorState] = useState(RichTextEditor.createEmptyValue());

    const toolbarConfig = {
        display: [
            'INLINE_STYLE_BUTTONS',
            'BLOCK_TYPE_BUTTONS',
            'LINK_BUTTONS',
            "BLOCK_ALIGNMENT_BUTTONS",
            'BLOCK_TYPE_DROPDOWN',
            'HISTORY_BUTTONS'
        ],
        INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'Underline', style: 'UNDERLINE' }
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: 'Normal', style: 'unstyled' },
            { label: 'H1', style: 'header-one' },
            { label: 'H2', style: 'header-two' },
            { label: 'H3', style: 'header-three' },
            { label: 'H4', style: 'header-four' },
            { label: 'H5', style: 'header-five' },
            { label: 'H6', style: 'header-six' },
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: 'UL', style: 'unordered-list-item' },
            { label: 'OL', style: 'ordered-list-item' },
            { label: "Blockquote", style: "blockquote" }
        ],
        BLOCK_ALIGNMENT_BUTTONS: [
            { label: "Align Left", style: "ALIGN_LEFT" },
            { label: "Align Center", style: "ALIGN_CENTER" },
            { label: "Align Right", style: "ALIGN_RIGHT" },
            { label: "Align Justify", style: "ALIGN_JUSTIFY" },
        ],
    };

    const stateChange = (value) => {
        setEditorState(value);
        setDescription(value.toString('html'));
    }

    useEffect(() => {
        setEditorState(RichTextEditor.createValueFromString(description, 'html'));
    }, [description]);

    return (
        <div id='textEditor'>
            <RichTextEditor
                value={editorState}
                onChange={stateChange}
                toolbarConfig={toolbarConfig}
                editorClassName='h-52'
            />
        </div>
    );
}

export default TextEditor;
