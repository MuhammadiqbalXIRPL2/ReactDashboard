import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";

const Clipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="clipboard-container">
      <div className="clipboard-content flex justify-between">
        <p className="text-to-copy">{text}</p>
        <button
          onClick={handleCopy}
          className="copy-button p-1 text-white bg-slate-500 rounded-sm hover:bg-slate-600"
        >
          {copied ? <FaClipboardCheck /> : <FaClipboard />}
        </button>
      </div>
    </div>
  );
};

export default Clipboard;
