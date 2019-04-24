import * as React from 'react';
import * as Tether from 'tether';

export default TetherComponent;
export as namespace ReactTether;

declare class TetherComponent extends React.Component<
  ReactTether.TetherComponentProps
> {
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
  type TetherAttachment = { top: string; left: string };
  type UpdateEventData = {
    attachment: TetherAttachment;
    targetAttachment: TetherAttachment;
  };
  type RenderProp = (ref: React.RefObject<HTMLElement>) => React.ReactNode;

  interface TetherComponentProps
    extends React.Props<TetherComponent>,
      Tether.ITetherOptions {
    renderTarget?: RenderProp;
    renderElement?: RenderProp;
    renderElementTag?: string;
    renderElementTo?: Element | string;
    attachment: string;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    onUpdate?: (data: UpdateEventData) => void;
    onRepositioned?: () => void;
  }
}
