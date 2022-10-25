import React from "react";
import MySelect from "./UI/select/MySelect";

const PostFilter = (props) => {
  return (
    <div>
     
      {/* <MyInput
        value={props.filter.query}
        onChange={(e) => props.setFilter({...props.filter, query: e.target.value})}
        placeholder="Search..."
      /> */}
      <MySelect
        value={props.filter.sort}
        onChange={selectedSort => props.setFilter({...props.filter, sort: selectedSort})}
        defaultValueText={"By date"}
        defaultValue={"date"}
        options={[
          { value: "title", name: "By title" },
          { value: "body", name: "By description" },
        ]}
      />
    </div>
  );
};

export default PostFilter;
