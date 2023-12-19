
import userEvent from '@testing-library/user-event'
import Counter from '../components/Counter'
import { render, screen } from '@testing-library/react'

describe("Counter", () => {
    test("deve aumentar em 3 o contador quando o botao de incremento for clicado 3x", async () => {
        render(<Counter />)

        const user = userEvent.setup()


        const counterButton = screen.getByText("+")
        await user.click(counterButton)
        await user.click(counterButton)
        await user.click(counterButton)
        
        const counter = screen.getByText("3")
        expect(counter).toBeInTheDocument()

    })
})