import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard, Image } from 'react-native';

export default class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarefa: '',
      lista: []
    };
  }

  adicionarTarefa = () => {
    if (this.state.tarefa.trim() !== '') {
      const novaTarefa = {
        id: Date.now().toString(),
        texto: this.state.tarefa,
        concluida: false
      };
      this.setState(prevState => ({
        lista: [...prevState.lista, novaTarefa],
        tarefa: ''
      }));
      Keyboard.dismiss();
    }
  };

  alternarConclusao = (id) => {
    const novaLista = this.state.lista.map(item => {
      if (item.id === id) {
        return { ...item, concluida: !item.concluida };
      }
      return item;
    });
    this.setState({ lista: novaLista });
  };

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => this.alternarConclusao(item.id)}
      >
        {item.concluida ? (
          <Image
            source={require('./assets/pokeball.png')}
            style={styles.checkImage}
          />
        ) : (
          <Image
            source={require('./assets/poke_pika_wink.png')}
            style={styles.checkImage}
          />
        )}
      </TouchableOpacity>

      <View style={styles.itemTextoContainer}>
        <Text style={[styles.itemTexto, item.concluida && styles.itemConcluida]}>
          {item.texto}
        </Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boasVindas}>
          oi, treinador! pronto para completar suas missões?
        </Text>

        <Text style={styles.contador}>
          🏆 Tarefas concluídas: {this.state.lista.filter(tarefa => tarefa.concluida).length}
        </Text>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={this.state.tarefa}
            onChangeText={(text) => this.setState({ tarefa: text })}
            placeholder="Digite uma tarefa"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.botao} onPress={this.adicionarTarefa}>
            <Text style={styles.botaoTexto}>Adione na lista</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.lista}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
          style={styles.lista}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEB3B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  boasVindas: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  contador: {
    fontSize: 16,
    color: '#2A75BB',
    marginBottom: 10,
    fontWeight: '500',
  },
  inputArea: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#3B4CCA',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#3B4CCA',
  },
  botao: {
    backgroundColor: '#3B4CCA',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  lista: {
    width: '100%',
    maxWidth: 400,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 2,
    borderColor: '#CC0000',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  checkButton: {
    marginRight: 10,
  },
  checkImage: {
    width: 28,
    height: 28,
  },
  itemTextoContainer: {
    flex: 1,
  },
  itemTexto: {
    fontSize: 16,
    color: '#2A75BB',
    fontWeight: '600',
  },
  itemConcluida: {
    textDecorationLine: 'line-through',
    color: '#888',
    opacity: 0.6,
  },
});
