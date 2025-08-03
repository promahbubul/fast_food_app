import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import {images} from '@/constants';



const CartButton = () => {
    const totalItems = 10
    return (
       <TouchableOpacity className={'cart-btn'} onPress={() => {}} >
           <Image source={images.bag} className={'size-5'} resizeMode={'contain'} />
           {
               totalItems && (
                   <View className={'cart-badge'}>
                       <Text className={'small-bold  text-white'} >{totalItems}</Text>
                   </View>
               )
           }
       </TouchableOpacity>
    )
}
export default CartButton
const styles = StyleSheet.create({})
