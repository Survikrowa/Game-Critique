import { forwardRef } from "react";

export const Text = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    size?: "sm" | "md" | "lg";
    weight?: "light" | "normal" | "bold";
  }
>((props, ref) => {
  const { size = "md", weight = "normal", ...rest } = props;
  return (
    <p
      ref={ref}
      className={`leading-7 text-${size} font-${weight} text-white`}
      {...rest}
    />
  );
});
