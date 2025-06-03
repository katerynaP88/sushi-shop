import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AuthModal from "../AuthModal"
import { AuthProvider, useAuth } from "../../context/AuthContext"
import { BrowserRouter } from "react-router-dom"



const Wrapper = ({ children, show }: { children: React.ReactNode; show: boolean }) => {
    const SetShowProvider = ({ show }: { show: boolean }) => {
        const { setShowAuthModal } = useAuth();
        useEffect(() => {
            setShowAuthModal(show);
        }, [show, setShowAuthModal]);
        return <>{children}</>;
    };

    return (
        <BrowserRouter>
          <AuthProvider>
            <SetShowProvider show={show} />
          </AuthProvider>
        </BrowserRouter>
    );
};

const renderWithProviders = (show: boolean) => 
    render(
        <Wrapper show={show}>
            <AuthModal />
        </Wrapper>       
    );

    describe("AuthModal", () => {
        test("renders login fields by default", async () => {
            renderWithProviders(true);            

            expect(await screen.findByRole("heading", {name: /login/i })).toBeInTheDocument();
            expect(await screen.findByLabelText(/email/i)).toBeInTheDocument();
            expect(await screen.findByLabelText(/password/i)).toBeInTheDocument();
            expect(await screen.findByRole("button", { name: /login/i })).toBeInTheDocument();
        });

        test("toggles to register mode and shows name field", async () => {
            renderWithProviders(true);

            const toggleButton = screen.getByRole("button", { name: /need an account\? register/i, });
            await userEvent.click(toggleButton);

            const registerButton = await screen.findByRole("button", { name: /^register$/i });
            expect(registerButton).toBeInTheDocument();

            expect(await screen.findByLabelText(/name/i)).toBeInTheDocument();
            expect(await screen.findByRole("heading", { name: /register/i })).toBeInTheDocument();
        });
        

        test("shows validation error if submitting empty register form", async () => {
            renderWithProviders(true);

            const toggleButton = screen.getByRole("button", { name: /need an account/i });
            await userEvent.click(toggleButton);

            const submitButton = screen.getByRole("button", { name: /register/i });
            await userEvent.click(submitButton)

            expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
            expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
            expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
        });
    });