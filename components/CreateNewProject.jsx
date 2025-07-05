"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateNewProject = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("Math");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = encodeURIComponent(projectName.trim());
    const type = encodeURIComponent(projectType);
    router.push(`/dashboard/editor?name=${name}&type=${type}`);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-all"
      >
        + Create New Work
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl text-black"
          >
            <h2 className="text-xl font-semibold mb-4">Start New Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              className="w-full p-2 border rounded mb-4"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <select
              className="w-full p-2 border rounded mb-4"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="Math">Math Question Paper</option>
              <option value="English">English Paper</option>
              <option value="Science">Science Paper</option>
            </select>

            <div className="flex justify-between">
              <button
                type="button"
                className="text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                Start
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateNewProject;
