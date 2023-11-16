import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
const RichTextComponent = () => {
  return (
    <div className="App">
      <Editor
        apiKey="no-api-key"
        initialValue="Enter issue description"
        init={{
          menubar: false,
          plugins: 'lists code hr',
          toolbar: 'bold italic strikethrough bullist numlist ',
          width: 520,
        }}
      />
    </div>
  );
};

export default RichTextComponent;
