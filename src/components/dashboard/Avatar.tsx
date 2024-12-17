import { ClassArray } from "clsx";
import { cn, createAvatarUrl } from "~/utils/helpers";

interface AvatarProps {
  name: string;
  children?: React.ReactNode;
  img?: string;
  avatarClassName?: string;
  textClassName?: string;
  wrapperClassName?: string;
  color?: string;
  avatarTextContainerClassName?: string;
  rounded?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const {
    img,
    name,
    avatarClassName,
    textClassName,
    wrapperClassName,
    rounded,
    color,
  } = props;

  const cnFn = (...inputs: ClassArray) =>
    cn(
      "h-10 w-10 rounded-md",
      rounded && "rounded-full",
      inputs,
      avatarClassName,
      textClassName
    );

  return (
    <div
      className={cn(
        "flex items-center rounded-[12px] text-white gap-2",
        wrapperClassName
      )}
    >
      {img ? (
        <img src={img} className={cnFn("rounded-[12px]")} alt={name} />
      ) : (
        <div
          style={{
            backgroundImage: `url(${createAvatarUrl({
              avatarUrl: name,
              additionalParams: {
                background: "A2A1A833",
                color: color || "",
              },
            })})`,
          }}
          className={cnFn`bg-cover font-normal text-sm rounded-[12px] ${textClassName}`}
        />
      )}
    </div>
  );
};
