import type { IconProps } from "./Icon";
import Icon from "./Icon";

type SocialIconProps = IconProps & {
    url: string;
    target?: string;
}

export default ({url, target="_blank", size=18, ...rest} : SocialIconProps) => {
    return (
        <a href={url} target={target} className="border-gray-600 cursor-pointer h-12.5 w-12.5 border flex items-center justify-center rounded-md">
            <Icon {...rest} size={size} />
        </a>
    );
}