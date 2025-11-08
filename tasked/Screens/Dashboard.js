import React, { useState, useEffect } from 'react';
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [adding, setAdding] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [fontsLoaded] = useFonts({
    'TTFirsNeue-Regular': require('../assets/fonts/TT Firs Neue Trial Regular.ttf'),
    'TTFirsNeue-Bold': require('../assets/fonts/TT Firs Neue Trial Bold.ttf'),
  });

//   if (!fontsLoaded) return null;

  // Load tasks from AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks', error);
      }
    };
    saveTasks();
  }, [tasks]);

  // Toggle done/undone
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // Add new task
  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now().toString(),
      text: newTask.trim(),
      done: false,
    };
    setTasks((prev) => [newTaskObj, ...prev]);
    setNewTask('');
    setAdding(false);
    Keyboard.dismiss();
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Sorted tasks: pending first
  const sortedTasks = [
    ...tasks.filter((t) => !t.done),
    ...tasks.filter((t) => t.done),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>tasked</Text>

      <FlatList
        data={adding ? [{ id: 'input' }, ...sortedTasks] : sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.id === 'input') {
            return (
              <View style={styles.taskItem}>
                <View style={styles.checkbox} />
                <TextInput
                  style={[styles.taskText, styles.inputText, { flex: 1 }]}
                  placeholder="Type new task..."
                  placeholderTextColor="#999"
                  value={newTask}
                  onChangeText={setNewTask}
                  onSubmitEditing={addTask}
                  autoFocus
                  returnKeyType="done"
                />
              </View>
            );
          }

          return (
            <TouchableOpacity
              style={styles.taskItem}
              onPress={() => toggleTask(item.id)}
              //Give the option to edit or delete on long press
              onLongPress={() =>
                Alert.alert('Task Options', 'What do you want to do?', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Edit',
                    onPress: () => {
                      setEditingTask(item);
                      setEditingText(item.text);
                    },
                  },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteTask(item.id),
                  },
                ])
              }
            >
              <View style={[styles.checkbox, item.done && styles.checkedBox]}>
                {item.done && <AntDesign name="check" size={14} color="#fff" />}
              </View>
              <Text style={[styles.taskText, item.done && styles.doneText]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Floating + button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAdding(true)}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Cancel adding task  */}
      {adding && (
        <TouchableOpacity
          style={styles.cancelFloatingButton}
          onPress={() => {
            setAdding(false);
            setNewTask('');
            Keyboard.dismiss();
          }}
        >
          <AntDesign name="close" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Edit modal */}
      {editingTask && (
        <View style={styles.editModal}>
          <View style={styles.editModalContent}>
            <TextInput
              style={styles.editInput}
              value={editingText}
              onChangeText={setEditingText}
              autoFocus
            />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#4eb9c0', marginRight: 10 }]}
                onPress={() => {
                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === editingTask.id ? { ...t, text: editingText } : t
                    )
                  );
                  setEditingTask(null);
                  setEditingText('');
                }}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ff5c5c' }]}
                onPress={() => {
                  setEditingTask(null);
                  setEditingText('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: '20%',
  },
  title: {
    fontSize: 32,
    fontFamily: 'TTFirsNeue-Bold',
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#222',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#4eb9c0',
  },
  taskText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    fontFamily: 'sans-serif',
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  addButton: {
    backgroundColor: '#4eb9c0',
    width: 56,
    height: 56,
    borderRadius: 28,
    position: 'absolute',
    bottom: 40,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    padding: 0,
  },
  cancelFloatingButton: {
    backgroundColor: '#4eb9c0',
    width: 56,
    height: 56,
    borderRadius: 28,
    position: 'absolute',
    bottom: 110,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  editModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  editModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
