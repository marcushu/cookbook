import { FunctionComponent } from "react";
import RecipeCard from "./RecipeCard";
import { Recipe } from "../interfaces/types";
import { Box } from "@mui/material";

interface RecipeListProps {
  recipes: Recipe[]
}

const RecipeList: FunctionComponent<RecipeListProps> = ({ recipes }) => {
  
  return (
    <Box pb={1}>
      {recipes?.map(recipe => 
         <div>
            <RecipeCard recipe={recipe} />
        </div>
      )}
    </Box>
  );
}

export default RecipeList;