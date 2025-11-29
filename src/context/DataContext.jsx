import React, { createContext, useContext, useEffect, useState } from "react";
import * as storage from "../utils/storage";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(() => storage.load());

  useEffect(() => {
    storage.save(data);
  }, [data]);

  const addCourse = (course) => setData(prev => ({ ...prev, courses: [...prev.courses, course] }));
  const addForm = (form) => setData(prev => ({ ...prev, forms: [...prev.forms, form] }));
  const addResponse = (resp) => setData(prev => ({ ...prev, responses: [...prev.responses, resp] }));
  const updateForm = (formId, patch) => setData(prev => ({
    ...prev,
    forms: prev.forms.map(f => f.id === formId ? { ...f, ...patch } : f)
  }));

  return (
    <DataContext.Provider value={{
      data,
      setData,
      addCourse,
      addForm,
      addResponse,
      updateForm
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
