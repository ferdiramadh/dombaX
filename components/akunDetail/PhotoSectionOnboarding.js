import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { pickImageOnly } from '../../utils/ImageUpload'
import { windowHeigth } from '../../utils/DimensionSetup'

const PhotoSectionOnboarding = ({ title, value, setFieldValue, field }) => {
  return (
    <View style={styles.upperContent}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <View>
          {value ? <Image source={{ uri: value }} style={styles.photoProfileIcon} /> : <MaterialIcons name="account-circle" size={100} color="black" />}
        </View>
      </View>
      <TouchableOpacity onPress={() => pickImageOnly(true, setFieldValue, field)} style={styles.tambahFotoBtn}>
        <Text style={styles.tambahFotoBtnTxt}>Tambah Foto</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PhotoSectionOnboarding

const styles = StyleSheet.create({
  upperContent: {
    width: '100%',
    height: windowHeigth * .2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 20
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontFamily: 'Baloo'
  },
  tambahFotoBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  photoProfileIcon: {
    width: 100,
    height: 100,
    borderRadius: 60
  },
  tambahFotoBtnTxt: {
    fontFamily: 'Quicksand',
    fontSize: 20
  }
})