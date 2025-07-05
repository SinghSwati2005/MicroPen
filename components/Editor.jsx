

// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaMicrophone, FaTrash, FaPalette, FaFilePdf } from "react-icons/fa";
// import axios from "axios";
// import domtoimage from "dom-to-image";
// import jsPDF from "jspdf";

// export default function Editor() {
//   const editorRef = useRef(null);
//   const [rows, setRows] = useState(2);
//   const [cols, setCols] = useState(2);
//   const [customTheme, setCustomTheme] = useState("bg-white text-black");
//   const [listening, setListening] = useState(false);
//   const [lastTable, setLastTable] = useState(null);
//   const [language, setLanguage] = useState("en-IN");
//   const [recognitionInstance, setRecognitionInstance] = useState(null);
//   const [activeCell, setActiveCell] = useState(null);
//   const [questionCount, setQuestionCount] = useState(1);

//   useEffect(() => {
//     const inputs = document.querySelectorAll("input, select");
//     inputs.forEach(input => {
//       if (customTheme.includes("dark") || customTheme.includes("gray-900")) {
//         input.classList.add("bg-gray-800", "text-white");
//       } else {
//         input.classList.remove("bg-gray-800", "text-white");
//       }
//     });
//   }, [customTheme]);

//   let recognition;
//   let restartTimeout;

//   const toggleTheme = (colorClass) => setCustomTheme(colorClass);

//   const createTable = () => {
//     const table = document.createElement("table");
//     table.className = "border border-black my-4 cursor-move";
//     table.style.resize = "both";
//     table.style.overflow = "auto";
//     for (let i = 0; i < rows; i++) {
//       const tr = document.createElement("tr");
//       for (let j = 0; j < cols; j++) {
//         const td = document.createElement("td");
//         td.textContent = "Cell";
//         td.className = "border border-gray-400 p-2 min-w-[100px]";
//         td.style.resize = "both";
//         td.style.overflow = "auto";
//         td.onclick = () => setActiveCell(td);
//         td.setAttribute("contenteditable", "true");
//         tr.appendChild(td);
//       }
//       table.appendChild(tr);
//     }
//     table.setAttribute("contenteditable", "false");
//     editorRef.current.appendChild(table);
//     setLastTable(table);
//   };

//   const deleteLastTable = () => {
//     if (lastTable && editorRef.current.contains(lastTable)) {
//       editorRef.current.removeChild(lastTable);
//       setLastTable(null);
//     }
//   };

//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech Recognition not supported");
//       return;
//     }
//     const recog = new webkitSpeechRecognition();
//     recog.continuous = true;
//     recog.interimResults = false;
//     recog.lang = language;
//     setListening(true);
//     setRecognitionInstance(recog);

//     recog.onresult = async (event) => {
//       const lastResult = event.results[event.results.length - 1];
//       const transcript = lastResult[0].transcript.trim();
//         if (activeCell) {
//     // Directly insert text into selected cell without AI
//     activeCell.textContent = transcript;
//     return;
//   }
//       try {
//         const response = await axios.post("/api/ai-command", { text: transcript });
//         executeAICommand(response.data);
//       } catch (err) {
//         console.error("AI failed:", err);
//         insertText(transcript);
//       }
//     };

//     recog.onerror = (e) => {
//       console.error("Recognition error", e);
//       if (listening) restartRecognition();
//     };

//     recog.onend = () => {
//       if (listening) restartRecognition();
//     };

//     recog.start();
//   };

//   const stopListening = () => {
//     setListening(false);
//     if (recognitionInstance) {
//       recognitionInstance.stop();
//       setRecognitionInstance(null);
//       clearTimeout(restartTimeout);
//     }
//   };

//   const restartRecognition = () => {
//     clearTimeout(restartTimeout);
//     restartTimeout = setTimeout(() => {
//       if (recognition && listening) recognition.start();
//     }, 500);
//   };

//   const insertText = (content, alignment = "left") => {
//     const p = document.createElement("p");
//     p.textContent = content;
//     p.style.textAlign = alignment;
//     editorRef.current.appendChild(p);
//   };

//   const insertAITable = (r, c) => {
//     const table = document.createElement("table");
//     table.className = "border border-black my-4 cursor-move";
//     table.style.resize = "both";
//     table.style.overflow = "auto";
//     for (let i = 0; i < r; i++) {
//       const tr = document.createElement("tr");
//       for (let j = 0; j < c; j++) {
//         const td = document.createElement("td");
//         td.className = "border border-gray-400 p-2 min-w-[100px]";
//         td.textContent = `R${i + 1}C${j + 1}`;
//         td.style.resize = "both";
//         td.style.overflow = "auto";
//         td.onclick = () => setActiveCell(td);
//         td.setAttribute("contenteditable", "true");
//         tr.appendChild(td);
//       }
//       table.appendChild(tr);
//     }
//     editorRef.current.appendChild(table);
//     setLastTable(table);
//   };

