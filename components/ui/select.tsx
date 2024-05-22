import React from "react";
import SelectData, { components, OptionProps } from "react-select";
import { cn } from "@/lib/utils";

interface SelectProps extends React.ComponentProps<typeof SelectData> {}

export const Select: React.FC<SelectProps> = (props) => {
  const { className, ...rest } = props;

  const CustomOption = (props: OptionProps<any, boolean>) => {
    return (
      <components.Option
        {...props}
        className={cn("rounded-md px-3 py-2 cursor-pointer")}
      >
        {props.children}
      </components.Option>
    );
  };

  return (
    <SelectData
      {...rest}
      className={cn("w-full", className)}
      classNamePrefix="react-select"
      placeholder=""
      components={{ Option: CustomOption }}
      unstyled={true}
      maxMenuHeight={200}
      hideSelectedOptions={true}
      classNames={{
        control: (e) =>
          cn(
            `rounded-md border`,
            `border-input px-3 py-1 text-sm`,
            e.isFocused ? "ring-1 ring-ring" : ""
          ),
        indicatorSeparator: () => "bg-gray-100 mx-2",
        dropdownIndicator: () => "text-gray-400",
        menu: () =>
          cn(
            "absolute top-0 mt-1 text-sm z-10 p-2",
            "rounded-md border bg-popover shadow-md overflow-x-hidden"
          ),
        option: () =>
          cn(
            "cursor-default  ",
            "rounded-sm py-1.5  px-2 text-sm outline-none",
            "focus:bg-gray-200 hover:bg-gray-200 dark:hover:bg-background dark:hover:opacity-60 w-auto"
          ),
        noOptionsMessage: () => "p-5",
        multiValue: () =>
          "bg-gray-200 dark:bg-background px-2 p-1 rounded mr-2",
        input: () => "text-sm overflow-x-hidden",
      }}
    />
  );
};
