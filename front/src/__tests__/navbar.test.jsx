import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../components/NavBar'
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar component', () => {
    beforeEach(() => {
        jest.mock('../components/NavBar/main.scss', () => ({}));
    });
    it('renders NavBar component', () => {
       render(<MemoryRouter><NavBar /></MemoryRouter>);
        const logo = screen.getByAltText('Logo');
        const dashLink = screen.getByText('Dash');
        const bibliotecaLink = screen.getByText('Biblioteca');
        const burgerIcon = screen.getByLabelText('Menu open/close');

        expect(logo).toBeInTheDocument();
        expect(dashLink).toBeInTheDocument();
        expect(bibliotecaLink).toBeInTheDocument();
        expect(burgerIcon).toBeInTheDocument();
    });

    it('toggles header when burger icon is clicked', () => {
        render(<MemoryRouter><NavBar /></MemoryRouter>);
        const header = screen.getByRole('banner');
        const burgerIcon = screen.getByLabelText('Menu open/close');

        expect(header).not.toHaveClass('header--active');
        fireEvent.click(burgerIcon);
        expect(header).toHaveClass('header--active');
        fireEvent.click(burgerIcon);
        expect(header).not.toHaveClass('header--active');
    });
});
