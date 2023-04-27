import { TouchableOpacity, Image, Text } from 'react-native';
import CategoryItemStyle from '../../styles/CategoryItem.style';
import { marginContainer } from '../../styles/global.style';

const CategoryItem = ({ data, isLastItem }) => {
  return (
    <TouchableOpacity
      style={[
        CategoryItemStyle.categoryBox,
        {
          marginRight: isLastItem ? marginContainer : 0,
        },
      ]}>
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
