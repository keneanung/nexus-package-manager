import { HTMLProps } from "react";
import { getNexusIconInfo } from "./getNexusIconInfo";

export const NexusIcon = ({ icon, ...otherProps }: HTMLProps<HTMLSpanElement> & { icon: string }) => {
    const { width, height, svgPath } = getNexusIconInfo(icon);
    return (
        <span {...otherProps}>
            <svg viewBox={`0 0 ${width} ${height}`} className="svg-inline--fa">
                <path d={svgPath} />
            </svg>
        </span>
    )
}