//   const insertStyledHeading = (content, style, fontSize) => {
//     const h = document.createElement("h1");
//     h.textContent = content;
//     h.style.fontSize = `${fontSize}px`;
//     if (style === "bold") h.style.fontWeight = "bold";
//     editorRef.current.appendChild(h);
//   };

//   const insertList = (items, type = "numbered") => {
//     const list = document.createElement(type === "numbered" ? "ol" : "ul");
//     items.forEach((item) => {
//       const li = document.createElement("li");
//       li.textContent = item;
//       list.appendChild(li);
//     });
//     editorRef.current.appendChild(list);
//   };

//   const fillCell = (row, column, content) => {
//     const tables = editorRef.current.getElementsByTagName("table");
//     if (!tables.length) return;
//     const table = tables[tables.length - 1];
//     const tr = table.rows[row - 1];
//     if (tr && tr.cells[column - 1]) {
//       tr.cells[column - 1].textContent = content;
//     }
//   };

//   const exportToPDF = async () => {
//     const node = editorRef.current;
//     const dataUrl = await domtoimage.toPng(node);
//     const pdf = new jsPDF();
//     const imgProps = pdf.getImageProperties(dataUrl);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save("question-paper.pdf");
//   };

//   const executeAICommand = (command) => {
//   switch (command.action) {
//     case "insert_text":
//       let text = command.content;
//       if (text.includes("?")) {
//         text = `Q${questionCount}. ${text}`;
//         setQuestionCount(prev => prev + 1);
//       }

//       // 👉 Insert into cell if one is selected
//       if (activeCell) {
//         activeCell.textContent = text;
//       } else {
//         insertText(text);
//       }
//       break;
//       case "set_alignment": {
//         if (command.target === "last_line") {
//           const ps = editorRef.current.querySelectorAll("p");
//           if (ps.length > 0) {
//             ps[ps.length - 1].style.textAlign = command.alignment || "left";
//           }
//         }
//         break;
//       }
//       case "insert_table":
//         insertAITable(command.rows, command.columns);
//         break;
//       case "add_heading":
//         insertStyledHeading(command.content, command.style, command.fontSize);
//         break;
//       case "insert_list":
//         insertList(command.items, command.type);
//         break;
//       case "fill_table_cell":
//         fillCell(command.row, command.column, command.content);
//         break;
//       default:
//         insertText("[Unsupported or invalid command]");
//     }
//   };

//   return (
//     <div className={`min-h-screen p-6 transition-all duration-500 ${customTheme}`}>
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//         <div className="mb-6 flex flex-wrap gap-4 items-center">
//           <input type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value))} className="border p-2 rounded w-20" placeholder="Rows" />
//           <input type="number" value={cols} onChange={(e) => setCols(parseInt(e.target.value))} className="border p-2 rounded w-20" placeholder="Cols" />
//           <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border p-2 rounded">
//             <option value="en-IN">English</option>
//             <option value="hi-IN">Hindi</option>
//             <option value="bn-IN">Bengali</option>
//           </select>
//           <button onClick={createTable} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">➕ Table</button>
//           <button onClick={deleteLastTable} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"><FaTrash /></button>
//           <button onClick={() => toggleTheme("bg-white text-black")} className="bg-yellow-500 text-black px-4 py-2 rounded">☀️ Light</button>
//           <button onClick={() => toggleTheme("bg-gray-900 text-white")} className="bg-gray-800 text-white px-4 py-2 rounded">🌙 Dark</button>
//           <button onClick={() => toggleTheme("bg-green-100 text-black")} className="bg-green-400 text-black px-4 py-2 rounded">🟢 Green</button>
//           <button onClick={() => toggleTheme("bg-yellow-100 text-black")} className="bg-yellow-300 text-black px-4 py-2 rounded">🟡 Yellow</button>
//           <button onClick={exportToPDF} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"><FaFilePdf /> Export PDF</button>
//           {!listening ? (
//             <button onClick={startListening} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
//               <FaMicrophone /> Speak
//             </button>
//           ) : (
//             <button onClick={stopListening} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
//               ⏹️ Stop
//             </button>
//           )}
//         </div>

//         <div
//           ref={editorRef}
//           contentEditable
//           suppressContentEditableWarning={true}
//           onClick={(e) => {
//             const p = editorRef.current.querySelector("p");
//             if (p && p.textContent.includes("Start writing")) p.remove();
//           }}
//           className="border border-dashed border-gray-400 min-h-[300px] p-4 rounded shadow-md bg-white text-black dark:bg-gray-800 dark:text-white transition"
//         >
//           <p className="opacity-60">Start writing your question paper here...</p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaTrash, FaPalette, FaFilePdf } from "react-icons/fa";
import axios from "axios";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

