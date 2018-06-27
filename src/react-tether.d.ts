import * as React from 'react';
import * as Tether from 'tether';

export default TetherComponent;
export as namespace ReactTether;

declare class TetherComponent extends React.Component<ReactTether.TetherComponentProps> {
  props: ReactTether.TetherComponentProps;

  static propTypes: ReactTether.TetherComponentProps;

  static defaultProps: {
    renderElementTag: string;
    renderElementTo: any;
  };

  getTetherInstance(): Tether;

  disable(): void;

  enable(): void;

  on(event: any, handler: any, ctx?: any): void;

  once(event: any, handler: any, ctx?: any): void;

  off(event: any, handler: any): void;

  position(): void;
}

declare namespace ReactTether {
  interface TetherComponentProps extends React.Props<TetherComponent>, Tether.ITetherOptions {
    children: React.ReactNode;
    renderElementTag?: string;
    renderElementTo?: Element | string;
    className?: string;
  }
}
