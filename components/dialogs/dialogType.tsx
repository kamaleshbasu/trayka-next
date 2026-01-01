import type { ReactNode } from "react";
import { IconProps } from "../common/Icon";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

export type GlobalDialogOptions = {
    title?: string | ReactNode;
    description?: string | ReactNode;
    icon? : string | IconProps;
    content?: ReactNode;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    size?: DialogSize;
    closeOnConfirm?: boolean;
    args? : {[key: string]: any;}
};

export type GlobalDialogContextValue = {
    openDialog: (opts: GlobalDialogOptions) => void;
    closeDialog: () => void;
};
