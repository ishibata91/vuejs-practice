<script setup>
import { ref } from "vue";
const todoRef = ref("");
const todoListRef = ref([]);
const Is = localStorage.todoList;
todoListRef.value = Is ? JSON.parse(Is) : [];
const isEditRef = ref(false);
let editId = -1;
//削除用関数。IDを利用してローカルストレージの値を代入して置き換えてく。
function deleteTodo(id) {
  const todo = todoListRef.value.find((todo) => todo.id == id);
  const idx = todoListRef.value.findIndex((todo) => todo.id == id);

  const delMsg = "「" + todo.task + "」を削除しますか？";
  if (!confirm(delMsg)) return;

  todoListRef.value.splice(idx, 1);
  localStorage.todoList = JSON.stringify(todoListRef.value);
}
//編集用関数。ローカルストレージから代入して置き換えてく
function editTodo() {
  const todo = todoListRef.value.find((todo) => todo.id == editId);
  const idx = todoListRef.value.findIndex((todo) => todo.id == editId);
  todo.task = todoRef.value;
  todoListRef.value.splice(idx, 1, todo);
  localStorage.todolist = JSON.stringify(todoListRef.value);
  isEditRef.value = false;
  editIndex = -1;
  todoRef.value = "";
}
//データ追加用。まずリストに追加してそのままローカルストレージへ
function addTodo() {
  const id = new Date().getTime();
  todoListRef.value.push({ id: id, task: todoRef.value });
  localStorage.todoList = JSON.stringify(todoListRef.value);
  todoRef.value = "";
}
//編集モード移行用。押されたデータのIDは表示されていないがあるので取ってきて、入力ボックスの値に。また、編集モード用のフラグをオンに。
function showTodo(id) {
  const todo = todoListRef.value.find((todo) => todo.id === id);
  todoRef.value = todo.task;
  isEditRef.value = true;
  editId = id;
}

</script>

<template>
  <!-- ここから入力ボックス -->
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todoRef"
      placeholder=" + TODOを入力"
    />
    <button class="btn green" @click="editTodo" v-show="isEditRef">変更</button>
    <button class="btn" @click="addTodo" v-show="!isEditRef">追加</button>
  </div>
  <!--　ここからリスト -->
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo">
        <input type="checkbox" class="check" /><label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <!-- 削除編集ボタン -->
        <button class="btn green" @click="showTodo(todo.id)">編</button>
        <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 入力ボックス */
.box_input {
  margin-top: 20px;
}
.todo_input {
  width: 300px;
  margin-right: 8px;
  padding: 8px;
  font-size: 18px;
  border: 1px solid#aaa;
  border-radius: 6px;
}
/* ボタン全て */
.btn {
  padding: 8px;
  background-color: #03a9f4;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}
/* 編集削除変更などのボタン */
.green {
  background-color: #00c853;
}

.pink {
  background-color: #ff4081;
}
/* 編集削除のボタン間の調整 */
.btns {
  display: flex;
  gap: 4px;
}
/* ここからリスト */
.box_list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.todo_list {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo {
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 300px;
  padding: 12px;
}

.check {
  border: 1px solid red;
  transform: scale(1.6);
  margin: 0 16px 2px 6px;
}
</style>
