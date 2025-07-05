import fs from "fs/promises";
import path from "path";
import Link from "next/link";

const MyWorks = async () => {
  const filePath = path.join(process.cwd(), "public", "pdfs", "index.json");
  let files = [];

  try {
    const data = await fs.readFile(filePath, "utf-8");
    files = JSON.parse(data);
  } catch (e) {
    // If index.json doesn't exist or is empty
    files = [];
  }

  return (
    <div className="min-h-screen p-10 bg-[#0f021c] text-white">
      <h1 className="text-3xl font-bold mb-6">My Saved PDFs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, idx) => (
          <div key={idx} className="bg-white/5 p-4 rounded-xl shadow-md">
            <h3 className="text-lg mb-2">PDF #{idx + 1}</h3>
            <a
              href={`/pdfs/${file.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:underline"
            >
              View PDF
            </a>
            <p className="text-xs mt-2 opacity-60">
              {new Date(file.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
