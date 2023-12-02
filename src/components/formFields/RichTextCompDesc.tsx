import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextComponentProps {
  initialValue: string;
  onSave: (newContent: string) => void;
  onError: (error: string | null) => void;
}
const sanitizeContent = (content: string): string => {
  let sanitizedContent = content.replace(/<\/?(p|strong|em|s|ul|ol|li)>/g, '');
  sanitizedContent = sanitizedContent.replace(/<p><br data-mce-bogus="1"><\/p>/g, '');
  sanitizedContent = sanitizedContent.replace(/&nbsp;/g, '');
  sanitizedContent = sanitizedContent.replace(/\n/g, '');
  return sanitizedContent;
};
const RichTextComponent: React.FC<RichTextComponentProps> = ({ initialValue, onSave, onError }) => {
  const [content, setContent] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        const sanitizedContent = sanitizeContent(content);
        console.log(sanitizedContent);

        if (sanitizedContent.length < 20 || sanitizedContent.length > 254) {
          setError('Text must be between 20 and 254 characters');
          onError('Text must be between 20 and 254 characters');
        } else {
          setError(null);
          onSave(content);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [content, onSave, onError]);

  return (
    <div className="App" style={{ width: '240px' }} ref={editorRef}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
