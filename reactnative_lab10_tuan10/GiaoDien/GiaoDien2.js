import React, { useEffect, useState, useContext } from 'react'; 
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksRequest, addTaskRequest, updateTasks, deleteTaskRequest } from '../tasksSlice'; // Thêm action updateTasks
import MyContext from './MyContext';

export default function GiaoDien2({ navigation, route }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { name } = useContext(MyContext); 
  const dispatch = useDispatch();
  const { items: tasks, loading, error } = useSelector((state) => state.tasks);

useEffect(() => {
  if (tasks.length === 0) { // Chỉ tải nếu danh sách hiện tại trống
    dispatch(fetchTasksRequest());
  }
}, [dispatch, tasks.length]);


  // Xử lý cập nhật công việc khi quay lại từ GiaoDien3
  useEffect(() => {
    if (route.params?.updatedTask) {
      const updatedTask = route.params.updatedTask;
      const updatedTasks = tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      );
      dispatch(updateTasks(updatedTasks)); // Gửi action để cập nhật trong Redux
    }
  }, [route.params?.updatedTask]);

  const toggleCompleteTask = async (taskID) => {
  // Tìm công việc và đảo ngược trạng thái `completed`
  const task = tasks.find(task => task.id === taskID);
  const updatedTask = { ...task, completed: !task.completed };

  // Gửi yêu cầu `PUT` đến API để cập nhật trạng thái công việc
  try {
    const response = await fetch(`https://66f606b5436827ced975b8c7.mockapi.io/bai7/${taskID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();

    // Sau khi API trả về, cập nhật Redux store với công việc đã cập nhật
    const updatedTasks = tasks.map(task => 
      task.id === data.id ? data : task
    );
    dispatch(updateTasks(updatedTasks));
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

  const deleteTask = (taskID) => {
    dispatch(deleteTaskRequest(taskID)); // Gọi action để xóa công việc
  };

  const handleAddTask = () => {
    const newTask = {
      title: 'New Task',
      completed: false,
    };
    dispatch(addTaskRequest(newTask));
  };

  const handleEditTask = (task) => {
    navigation.navigate('GiaoDien3', { task });
  };

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.nutback} onPress={() => navigation.navigate("GiaoDien1")}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Image source={require("../img/goyong.jpg")} style={styles.profileImage} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{name}</Text>
            <Text style={styles.subText}>Have a great day ahead</Text>
          </View>
        </View>

        {/* Thanh tìm kiếm */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={22} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Danh sách công việc */}
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleCompleteTask(task.id)}>
              <Icon 
                name={task.completed ? "check-circle" : "radio-button-unchecked"} 
                size={24} 
                color={task.completed ? "green" : "gray"} 
              />
            </TouchableOpacity>
            <Text style={[styles.taskText, task.completed && styles.completedTask]}>{task.title}</Text>
            <TouchableOpacity onPress={() => handleEditTask(task)}>
              <Icon name="edit" size={24} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(task.id)}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Nút thêm công việc */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  nutback: {
    marginRight: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#00C4FF',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
