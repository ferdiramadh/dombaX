import NumberFormat from 'react-number-format';
import { Text } from 'react-native'

export const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold', color:'#43B88E', fontSize: 20}}>{value}</Text>} />

export const formatTotalToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold', color:'#43B88E', fontSize: 26}}>{value}</Text>} />

export const formatToCurrencyLight = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props}>{value}</Text>} />