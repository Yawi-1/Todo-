import React, { useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAdd, IoMdSave } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import TodoContext from "../../Context/TodoContext";

const Todo = () => {
  const {
    todos,
    task,
    setTask,
    addTask,
    deleteTask,
    clearText,
    getFromLocal,
    editTask,
    Inputvalue,
    isEdit,
    updateTask,
    cross
  } = useContext(TodoContext);

  // Focus input field on mount
  useEffect(() => {
    Inputvalue.current.focus();
  }, []);

  return (
    <div className="h-screen w-full  flex flex-col items-center justify-center">
      <div className="border-2 p-2 sm:w-[20%] flex flex-col items-center justify-center gap-3 rounded-md bg-gradient-to-b from-gray-500 to-black min-h-[30%]">
        <h1 className="text-3xl text-lime-400 font-semibold mb-3">TO DO APP</h1>
        <div>
          <form onSubmit={(e) => e.preventDefault()} className="flex justify-between gap-3 relative">
            <input
              type="text"
              placeholder="Enter Text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="border-2 rounded-md border-gray-500 px-2"
              ref={Inputvalue}
            />
            {cross && <RxCross2 onClick={clearText} size={25} className="font-bold text-2xl absolute right-16 top-1 cursor-pointer" />}
            {isEdit ? (
              <button onClick={updateTask} className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-400 to-sky-400 text-white">
                <IoMdSave className="font-bold" size={20} />
              </button>
            ) : (
              <button onClick={addTask} className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-400 to-sky-400 text-white">
                <IoMdAdd className="font-bold" size={20} />
              </button>
            )}
          </form>
        </div>
        {todos.map((item, todoIndex) => (
          <div key={todoIndex} className="border-2 border-white w-[80%] min-h-8 overflow-auto rounded-md flex justify-between items-center mt-2">
            <p className="text-white font-semibold px-2"> {item.task}</p>
            <div className="text-white flex">
              <span className="px-2 cursor-pointer rounded-md text-blue-300" onClick={() => editTask(todoIndex)}>
                <MdEdit size={20} />
              </span>
              <span className="px-2 cursor-pointer rounded-md text-red-400" onClick={() => deleteTask(todoIndex)}>
                <MdDelete />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
