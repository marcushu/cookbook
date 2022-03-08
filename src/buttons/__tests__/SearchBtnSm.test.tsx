import { render } from "@testing-library/react";
import SearchButtonSmall from "../SearchButtonSmall";

describe('SearchButtonSmall', () => {
    const mockFunc = jest.fn();

    it('calls the prop funciton when clicked', () => {
        const { getByTestId } = render(<SearchButtonSmall searchFunction={mockFunc} />)

        getByTestId('searchbuttonsmall').click();

        expect(mockFunc).toHaveBeenCalled();
    })
})