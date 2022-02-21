import { render } from "@testing-library/react"
import { Recipe } from "../../interfaces/types";
import { Provider } from 'react-redux';
import RecipeCard from '../RecipeCard';
import { store } from '../../app/store';

describe('RecipeCard', () => {
    const mockRecipe = {
        dinner: true,
        lunch: false,
        name: 'mock name',
        owner: 'mock owner',
        glutenFree: true,
        ingredients: ['ing1', 'ing2'],
        vegan: true,
        description: 'mock description',
        instructions: 'these are the mock instructions',
        imageUrl: 'http://mock.url'
    } as Recipe;

    it('renders', () => {
        const { asFragment } = render(<Provider store={store}><RecipeCard recipe={mockRecipe} /></Provider>)

        expect(asFragment()).toMatchSnapshot();
    });

    it('displays meal type', () => {
        const { getByText } = render(<Provider store={store}><RecipeCard recipe={mockRecipe} /></Provider>);

        const mealTypeDinner = getByText(/Dinner/i);

        expect(mealTypeDinner).toBeDefined();
    });

    it('displays meal restriction types', () => {
        const { getByText } = render(<Provider store={store}><RecipeCard recipe={mockRecipe} /></Provider>);

        const restriction = getByText(/Vegan/i);
        const restriction2 = getByText(/GF/i);

        expect(restriction).toBeDefined();
        expect(restriction2).toBeDefined();
    });

    it('displays recipe and description', () => {
        const { getByText } = render(<Provider store={store}><RecipeCard recipe={mockRecipe} /></Provider>);

        const recipeName = getByText(/mock name/i);
        const description = getByText(/mock description/i);

        expect(recipeName).toBeDefined();
        expect(description).toBeDefined();
    });
})