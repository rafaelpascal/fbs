import { ClassArray } from "clsx";
import { cn, createAvatarUrl } from "~/utils/helpers";

interface AvatarProps {
  name: string;
  children?: React.ReactNode;
  img?: string;
  avatarClassName?: string;
  textClassName?: string;
  wrapperClassName?: string;
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
  } = props;

  const cnFn = (...inputs: ClassArray) =>
    cn(
      "h-10 w-10 rounded-md",
      rounded && "rounded-full",
      inputs,
      avatarClassName
    );

  return (
    <div
      className={cn("flex items-center rounded-[12px] gap-2", wrapperClassName)}
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
              },
            })})`,
          }}
          className={cnFn`bg-cover font-bold rounded-[12px] ${textClassName}`}
        />
      )}
    </div>
  );
};
