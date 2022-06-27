import { ref } from "vue";

export function useTodoList() {
  const Is = localStorage.todoList;
  const todoListRef = ref([]);
  todoListRef.value = Is ? JSON.parse(Is) : [];

  function add(task) {
    const id = new Date().getTime();
    todoListRef.value.push({ id: id, task: task });
    localStorage.todoList = JSON.stringify(todoListRef.value);
  }


  function findById(id) {
    return todoListRef.value.find((todo) => todo.id === id);
  }

  function findIndexByID(id) {
    return todoListRef.value.findIndex((todo) => todo.id === id);
  }

  const editId = ref(-1);
  function show(id) {
    const todo = findById(id);
    editId.value = id;
    return todo.task;
  }

  function edit(task) {
    const todo = findById(editId.value);
    const idx = findIndexByID(editId.value);
    todo.task = task;
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
    editId = -1;
  }

  function del(id) {
    const todo = findById(id);
    const delMsg = "[" + todo.task + "を削除しますか？]";
    if (confirm(delMsg)) {
      const idx = findIndexByID(id);
      todoListRef.value.splice(idx, 1);
      localStorage.todoList = JSON.stringify(todoListRef.value);
    }
  }

  function check(id) {
    const todo = findById(id);
    const idx = findIndexByID(id);
    todo.checked = !todo.checked;
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  }

  return { todoListRef, add, edit, del, check, show };
}
