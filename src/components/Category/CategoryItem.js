import { View, Image, Text } from 'react-native';
import CategoryItemStyle from '../../styles/CategoryItem.style';
import { marginContainer } from '../../styles/global.style';
import { UPLOADS_DIR } from '../../config/app';

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
          uri: UPLOADS_DIR + data?.foto,
        }}
        style={CategoryItemStyle.categoryImage}
      />
      <Text style={CategoryItemStyle.categoryName}>{data?.nama}</Text>
    </View>
  );
};

export default CategoryItem;
