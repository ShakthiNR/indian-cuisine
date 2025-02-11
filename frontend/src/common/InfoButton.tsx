import { TooltipHost } from "@fluentui/react";
import { BsInfoCircleFill } from "react-icons/bs";

const InfoButton = () => {
    return (
        <TooltipHost
            content={`Select one or more ingredients to see the dishes that contain them. You can select "all" to see all dishes.`}
        >
            <BsInfoCircleFill style={{
                margin: "1rem",
                fontSize: "1rem",
                cursor: "pointer",
                color: "#222"
            }} />

        </TooltipHost>

    );
};

export default InfoButton;
