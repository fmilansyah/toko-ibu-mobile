import { TouchableOpacity, Image, Text } from 'react-native';
import CategoryItemStyle from '../../styles/CategoryItem.style';
import { marginContainer } from '../../styles/global.style';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({ data, isLastItem }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        CategoryItemStyle.categoryBox,
        {
          marginRight: isLastItem ? marginContainer : 0,
        },
      ]}
      onPress={() =>
        navigation.navigate('ProductByCategory', {
          id: data?.kd_kategori,
          name: data?.nama,
        })
      }>
      <Image
        source={{
          uri: data?.foto,
        }}
        style={CategoryItemStyle.categoryImage}
      />
      <Text style={CategoryItemStyle.categoryName}>{data?.nama}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
