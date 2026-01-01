import type React from "react";

export type IconProps = React.SVGAttributes<SVGSVGElement> & {
  name: string;
  size?: number | string;
  color?: string;
};

export default ({ name, size = 24, color, className, ...attrs }: IconProps) => {
  
  const isTailwindClass = typeof color === "string" && (color.startsWith("text-") || color.startsWith("fill-") || color.startsWith("stroke-"));

  const mergedClassName = [
    className,
    isTailwindClass ? color : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      fill={!isTailwindClass && color ? color : "currentColor"} // CSS color
      className={mergedClassName || undefined}
      {...attrs}
    >
      <use href={`/icons/symbol-defs.svg#icon-${name}`} />
    </svg>
  );
};