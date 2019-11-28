import React, { Component } from 'react';
import { Button, Text, View, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNTesseractOcr from 'react-native-tesseract-ocr';

const imagePickerOptions = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      imagePath: '',
      imageSource: '',
    }
  }

  getImage = () => {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      this.setState({ imagePath: response.path })
      console.log('path Image', this.state.imagePath)
      const source = { uri: response.uri };
      this.setState({
        imageSource: source,
      });
      console.log(this.state.imageSource)
    });
  }

  regconitionImage = () => {
    const tessOptions = {
      whitelist: null,
      blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
    };

    const imagePath = this.state.imagePath;

    RNTesseractOcr.recognize(imagePath, 'LANG_ENGLISH', tessOptions)
      .then((result) => {
        console.log("OCR Result: ", result);
        this.setState({text: result})
      })
      .catch((err) => {
        console.log("OCR Error: ", err);
        console.log('path', 'test.jpg')
      })
      .done();
  }

  render() {
    const { imagePath } = this.state;
    return (
      <View style={styles.container} >
        <View state={[styles.flex1, styles.styleCenter]}>
          <Image source={this.state.imageSource} style={styles.image} ></Image>
        </View>
        <View style={styles.flex1}>
          <View style={styles.flexDirectionRow}>
            <Button title="Choose image!" onPress={this.getImage}>
            </Button>
            <Button title="Regconition" onPress={this.regconitionImage}>
            </Button>
          </View>
          <View style={styles.resultLayout}>
          <Image source={require('../../img/right-chevron.png')} style={styles.resultImage} ></Image>
          <View>
          <Text style={styles.fontSize18}>{this.state.text}</Text>
          </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    paddingHorizontal: '10%',
    justifyContent: 'space-around'
  },

  flex1: {
    flex: 1,
    width: '100%',
  },
  image: {
    resizeMode: 'contain',
    height: 220,
    width: '100%',
    marginBottom: 20,
  },

  styleCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },

  resultImage: {
    width: 20, 
    height: 20,
    marginBottom: 20,
  },

  resultLayout: {
    marginTop: 50,
    marginLeft: 20,
  },

  fontSize18: {
    fontSize: 20,
    fontWeight: "bold",
  }
})

