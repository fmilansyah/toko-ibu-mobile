import { View, Image } from 'react-native';
import CategoryItemStyle from '../../styles/CategoryItem.style';
import { marginContainer } from '../../styles/global.style';
import { Text } from '../Basic';

const CategoryItem = ({ data, isLastItem }) => {
  return (
    <View
      style={[
        CategoryItemStyle.categoryBox,
        {
          marginRight: isLastItem ? marginContainer : 0,
        },
      ]}>
      <Image
        source={{
          uri: data?.illustration,
        }}
        style={CategoryItemStyle.categoryImage}
      />
      <Text style={CategoryItemStyle.categoryName}>{data?.title}</Text>
    </View>
  );
};

export default CategoryItem;
