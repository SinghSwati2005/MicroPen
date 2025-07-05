"use client";
import React from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Table,
  Mic,
  Type,
  PaintBucket
} from "lucide-react";

export default function Toolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="bg-white/80 backdrop-blur-lg p-3 rounded-xl shadow-md flex flex-wrap gap-3 justify-start items-center">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className="toolbar-btn">
        <Bold size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className="toolbar-btn">
        <Italic size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="toolbar-btn">
        <Underline size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className="toolbar-btn">
        <Strikethrough size={18} />
      </button>

      <select
        onChange={(e) =>
          editor.chain().focus().setFontSize(e.target.value + "px").run()
        }
        className="toolbar-select"
      >
        {[12, 14, 16, 18, 24, 32, 48].map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <Type size={18} />
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <PaintBucket size={18} />
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setHighlight({ color: e.target.value }).run()
          }
        />
      </div>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        className="toolbar-btn"
      >
        <Table size={18} />
      </button>

      <button
        onClick={() => alert("Voice Input Coming Soon")}
        className="toolbar-btn"
      >
        <Mic size={18} />
      </button>
    </div>
  );
}



