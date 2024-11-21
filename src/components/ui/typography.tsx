import { ClassArray } from "clsx";
import { cn } from "~/utils/helpers";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Font weight.
   */
  light?: true;
}

export const Heading = (props: HeadingProps): JSX.Element => {
  const { level = 2, className, light = false, ...prop } = props;

  const cnFn = (...inputs: ClassArray) =>
    cn(!light ? "font-semibold" : "font-light", inputs, className);

  switch (level) {
    case 1:
      return <h1 className={cnFn("text-7xl")} {...prop} />;
    case 2:
      return <h2 className={cnFn("text-6xl")} {...prop} />;
    case 3:
      return <h3 className={cnFn("text-4xl")} {...prop} />;
    case 4:
      return <h4 className={cnFn("text-3xl")} {...prop} />;
    case 5:
      return <h5 className={cnFn("text-2xl")} {...prop} />;
    case 6:
      return <h6 className={cnFn("text-lg")} {...prop} />;
  }
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  light?: true;
  size?: "base" | "sm" | "xs" | "xxs";
}
export const Text = (props: TextProps) => {
  const { size, light = false, className, ...rest } = props;

  const fontSize = (() => {
    switch (size) {
      case "base":
        return "text-base";
      case "sm":
        return "text-sm";
      case "xs":
        return "text-xs";
      case "xxs":
        return "text-[11px] leading-[16px]";
    }
  })();

  return (
    <p
      className={cn(
        !light ? "font-semibold" : "font-light",
        fontSize,
        className
      )}
      {...rest}
    />
  );
};
