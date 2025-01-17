import React, { useState } from "react";
import InputField from "./InputField";

const ModuleModal = ({ moduleData, onClose, onSave }) => {
  const [moduleName, setModuleName] = useState(moduleData?.name || "");
  const [moduleNumber, setModuleNumber] = useState(moduleData?.number || "");

  const handleSave = () => {
    if (!moduleName || !moduleNumber) return alert("All fields are required!");
    onSave({ id: moduleData?.id, name: moduleName, number: moduleNumber });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 h-1/3  shadow-md w-1/3">
        <h3 className="text-lg font-semibold mb-4">
          {moduleData ? "Edit Module" : "Add Module"}
        </h3>
        <div className="flex p-2 gap-4 mb-4">
          <div className="w-3/4 text-sm text-neutral-500 font-medium m-1">
            <InputField
              label="Module name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          <div className="w-1/4 text-sm text-neutral-500 font-medium m-1">
            <InputField
              label="Number"
              value={moduleNumber}
              onChange={(e) => setModuleNumber(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button className="btn-primary px-4 py-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-secondary px-4 py-2" onClick={handleSave}>
            {moduleData ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleModal;
