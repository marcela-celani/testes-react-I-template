import userEvent from '@testing-library/user-event'
import TodoList from '../components/TodoList'
import { render, screen } from '@testing-library/react'


describe("TodoList", () => {
    test("deve renderizar com o titulo", () => {
        render(<TodoList />)
        //const title = screen.getByText("Todo List")
        const title = screen.getByText(/todo list/i)
        expect(title).toBeInTheDocument()
    })

    test("o input deve iniciar vazio", () => {
        render(<TodoList />)

        const input = screen.getByPlaceholderText("Enter a todo")
        expect(input).toHaveValue("")
    })

    test("deve atualizar o valor do input ao digitar nele", async () => {
        render(<TodoList />)

        const user = userEvent.setup()

        const input = screen.getByPlaceholderText("Enter a todo")

        await user.type(input, "bananinha")

        expect(input).toHaveValue("bananinha")
    })

    test("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla enter", async () => {
        render(<TodoList />)

        const user = userEvent.setup()

        const input = screen.getByPlaceholderText("Enter a todo")

        await user.type(input, "bananinha{enter}")
        
        const todoItem = screen.getByText(/bananinha/i)
        expect(todoItem).toBeInTheDocument()

    })

    test("deve alterar o status da tarefa quando o botão de alterar tarefa for clicado", async () => {
        render(<TodoList />)

        const user = userEvent.setup()

        const input = screen.getByPlaceholderText("Enter a todo")

        await user.type(input, "bananinha{enter}")
        
        const todoItem = screen.getByText(/bananinha/i)
        const toggleButton = screen.getByText("Toggle")
        
        await user.click(toggleButton)
        
        expect(todoItem).toHaveStyle("text-decoration: line-through")

        await user.click(toggleButton)
        
        expect(todoItem).toHaveStyle("text-decoration: none")

    })

    test("deve deletar uma tarefa quando o botão de deletar for clicado", async () => {
        render(<TodoList />)

        const user = userEvent.setup()

        const input = screen.getByPlaceholderText("Enter a todo")

        await user.type(input, "bananinha{enter}")
        
        const todoItem = screen.queryByText(/bananinha/i)
        const deleteButton = screen.getByText(/delete/i)
        
        await user.click(deleteButton)
        
        expect(todoItem).not.toBeInTheDocument()

    })

})