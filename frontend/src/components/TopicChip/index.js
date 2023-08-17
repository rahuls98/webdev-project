import "./style.css";
import Chip from "@mui/material/Chip";

const TopicChip = (props) => {
    return (
        <div
            className={"TopicChip_container".concat(
                props.withMargin ? " with_margin" : ""
            )}
        >
            <Chip
                label={
                    props.label.length <= 45
                        ? props.label
                        : props.label.substring(0, 45).concat("...")
                }
                variant="outlined"
                size="small"
                onClick={() => {}}
                onDelete={props.onDelete ? () => props.onDelete() : null}
            />
        </div>
    );
};

export default TopicChip;
