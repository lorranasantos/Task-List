import "./App.css";
import { useState, useEffect } from "react";

function ToDoList() {
  const [taskList, setTaskList] = useState([]);

  const [inputTask, setInputTask] = useState({ id: "", description: "" });

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("lista", JSON.stringify(taskList));
  });

  useEffect(() => {
    setTaskList(JSON.parse(localStorage.getItem("lista")));
  }, []);

  const handleInsert = (description) => {
    const newId =
      taskList.length === 0 ? 1 : taskList[taskList.length - 1].id + 1;

    const task = {
      id: newId,
      description,
    };

    setTaskList([...taskList, task]);
  };

  const handleRemove = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setInputTask(task);
  };

  const handleSaveEdit = () => {
    setTaskList(
      taskList.map((task) => (task.id === inputTask.id ? inputTask : task))
    );
  };

  return (
    <div className="container">
      <Form
        handleInsert={handleInsert}
        newTask={inputTask}
        setNewTask={setInputTask}
        handleSaveEdit={handleSaveEdit}
      />
      <List
        list={taskList}
        handleRemove={handleRemove}
        handleEdit={handleEdit}
      />
    </div>
  );
}

function Form({ handleInsert, setNewTask, newTask, handleSaveEdit }) {
  const handleNewTask = (e) => {
    setNewTask({ ...newTask, description: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask.id === "") {
      handleInsert(newTask.description);
    } else {
      handleSaveEdit();
    }

    setNewTask({ id: "", description: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" value={newTask.description} onChange={handleNewTask} />
      <button>Ok</button>
    </form>
  );
}

function List({ list, handleRemove, handleEdit }) {
  return (
    <section>
      {list.length === 0 && "Você não possui tarefas!"}
      {list.map((item, index) => (
        <Item
          key={item.id}
          task={item}
          index={index}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
        />
      ))}
    </section>
  );
}

function Item({ task, handleRemove, handleEdit, index }) {
  return (
    <article className="item">
      <p>
        {index + 1} - {task.description}
      </p>
      <div>
        <span onClick={() => handleRemove(task.id)}>&times;</span>
        <span style={{ fontSize: 25 }} onClick={() => handleEdit(task)}>
          &#9998;
        </span>
      </div>
    </article>
  );
}

function App() {
  return (
    <>
      <ToDoList />
    </>
  );
}

export default App;
