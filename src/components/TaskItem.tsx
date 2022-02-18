import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import { Task } from "./TasksList";

export interface IhandleEditTask {
  id: number;
  newTitle: string;
}

export interface TasksProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ id, newTitle }: IhandleEditTask) => void;
}

export const TaskItem = ({
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksProps) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [newEditedTitle, setNewEditTitle] = React.useState<string>(task.title);

  const textInputRef = React.useRef<TextInput>(null);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setNewEditTitle(task.title);
    setIsEditing(false);
  };

  const handleSubmitEditing = () => {
    editTask({ id: task.id, newTitle: newEditedTitle });
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            //TODO - use style prop
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <Text
            //TODO - use style prop
            style={task.done ? styles.taskTextDone : styles.taskText}
          >
            {task.title}
          </Text>
          <TextInput />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity
          //TODO - use onPress (remove task) prop
          onPress={() => editTask({ id: task.id, newTitle: task.title })}
          style={{ paddingHorizontal: 8 }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          //TODO - use onPress (remove task) prop
          onPress={() => removeTask(task.id)}
          style={{ paddingHorizontal: 8 }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
