"use client"

import { Controller, type Control, type FieldError, type FieldValues, type UseFormRegister } from "react-hook-form";
import { Label } from "../ui/label";
import type { InputHTMLAttributes, JSX } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/TranslationClientProvider";
import ErrorMessage from "./ErrorMessage";

type AdapterHints = {
  valueProp?: string;
  changeProp?: string;
};

type InputProps<T extends FieldValues> = {
    name: string
    register?: UseFormRegister<T>;
    control? : Control<T>;
    label?: string;
    id?: string;
    Tag?: string | JSX.ElementType;
    error?: FieldError;
    disabled?: boolean;
    wrapWithLabel? : boolean;
    wrapperClasses? : string;
    adapter?: AdapterHints;
    renderFieldOnly?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

const getComponentId = (Tag: any)  => (!Tag) ? "Input" : (Tag.displayName || Tag.name || "");

export default <T extends FieldValues>({label = "", name, id, register, Tag = Input, error, disabled = false, wrapWithLabel=false, wrapperClasses, children, className, control, adapter, renderFieldOnly = false, ...rest} : InputProps<T>) => {
    const {t} = useTranslation();
    const compId = getComponentId(Tag);
    const lowerId = compId.toLowerCase();

    const inferredAdapter: AdapterHints = adapter ?? (() => {
        if (lowerId.includes("checkbox") || lowerId.includes("switch")) {
        return { valueProp: "checked", changeProp: "onCheckedChange" };
        }
        if (lowerId.includes("select") || lowerId.includes("radiogroup") || lowerId.includes("radio")) {
        return { valueProp: "value", changeProp: "onValueChange" };
        }
        return { valueProp: "value", changeProp: "onChange" };
    })();

    const isRegistrationBased = register != null;
    
    const registrationFragment = () : JSX.Element => <>
        <Tag 
            id={id ?? name} 
            disabled={disabled} 
            {...(register ? (register(name as any) as any) : {})}
            {...rest}
        />
        {children}
        {error && <ErrorMessage error={error.message} />}
    </>;

    const controlFragment = () : JSX.Element => (!control && !register) ? <></> : <Controller 
        control={control as any}
        name={name as any}
        render={({ field }) => {
            const propsToPass: Record<string, any> = {
                id: id ?? name,
                disabled,
                className,
                ...rest,
            };

            const valueProp = inferredAdapter.valueProp || "value";
            propsToPass[valueProp] = field.value;

            const changeProp = inferredAdapter.changeProp || "onChange";
            propsToPass[changeProp] = (arg: any) => {
                if (changeProp === "onCheckedChange") {
                    field.onChange(Boolean(arg));
                } else if (changeProp === "onValueChange") {
                    field.onChange(arg);
                } else {
                    if (arg && typeof arg === "object" && "target" in arg) {
                        field.onChange(arg.target.value);
                    } else {
                        field.onChange(arg);
                    }
                }
            };

            propsToPass.ref = field.ref;
            return (
                <>
                <Tag {...propsToPass} />
                {children}
                {error && <ErrorMessage error={error.message as any} />}
                </>
            );
        }}
    />;
    

    let fragment : JSX.Element = isRegistrationBased ? registrationFragment() : controlFragment();
    
    return(renderFieldOnly ? <div>{fragment}</div> : (
        wrapWithLabel ? <Label className={cn("form-group", wrapperClasses)}>{fragment}</Label> :
            <div className={cn("form-group", wrapperClasses)}>
                <Label htmlFor={name} className="mb-2">{t(label)}</Label>
                {fragment}
            </div>
        )
    );
}