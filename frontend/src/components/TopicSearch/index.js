import "./style.css";
import SearchIcon from "@mui/icons-material/Search";
import medicalDictionary from "../../utils/medical-dictionary";
import medicalAbbreviations from "../../utils/medical-abbreviations";
import Autocomplete, { createFilterOptions } from "@mui/joy/Autocomplete";

const searchOptions = [...medicalDictionary, ...medicalAbbreviations];

const TopicSearch = (props) => {
    return (
        <div className="TopicSearch_container">
            <Autocomplete
                placeholder="Search"
                freeSolo
                options={searchOptions}
                value={props.searchString || ""}
                filterOptions={createFilterOptions({
                    matchFrom: "any",
                    limit: 500,
                })}
                onChange={(event, newValue) => {
                    if (newValue) props.onSelect(newValue);
                    else if (props.onSearchClose) props.onSearchClose();
                }}
                startDecorator={<SearchIcon />}
            />
        </div>
    );
};

export default TopicSearch;
