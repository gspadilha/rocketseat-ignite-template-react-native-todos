import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { IhandleEditTask } from "../components/TaskItem";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskSameTitle = tasks.find(
      (i) => i.title.toLocaleLowerCase() === newTaskTitle.toLocaleLowerCase()
    );

    if (taskSameTitle) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    //TODO - add new task
    setTasks((v) => [
      ...v,
      {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks((v) => [
      ...v.map((i) => {
        if (i.id === id) {
          return { ...i, done: !i.done };
        }

        return i;
      }),
    ]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { style: "cancel", text: "Não" },
        {
          style: "destructive",
          text: "Sim",
          onPress: () => {
            setTasks((v) => [...v.filter((i) => i.id !== id)]);
          },
        },
      ]
    );

    //TODO - remove task from state
  }

  function handleEditTask({ id, newTitle }: IhandleEditTask) {
    //TODO - edit task from state
    setTasks((v) => [
      ...v.map((i) => {
        if (i.id === id) {
          return { ...i, title: newTitle };
        }

        return i;
      }),
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
