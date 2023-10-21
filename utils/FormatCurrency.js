import NumberFormat, { NumericFormat } from 'react-number-format';
import { Text } from 'react-native'

const numberWithCommas = (x) => {
    return x.toString().replace(/,/g, '.')
}

export const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp '} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold', color:'#43B88E', fontSize: 20}}>{numberWithCommas(value)}</Text>} />

export const formatTotalToCurrency = (value, color) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp '} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold', color: color, fontSize: 26}}>{numberWithCommas(value)}</Text>} />

export const formatToCurrencyLight = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp '} renderText={(value, props) => <Text {...props}>{numberWithCommas(value)}</Text>} />

export const formatToCurrencyWithoutStyle = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp '} renderText={(value, props) => <Text {...props}>{numberWithCommas(value)}</Text>} />