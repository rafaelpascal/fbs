import React, { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { cn } from "~/utils/helpers";
import { LoadingSpinner } from "../ui/loading-spinner";

interface BaseButtonProps
  extends React.ComponentProps<(typeof motion)["button"]> {
  children: React.ReactNode;
  containerCLassName?: string;
  onClick?: MouseEventHandler;
  hoverScale?: number;
  hoverOpacity?: number;
  tapScale?: number;
  loading?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  variant?: "primary" | "outline";
}

export const BaseButton = (props: BaseButtonProps) => {
  const {
    icon: Icon,
    children,
    containerCLassName,
    onClick,
    hoverScale = 1.03,
    hoverOpacity = 0.9,
    tapScale = 0.97,
    loading,
    type = "button",
    disabled,
    variant,
    className,
    ...rest
  } = props;

  const _disabled = loading || disabled;

  const doNotRunForDisabled = <T,>(value: T) => {
    return _disabled ? undefined : value;
  };

  return (
    <motion.button
      whileHover={{
        scale: doNotRunForDisabled(hoverScale),
        opacity: doNotRunForDisabled(hoverOpacity),
        transition: doNotRunForDisabled({ duration: 0.1 }),
      }}
      whileTap={{ scale: doNotRunForDisabled(tapScale) }}
      className={cn(
        "flex h-[45px] w-full cursor-pointer select-none items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-sm text-themeText",
        {
          "cursor-not-allowed bg-opacity-80 text-opacity-80": loading,
          "bg-primary-500 text-white": variant === "primary",
          "whitespace-nowrap border border-themeText/20 bg-transparent text-themeText":
            variant === "outline",
        },
        containerCLassName,
        className
      )}
      onClick={onClick}
      type={type}
      disabled={_disabled}
      {...rest}
    >
      {children}
      {loading && <LoadingSpinner size="xs" />}
      {Icon && <Icon className={cn("bg-transparent text-[24px]")} />}
    </motion.button>
  );
};

export { BaseButton as Button };
