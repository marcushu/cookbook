import { FunctionComponent } from "react";
import RecipeCard from "./RecipeCard";
import { Recipe } from "../interfaces/types";

interface RecipeListProps {
  recipes: Recipe[]
}

const RecipeList: FunctionComponent<RecipeListProps> = ({ recipes }) => {
  
  return (
    <>
      {recipes?.map(recipe => 
         <div>
            <RecipeCard recipe={recipe} />
        </div>
      )}
    </>
  );
}

export default RecipeList;