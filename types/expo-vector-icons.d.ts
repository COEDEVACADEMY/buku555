type IconProps<T extends string> = {
  name: T;
  size?: number;
  color?: string | import('react-native').OpaqueColorValue;
  style?: import('react-native').StyleProp<import('react-native').TextStyle>;
};
declare module '@expo/vector-icons/MaterialIcons' {
  const MaterialIcons: import('react').ComponentType<IconProps<string>>;
  export default MaterialIcons;
}
declare module '@expo/vector-icons' {
  export const Ionicons: import('react').ComponentType<IconProps<string>>;
  export const MaterialIcons: import('react').ComponentType<IconProps<string>>;
}