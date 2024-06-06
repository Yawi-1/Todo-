import React, { useState, useRef, useEffect } from "react";
import TodoContext from "./TodoContext";

const TodoProvider = ({ children }) => {
  const Inputvalue = useRef(null);
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [cross, setCross] = useState(false);

  // Retrieve data from local storage on component mount
  useEffect(() => {
    getFromLocal();
  }, []);

  // Save to local storage whenever todos state changes
  useEffect(() => {
    storeInLocal();
  }, [todos]);

  const addTask = () => {
    if (task.trim()) {
      setTodos([...todos, { id: todos.length + 1, task: task }]);
      setTask("");
    }
  };

  const deleteTask = (indexToDelete) => {
    const newTodo = todos.filter((item, index) => index !== indexToDelete);
    setTodos(newTodo);
  };

  const storeInLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getFromLocal = () => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  };

  const editTask = (index) => {
    setTask(todos[index].task);
    setIsEdit(true);
    setEditIndex(index);
    setCross(true);
    Inputvalue.current.focus();
  };

  const updateTask = () => {
    const updatedTodos = todos.map((item, index) =>
      index === editIndex ? { ...item, task: task } : item
    );
    setTodos(updatedTodos);
    setTask("");
    setIsEdit(false);
    setEditIndex(null);
    setCross(false);
  };

  const clearText = () => {
    setTask("");
    setCross(false);
    setIsEdit(false);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        task,
        setTask,
        addTask,
        deleteTask,
        storeInLocal,
        getFromLocal,
        editTask,
        Inputvalue,
        isEdit,
        updateTask,
        setTodos,
        cross,
        clearText
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