export default function Editor() {
  const editorRef = useRef(null);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [customTheme, setCustomTheme] = useState("bg-white text-black");
  const [listening, setListening] = useState(false);
  const [lastTable, setLastTable] = useState(null);
  const [language, setLanguage] = useState("en-IN");
  const [recognitionInstance, setRecognitionInstance] = useState(null);
  const [activeCell, setActiveCell] = useState(null);
  const [questionCount, setQuestionCount] = useState(1);
  const activeCellRef = useRef(null);
  const [undoStack, setUndoStack] = useState([]);



  useEffect(() => {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach(input => {
      if (customTheme.includes("dark") || customTheme.includes("gray-900")) {
        input.classList.add("bg-gray-800", "text-white");
      } else {
        input.classList.remove("bg-gray-800", "text-white");
      }
    });
  }, [customTheme]);

  const toggleTheme = (colorClass) => setCustomTheme(colorClass);
  const saveState = () => {
  if (editorRef.current) {
    setUndoStack(prev => [...prev, editorRef.current.innerHTML]);
  }
};
const handleUndo = () => {
  if (undoStack.length > 0) {
    const lastState = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    editorRef.current.innerHTML = lastState;

    // Reattach click listeners to restored cells
    const restoredCells = editorRef.current.querySelectorAll("td[contenteditable='true']");
    restoredCells.forEach(td => {
      td.addEventListener("click", () => handleCellClick(td));
    });
  }
};


 const handleCellClick = (cell) => {
  if (activeCellRef.current) {
    activeCellRef.current.style.outline = "none";
  }
  cell.style.outline = "2px solid blue";
  setActiveCell(cell);             // for React re-rendering
  activeCellRef.current = cell;    // for live reference
};


  const createTable = () => {
     saveState();
    const table = document.createElement("table");
    table.className = "border border-black my-4 cursor-move";
    table.style.resize = "both";
    table.style.overflow = "auto";
    for (let i = 0; i < rows; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < cols; j++) {
        const td = document.createElement("td");
        td.textContent = "Cell";
        td.className = "border border-gray-400 p-2 min-w-[100px]";
        td.style.resize = "both";
        td.style.overflow = "auto";
        td.setAttribute("contenteditable", "true");
        td.addEventListener("click", () => handleCellClick(td));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    table.setAttribute("contenteditable", "false");
    editorRef.current.appendChild(table);
    setLastTable(table);
  };

  const deleteLastTable = () => {
    if (lastTable && editorRef.current.contains(lastTable)) {
       saveState();
      editorRef.current.removeChild(lastTable);
      setLastTable(null);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported");
      return;
    }
    const recog = new webkitSpeechRecognition();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = language;
    setListening(true);
    setRecognitionInstance(recog);

  recog.onresult = async (event) => {
     saveState();
  const lastResult = event.results[event.results.length - 1];
  const transcript = lastResult[0].transcript.trim();

  if (activeCellRef.current) {
    // Insert into current cell
    activeCellRef.current.textContent = transcript;
    activeCellRef.current.style.outline = "none";

    // Move to next cell
    const allCells = Array.from(
      editorRef.current.querySelectorAll("td[contenteditable='true']")
    );

    const currentIndex = allCells.indexOf(activeCellRef.current);
    if (currentIndex !== -1 && currentIndex + 1 < allCells.length) {
      const nextCell = allCells[currentIndex + 1];
      nextCell.focus();
      nextCell.style.outline = "2px solid blue";
      activeCellRef.current = nextCell;
      setActiveCell(nextCell); // for UI purposes
    } else {
      activeCellRef.current = null;
      setActiveCell(null);
    }

    return;
  }

      try {
        const response = await axios.post("/api/ai-command", { text: transcript });
        executeAICommand(response.data);
      } catch (err) {
        console.error("AI failed:", err);
        insertText(transcript);
      }
    };

    recog.onerror = (e) => {
      console.error("Recognition error", e);
    };

    recog.onend = () => {
      if (listening) recog.start();
    };

    recog.start();
  };

  const stopListening = () => {
    setListening(false);
    if (recognitionInstance) {
      recognitionInstance.stop();
      setRecognitionInstance(null);
    }
  };

  const insertText = (content, alignment = "left") => {
     saveState();
    const p = document.createElement("p");
    p.textContent = content;
    p.style.textAlign = alignment;
    editorRef.current.appendChild(p);
  };

  const insertAITable = (r, c) => {
     saveState();
    const table = document.createElement("table");
    table.className = "border border-black my-4 cursor-move";
    table.style.resize = "both";
    table.style.overflow = "auto";
    for (let i = 0; i < r; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < c; j++) {
        const td = document.createElement("td");
        td.className = "border border-gray-400 p-2 min-w-[100px]";
        td.textContent = `R${i + 1}C${j + 1}`;
        td.style.resize = "both";
        td.style.overflow = "auto";
        td.setAttribute("contenteditable", "true");
        td.addEventListener("click", () => handleCellClick(td));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    editorRef.current.appendChild(table);
    setLastTable(table);
  };

  const insertStyledHeading = (content, style, fontSize) => {
     saveState();
    const h = document.createElement("h1");
    h.textContent = content;
    h.style.fontSize = `${fontSize}px`;
    if (style === "bold") h.style.fontWeight = "bold";
    editorRef.current.appendChild(h);
  };

  const insertList = (items, type = "numbered") => {
     saveState();
    const list = document.createElement(type === "numbered" ? "ol" : "ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    editorRef.current.appendChild(list);
  };

  const fillCell = (row, column, content) => {
     saveState();
    const tables = editorRef.current.getElementsByTagName("table");
    if (!tables.length) return;
    const table = tables[tables.length - 1];
    const tr = table.rows[row - 1];
    if (tr && tr.cells[column - 1]) {
      tr.cells[column - 1].textContent = content;
    }
  };

const exportToPDF = async () => {
  const node = editorRef.current;
  const dataUrl = await domtoimage.toPng(node);
  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(dataUrl);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

  const pdfBlob = pdf.output("blob");

  const formData = new FormData();
  formData.append("file", pdfBlob, `work_${Date.now()}.pdf`);

  try {
    const res = await fetch("/api/save-pdf", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      alert("PDF saved successfully!");
    } else {
      alert("Failed to save PDF.");
    }
  } catch (err) {
    console.error(err);
    alert("Error saving PDF.");
  }
};


  const executeAICommand = (command) => {
    switch (command.action) {
      case "insert_text": {
        let text = command.content;
        if (text.includes("?")) {
          text = `Q${questionCount}. ${text}`;
          setQuestionCount(prev => prev + 1);
        }
        if (activeCell) {
          activeCell.textContent = text;
        } else {
          insertText(text);
        }
        break;
      }
      case "set_alignment": {
        if (command.target === "last_line") {
          const ps = editorRef.current.querySelectorAll("p");
          if (ps.length > 0) {
            ps[ps.length - 1].style.textAlign = command.alignment || "left";
          }
        }
        break;
      }
      case "insert_table":
        insertAITable(command.rows, command.columns);
        break;
      case "add_heading":
        insertStyledHeading(command.content, command.style, command.fontSize);
        break;
      case "insert_list":
        insertList(command.items, command.type);
        break;
      case "fill_table_cell":
        fillCell(command.row, command.column, command.content);
        break;
      default:
        insertText("[Unsupported or invalid command]");
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-all duration-500 ${customTheme}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <input type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value))} className="border p-2 rounded w-20" placeholder="Rows" />
          <input type="number" value={cols} onChange={(e) => setCols(parseInt(e.target.value))} className="border p-2 rounded w-20" placeholder="Cols" />
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border p-2 rounded">
            <option value="en-IN">English</option>
            <option value="hi-IN">Hindi</option>
            <option value="bn-IN">Bengali</option>
          </select>
          <button onClick={createTable} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">➕ Table</button>
          <button onClick={deleteLastTable} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"><FaTrash /></button>
          <button onClick={() => toggleTheme("bg-white text-black")} className="bg-yellow-500 text-black px-4 py-2 rounded">☀️ Light</button>
          <button onClick={() => toggleTheme("bg-gray-900 text-white")} className="bg-gray-800 text-white px-4 py-2 rounded">🌙 Dark</button>
          <button onClick={() => toggleTheme("bg-green-100 text-black")} className="bg-green-400 text-black px-4 py-2 rounded">🟢 Green</button>
          <button onClick={handleUndo} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
  🔁 Undo
</button>

          <button onClick={() => toggleTheme("bg-yellow-100 text-black")} className="bg-yellow-300 text-black px-4 py-2 rounded">🟡 Yellow</button>
          <button onClick={exportToPDF} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"><FaFilePdf /> Export PDF</button>
          {!listening ? (
            <button onClick={startListening} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaMicrophone /> Speak
            </button>
          ) : (
            <button onClick={stopListening} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
              ⏹️ Stop
            </button>
          )}
        </div>

        <div 
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning={true}
          onClick={(e) => {
            const p = editorRef.current.querySelector("p");
            if (p && p.textContent.includes("Start writing")) p.remove();
          }}
          className="border border-dashed border-gray-400 min-h-[300px] p-4 rounded shadow-md bg-white text-black dark:bg-gray-800 dark:text-white transition "
        >
          <p className="opacity-60">Start writing your question paper here...</p>
        </div>
      </motion.div>
    </div>
  );
}

