import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextComponent = ({ initialValue, onSave }) => {
  const [content, setContent] = useState(initialValue);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        onSave(content);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [content, onSave]);

  return (
    <div className="App" style={{ width: '240px' }} ref={editorRef}>
      <Editor
        apiKey="t3fy06mhh684wsiszfxq9iy61vn9kbe5gx98l8vynn7617hx"
        value={content}
        init={{
          menubar: false,
          plugins: 'lists code hr',
          toolbar: 'bold italic strikethrough bullist numlist ',
          width: 508,
          height: 240,
        }}
        onEditorChange={(newContent) => {
          setContent(newContent);
        }}
      />
    </div>
  );
};

export default RichTextComponent;
