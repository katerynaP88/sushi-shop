import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AuthModal from "../AuthModal"
import { AuthProvider } from "../../context/AuthContext"
import { BrowserRouter } from "react-router-dom"

const renderWithProviders = () => 
    render(
        <BrowserRouter>
          <AuthProvider>
            <AuthModal/>
          </AuthProvider>
        </BrowserRouter>
    )

    describe("AuthModal", () => {
        test("renders login fields by default", () => {
            renderWithProviders();
            screen.debug();

            expect(screen.getByText(/login/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
            expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument()
        })

        test("toggles to register mode and shows name field", async () => {
            renderWithProviders()

            const toggleButton = screen.getByRole("button", { name: /need an account/i })
            await userEvent.click(toggleButton)

            expect(screen.getByText(/register/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        })

        test("shows validation error if submitting empty register form", async () => {
            renderWithProviders()

            const toggleButton = screen.getByRole("button", { name: /need an account/i })
            await userEvent.click(toggleButton)

            const submitButton = screen.getByRole("button", {name: /register/i })
            await userEvent.click(submitButton)

            expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
            expect(await screen.findByText(/password is required/i)).toBeInTheDocument()
            expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
        })
    })