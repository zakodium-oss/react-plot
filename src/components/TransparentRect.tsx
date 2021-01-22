import React, { SVGProps } from 'react';

/**
 * Like <rect>, but transparent by default
 */
export default function TransparentRect(props: SVGProps<SVGRectElement>) {
  const { style } = props;
  return (
    <rect
      {...props}
      style={{ ...style, fillOpacity: style.fill ? undefined : 0 }}
    />
  );
}
