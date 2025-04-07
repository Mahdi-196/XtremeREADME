"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-hot-toast";
import { marked } from "marked";

// Updated dynamic import with type for the prop
const TiptapEditor = dynamic<{ editor: Editor | null }>(
  () => import("@/components/TiptapEditor"),
  { ssr: false }
);

const licenses = [
  { value: "MIT", label: "MIT License" },
  { value: "Apache-2.0", label: "Apache License 2.0" },
  { value: "GPL-3.0", label: "GNU GPLv3" },
  { value: "BSD-3-Clause", label: "BSD 3-Clause" },
  { value: "ISC", label: "ISC License" },
  { value: "AGPL-3.0", label: "GNU AGPLv3" },
  { value: "LGPL-3.0", label: "GNU LGPLv3" },
  { value: "MPL-2.0", label: "Mozilla Public License 2.0" },
  { value: "Unlicense", label: "The Unlicense" },
  { value: "Artistic-2.0", label: "Artistic License 2.0" },
];

const recommendedSections = [
  "Installation",
  "Usage",
  "Features",
  "Tech Stack",
  "Live Link",
  "Demo",
  "Contributing",
  "Tests",
  "Documentation",
  "Roadmap",
  "Changelog",
  "FAQ",
  "Support",
  "Acknowledgments",
  "Authors",
  "Related Projects",
];

export default function Home() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [license, setLicense] = useState("MIT");
  const [sections, setSections] = useState<string[]>([
    "Installation",
    "Usage",
    "Contributing",
    "License",
  ]);
  const [newSection, setNewSection] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: `## Installation\n\n## Usage\n\n## Contributing\n`,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none",
      },
    },
  });

  const handleAddSection = (section: string) => {
    if (!sections.includes(section)) {
      // Add the section to the current sections
      setSections([...sections, section]);

      // Append the new section to the editor's content
      const content = editor?.getHTML() || "";
      editor?.commands.setContent(content + `\n\n## ${section}\n`);
    }
  };

  const handleRemoveSection = (sectionToRemove: string) => {
    if (sectionToRemove === "License") return; // Don't allow removing License section

    setSections(sections.filter((section) => section !== sectionToRemove));

    // Remove the section content from the editor
    const content = editor?.getHTML() || "";
    const regex = new RegExp(`## ${sectionToRemove}[\\s\\S]*?(?=##|$)`, "g");
    const newContent = content.replace(regex, "");
    editor?.commands.setContent(newContent);
  };

  const handleGenerateReadme = () => {
    if (!projectName) {
      toast.error("Project name is required");
      return;
    }

    if (!description) {
      toast.error("Project description is required");
      return;
    }
    const content = editor?.getHTML() || "";
    const markdown = marked.parse(content);

    // Generate README content
    const readmeContent = `# ${projectName}

![License](https://img.shields.io/badge/license-${license}-blue.svg)

## Description

${description}

## Table of Contents

${sections
  .map((section) => `- [${section}](#${section.toLowerCase()})`)
  .join("\n")}

${markdown}

## License

This project is licensed under the ${license} License - see the [LICENSE](LICENSE) file for details.`;

    // Create a blob and download the file
    const blob = new Blob([readmeContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("README.md generated successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        XtremeREADME Generator
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Project Name *"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary-500 focus:outline-none"
          />

          <textarea
            placeholder="Project Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary-500 focus:outline-none h-24"
          />

          <select
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary-500 focus:outline-none"
          >
            {licenses.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add Custom Section"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddSection(newSection);
                  setNewSection("");
                }
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary-500 focus:outline-none"
            />
            <button
              onClick={() => {
                handleAddSection(newSection);
                setNewSection("");
              }}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              Add Section
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">
              Recommended Sections
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendedSections.map((section) => (
                <button
                  key={section}
                  onClick={() => handleAddSection(section)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    sections.includes(section)
                      ? "bg-primary-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">
              Current Sections
            </h3>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => handleRemoveSection(section)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    section === "License"
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Content Editor</h2>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
            >
              {showPreview ? "Edit" : "Preview"}
            </button>
          </div>

          {showPreview ? (
            <div
              className="prose prose-invert max-w-none p-4 rounded-lg bg-gray-800/50"
              dangerouslySetInnerHTML={{
                __html: marked.parse(editor?.getHTML() || ""),
              }}
            />
          ) : (
            <TiptapEditor editor={editor} />
          )}
        </div>

        <button
          onClick={handleGenerateReadme}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
        >
          Generate README
        </button>
      </div>
    </div>
  );
}
