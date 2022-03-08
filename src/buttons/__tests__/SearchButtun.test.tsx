import { render } from "@testing-library/react";
import SearchButton from "../SearchButton";

describe('SearchButton', () => {
    const mockFunc = jest.fn();

    it('renders', () => {
        const { asFragment } = render(<SearchButton searchFunction={mockFunc} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('calls the prop funciton when clicked', () => {
        const { getByTestId } = render(<SearchButton searchFunction={mockFunc} />)

        getByTestId('searchbtn').click();

        expect(mockFunc).toHaveBeenCalled();
    });
});