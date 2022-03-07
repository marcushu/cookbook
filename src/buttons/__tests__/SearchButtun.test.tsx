import { render } from "@testing-library/react";
import SearchButton from "../SearchButton";

describe('SearchButton', () => {
    const mockFunc = jest.fn();

    it('calls the prop funciton when clicked', () => {
        const { getByTestId } = render(<SearchButton searchFunction={mockFunc} />)

        getByTestId('searchbtn').click();

        expect(mockFunc).toHaveBeenCalled();
    });
});