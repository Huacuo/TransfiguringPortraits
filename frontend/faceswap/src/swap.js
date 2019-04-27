import React, {Component} from 'react'
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet
} from 'react-native'

import {http} from './upload'


export default class Swap extends Component {
    constructor(props){
        super(props);
        this.state = {
          next_idx: 0,
          cur_url: ''
        }

        this.receiveImage();

      }

    receiveImage() {
      http.get('/result', {
        params: {
          idx: this.state.next_idx
        }
      })
      .then((response) => {
          console.log(response);

          if (response.data.status == 'Success'){
              // show image
              cur_idx = this.state.next_idx + 1;
              this.setState({
                next_idx: cur_idx,
                cur_url: response.data.url
              });
          }
          else {
            // text wait a while
          }
        });
    }

    render(){
        return (
        <View>
            <Text style={styles.swap}>Show swapped results here</Text>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: this.state.cur_url}}
            />
            <Button
                style={styles.button}
                onPress={()=>this.receiveImage()}
                title='Next Image'
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  swap: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
