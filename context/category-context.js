import React, { useState, useEffect } from "react";

export const CategoryContext = React.createContext({
    category: {}
});

const CategoryContextProvider= (props) => {
    const [category, setCategory] = useState({});

    setCategory(props.category)

    return (
        <CategoryContext.Provider value={{category : category}} >
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider;