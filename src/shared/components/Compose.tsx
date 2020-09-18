import React from 'react';

interface IProps {
  components: Array<(props: { children: JSX.Element }) => JSX.Element>;
  children: JSX.Element;
}

export const Compose = ({ components = [], children }: IProps) =>
  components.reduceRight((acc, Comp) => <Comp>{acc}</Comp>, children);
