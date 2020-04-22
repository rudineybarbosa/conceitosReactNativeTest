import React, {useEffect, useState} from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";


export default function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const repositoryUpdated = response.data;
    
    const index = repositories.findIndex(repository => repository.id == id);
    
    repositories[index] = repositoryUpdated; 
    
    setRepositories([...repositories]);
  }


  useEffect( () => {
    api.get('repositories').then(response => {
         setRepositories(response.data);
    })
}, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.repositoryContainer}
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={( {item: repository} ) => (
            <>
              
              <Text style={styles.repository}>{repository.title}</Text>
              
              <FlatList style={styles.techsContainer}
                data={repository.techs}
                keyExtractor={tech => tech.toString()}
                renderItem={( {item: tech} ) => (
                  <>
                    <Text style={styles.tech}>{tech}</Text>
                </>)}
              ></FlatList>
              
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>  
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>                                      
              </View>
            </>
          )}
        >

          {/* <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              ReactJS
            </Text>
            <Text style={styles.tech}>
              Node.js
            </Text>
          </View> */}
{/* 
          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>
          </View> */}

          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity> */}

        </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    backgroundColor: "#fdd",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,  
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 5,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    flex:1
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 0,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 5,
  },
});
