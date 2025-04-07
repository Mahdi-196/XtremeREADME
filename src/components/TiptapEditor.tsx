"use client";

import React from "react";
import { Editor, EditorContent } from "@tiptap/react";

type TiptapEditorProps = {
  editor: Editor | null;
};

const ToolbarButton = ({
  isActive,
  onClick,
  children,
  title,
}: {
  isActive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-2 rounded hover:bg-gray-700 transition-colors ${
      isActive ? "bg-gray-700" : ""
    }`}
  >
    {children}
  </button>
);

export default function TiptapEditor({ editor }: TiptapEditorProps) {
  if (!editor) return null;

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-800 border-b border-gray-700">
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough"
        >
          <s>S</s>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          title="Inline Code"
        >
          {"</>"}
        </ToolbarButton>
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          •
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          1.
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          title="Code Block"
        >
          {"```"}
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Quote"
        >
          "
        </ToolbarButton>
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          ↺
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          ↻
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} className="tiptap" />
    </div>
  );
}
