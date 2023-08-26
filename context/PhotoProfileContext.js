import React, { createContext, useState } from 'react'

export const PhotoContext = createContext()
const PhotoProfileProvider = (props) => {

  const [image, setImage] = useState(null)
  const [topTabTransactionFocus, setTopTabTransactionFocus] = useState('Income')

  return (
    <PhotoContext.Provider value={{ image, setImage, topTabTransactionFocus, setTopTabTransactionFocus }}>
      {props.children}
    </PhotoContext.Provider>
  )
}

export default PhotoProfileProvider

