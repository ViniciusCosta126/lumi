import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dash from '../pages/dash'
import Biblioteca from '../pages/biblioteca'

export const Routes = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Dash />,
        },
        {
            path: 'biblioteca',
            element: <Biblioteca />
        }
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}