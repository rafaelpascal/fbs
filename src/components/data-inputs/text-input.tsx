import {
  forwardRef,
  CSSProperties,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
  useCallback,
} from "react";
import {
  Eye,
  EyeDisable,
  InformationCircle,
  CheckMarkCircle,
} from "react-huge-icons/outline";
import { cn } from "~/utils/helpers";
import { FaAsterisk } from "react-icons/fa";

interface BaseInputProps {
  label?: string;
  placeholder?: string;
  containerClassname?: string;
  compulsory?: boolean;
  inputContainerStyle?: CSSProperties;
  type?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  showValidTick?: boolean;
  error?: string;
  readonly?: boolean;
}

export const BaseInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  BaseInputProps &
    (
      | InputHTMLAttributes<HTMLInputElement>
      | TextareaHTMLAttributes<HTMLTextAreaElement>
    )
>(
  (
    {
      label,
      placeholder,
      containerClassname,
      compulsory,
      type,
      inputContainerClassName,
      inputClassName,
      labelClassName,
      showValidTick,
      error,
      readOnly,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = useCallback(() => {
      setShowPassword(!showPassword);
    }, [showPassword]);

    return (
      <div className={cn(containerClassname)}>
        {label && (
          <div className="flex justify-start gap-2 items-center">
            <h1
              dangerouslySetInnerHTML={{ __html: label }}
              className={cn(
                "text-blackColor font-darkerGrotesque-bold mb-2 text-left text-[28px] font-medium leading-[25px]",
                labelClassName
              )}
            />
            {compulsory && (
              <FaAsterisk className="text-[#F01E00] mb-2 text-[12px]" />
            )}
          </div>
        )}

        <div
          style={{ opacity: readOnly ? ".5" : 1 }}
          className={cn(
            "relative flex w-auto flex-row items-center justify-between gap-1 h-[66px] rounded-[8px] px-3 text-[16px] font-normal font-DMSans text-[#03435F] outline-none border-[1px] border-[#E6E6E6]",
            readOnly ? "opacity-[.5]" : "opacity-[1]",
            inputContainerClassName
          )}
        >
          {type === "text-area" ? (
            <textarea
              placeholder={placeholder}
              readOnly={readOnly}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={4}
              cols={6}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              autoComplete="True"
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              className={cn(
                "h-full w-full cursor-pointer bg-transparent outline-none focus:outline-none",
                inputClassName
              )}
              placeholder={placeholder}
              readOnly={readOnly}
              ref={ref as React.Ref<HTMLInputElement>}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {type === "password" &&
            (showPassword ? (
              <EyeDisable
                onClick={handleTogglePassword}
                className="cursor-pointer text-[30px] text-[#03435F]"
              />
            ) : (
              <Eye
                onClick={handleTogglePassword}
                className="cursor-pointer text-[30px] text-[#03435F]"
              />
            ))}
          {showValidTick && (
            <CheckMarkCircle className="ml-3 text-[30px] text-[green]" />
          )}
        </div>
        {error && (
          <p className="mb-4 flex mt-2 items-center gap-2 text-[14px] leading-[15px] font-CircularStd text-[red]">
            <InformationCircle /> {error}
          </p>
        )}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";
