import { render } from "@testing-library/react";
import { Recipe } from "../../interfaces/types";
import FullRecipe from "../FullRecipe";

describe('Fullrecipe', () => {
  const myMock = jest.fn();

  const mockRecipe = {
    ingredients: ["ing1", "ing2"],
    instructions: "this is a fake instruction"
  } as Recipe;

  it('renders', () => {
    const { asFragment } = render(<FullRecipe hideMe={myMock} recipe={mockRecipe} />)

    expect(asFragment()).toMatchSnapshot(); 
  });

  it('displays ingredients and instructions', () => {
    const { getByText } = render(<FullRecipe hideMe={myMock} recipe={mockRecipe} />);
    const ingredient = getByText(/ing1/i);
    const ingredient2 = getByText(/ing2/i);
    const instructions = getByText(/this is a fake instruction/i);

    expect(ingredient).toBeDefined();
    expect(ingredient2).toBeDefined();
    expect(instructions).toBeDefined();
  });

  it('calls prop function', () => {
    const { getByRole } = render(<FullRecipe hideMe={myMock} recipe={mockRecipe} />);

    const lessBtn =  getByRole('button');

    lessBtn.click();

    expect(myMock).toHaveBeenCalled();
  });
})


