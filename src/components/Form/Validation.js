import { List } from 'react-native-paper';
import globalStyle from '../../styles/global.style';
import { View } from 'react-native';

const Validation = ({ data = [] }) => {
  return (
    <View style={globalStyle.formValidationContainer}>
      <List.Section style={{ marginVertical: 0, paddingVertical: 0 }}>
        {data.map((item, index) => (
          <List.Item
            key={index}
            title={item?.title}
            left={() => (
              <List.Icon
                icon={
                  item?.icon === 'info'
                    ? 'information-outline'
                    : 'alert-outline'
                }
              />
            )}
            titleNumberOfLines={2}
            style={{ paddingVertical: 0 }}
            titleStyle={{ fontFamily: 'Lora-Regular', fontSize: 14 }}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default Validation;
