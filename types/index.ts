import { NavigatorScreenParams } from '@react-navigation/native';

export type Livro = {
  id: number;
  titulo: string;
  autor: string;
  [campo: string]: string | number | null;
};

export type InicioStackParamList = {
  Lista: undefined;
  Detalhes: { id: number };
  Favoritar: { id: number; titulo: string };
};

export type TabParamList = {
  InicioStack: NavigatorScreenParams<InicioStackParamList>;
  Favoritos: undefined;
};

export type DrawerParamList = {
  Principal: NavigatorScreenParams<TabParamList>;
  Sobre: undefined;
};
