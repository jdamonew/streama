import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import * as Styles from './Typography.styles';

export type HeadingLevel = 1 | 2 | 3;
export type TextTone = 'primary' | 'secondary' | 'muted' | 'danger' | 'online';
export type IconType = 'square' | 'circle';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  children: ReactNode;
  color?: string;
}
export interface HeadingIconProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  icon: ElementType;
  iconType?: IconType
}
export interface SubHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export function Heading({ level = 1, children, color, ...rest }: HeadingProps) {
  const as = (`h${level}` as unknown) as 'h1' | 'h2' | 'h3';
  return (
    <Styles.StyledHeading as={as} $level={level} $color={color} {...rest}>
      {children}
    </Styles.StyledHeading>
  );
}
export function SubHeading({ children }: SubHeadingProps) {
  return (
    <Styles.StyledSubHeading>
      {children}
    </Styles.StyledSubHeading>
  )
}
export function HeadingIcon({ children, icon: Icon, iconType }: HeadingIconProps) {
  return (
    <Styles.StyledHeadingIcon >
      <Styles.HeadIcon $iconType={iconType}>
        <Icon size={28} />
      </Styles.HeadIcon>
      <Styles.HeadChildren>
        {children}
      </Styles.HeadChildren>

    </Styles.StyledHeadingIcon>
  );
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: TextTone;
  small?: boolean;
  children: ReactNode;
}

export function Text({ tone = 'primary', small = false, children, ...rest }: TextProps) {
  return (
    <Styles.StyledText $tone={tone} $small={small} {...rest}>
      {children}
    </Styles.StyledText>
  );
}
