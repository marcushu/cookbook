import { render } from "@testing-library/react";
import SearchButtonSmall from "../SearchButtonSmall";

describe('SearchButtonSmall', () => {
    const mockFunc = jest.fn();

    it('renders', () => {
        const { asFragment } = render(<SearchButtonSmall searchFunction={mockFunc} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('calls the prop funciton when clicked', () => {
        const { getByTestId } = render(<SearchButtonSmall searchFunction={mockFunc} />)

        getByTestId('searchbuttonsmall').click();

        expect(mockFunc).toHaveBeenCalled();
    });
})