//外部へエクスポート
export function useTodoList() {
  const Is = localStorage.todoList;
  const todoListRef = ref([]);
  todoListRef.value = Is ? JSON.parse(Is) : [];
  
  const todo = todoListRef.value.find((todo) => todo.id == id);
  const idx = todoListRef.value.findIndex((todo) => todo.id == id);
  return { todo, idx };
}
