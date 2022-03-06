import { render } from "@testing-library/react"
import RecipeCount from "../RecipeCount"

describe('RecipeCount', () => {
    it('renders', () => {
        const { asFragment } = render(<RecipeCount numRecipes={5} recipeOrFave="Recipes" />);
            expect(asFragment()).toMatchSnapshot();
    });

    it('displays the count and the kind', () => {
        const { getByText } = render(<RecipeCount numRecipes={99} recipeOrFave="recipes" />);

        expect(getByText(/recipes/)).toBeDefined();
        expect(getByText(/99/)).toBeDefined();
    });

})