import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    children?: React.ReactNode;
  }

  interface TextProps {
    children?: React.ReactNode;
  }

  interface TouchableOpacityProps {
    children?: React.ReactNode;
  }

  interface TextInputProps {
    children?: React.ReactNode;
  }

  interface ScrollViewProps {
    children?: React.ReactNode;
  }

  interface ModalProps {
    children?: React.ReactNode;
  }

  interface ImageProps {
    children?: React.ReactNode;
  }
}

declare global {
  namespace React {
    interface ReactNode {
      bigint?: never;
    }
  }
}

// React Native 컴포넌트 타입 호환성 개선
declare module 'react' {
  interface ReactElement<
    P = any,
    T extends string | JSXElementConstructor<any> =
      | string
      | JSXElementConstructor<any>
  > {
    type: T;
    props: P;
    key: Key | null;
  }
}

// React Native 컴포넌트 타입 확장
declare module '@react-navigation/native' {
  export interface NavigationProp<
    ParamList extends ParamListBase,
    RouteName extends keyof ParamList = keyof ParamList
  > {
    navigate<RouteName extends keyof ParamList>(
      ...args: undefined extends ParamList[RouteName]
        ?
            | [screen: RouteName]
            | [screen: RouteName, params: ParamList[RouteName]]
        : [screen: RouteName, params: ParamList[RouteName]]
    ): void;
  }
}
