import React, { useState } from "react";
import InputField from "../../../Common/InputField";

const ModuleModal = ({ moduleData, onClose, onSave }) => {
  const [moduleName, setModuleName] = useState(moduleData?.module_name || "");
  const [moduleNumber, setModuleNumber] = useState(moduleData?.sequence || "");

  const handleSave = () => {
    if (!moduleName || !moduleNumber) {
      return alert("All fields are required!");
    }
    onSave({
      module_id: moduleData?.module_id,
      module_name: moduleName,
      sequence: moduleNumber,
      type: "chapter",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h3 className="text-lg font-semibold mb-4">
          {moduleData ? "Edit Module" : "Add Module"}
        </h3>
        <div className="flex flex-row p-2 gap-4 mb-4">
          <div className=" sm:w-2/3 text-sm text-neutral-500 font-medium m-1">
            <InputField
              label="Module name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          <div className="w-1/4 sm:w-1/3 text-sm text-neutral-500 font-medium m-1">
            <InputField
            className="w-1/4"
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
