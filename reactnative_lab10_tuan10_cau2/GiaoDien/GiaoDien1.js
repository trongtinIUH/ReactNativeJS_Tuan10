import React,{useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity ,TextInput, Image  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Import thư viện icon

 export default function GiaoDien1 ({ navigation }){
  const [name, setName] = useState('');




  return (
  <View style={styles.container}>
    {/* Thêm hình ảnh notebook */}
  <Image 
  source={require("../img/notebook.png")}
  style={styles.image}
/>



    <Text style={styles.title}>MANAGE YOUR {"\n"} TASK</Text>

     

    {/* nhập user name */}
    <View style={styles.inputContainer}>
     <Icon name="email" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder='Enter your name'
          value={name}
          onChangeText={(text)=> setName(text)}
        />
    </View>
    


      {/* Button to proceed */}
      <TouchableOpacity style={styles.startButton} onPress={()=>navigation.navigate('GiaoDien2')}>
        <Text style={styles.startButtonText}>GET STARTED ➔</Text>
      </TouchableOpacity>
    </View>
 
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'purple',
    marginBottom:30
  },
  inputContainer:{
    width:280,
    borderWidth:2,
    borderColor:'pink',
    borderRadius:5,
    marginBottom:20,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10,

  },
  input:{
    flex:1,
    height:50,
  },
  image:{
    width: 180,  // Điều chỉnh kích thước theo yêu cầu
    height: 200,
    marginBottom: 10,
    
  },
   icon: {
    marginRight: 10,                // Khoảng cách giữa icon và TextInput
  },
  startButton:{
    backgroundColor: '#00C4FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
   startButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
