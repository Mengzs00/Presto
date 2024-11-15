import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from "vitest";
import Login from '../pages/login';
import Register from '../pages/register';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import authStore from '../store/auth';
import alertStore from '../store/alert';


beforeEach(() => {
  global.fetch = vi.fn();
  vi.spyOn(alertStore.getState(), 'openAlert').mockImplementation(vi.fn());
  vi.spyOn(authStore.getState(), 'setToken').mockImplementation(vi.fn());
  vi.clearAllMocks(); // clear all data used for mock before
});

describe("Register page test", () => {
  it("capature the login page title in the login page", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByText('Register Page')).toBeInTheDocument();
  });
  it("capature name label in the register page", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });
  it("capature email label in the register page", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
  it("capature password label in the login page", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
  it("capature confirm password label in the login page", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it("click register button without name, email password information and showing error message", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const button = screen.getByText("Register");
    expect(button).toBeInTheDocument();
    await fireEvent.click(button);
    expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email')).toBeInTheDocument();
    expect(screen.getByText('Please enter your password')).toBeInTheDocument();
  });

  it('displays error message when the email is invalid', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    // waiting for the error message
    await waitFor(() => {
      expect(screen.getByText('Please enter valid email')).toBeInTheDocument();
    });

  });

  it('displays error message when the password is not match the confirm password', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    // waiting for the error message
    await waitFor(() => {
      expect(screen.getByText('Password does not match')).toBeInTheDocument();
    });

  });

  it('displays success message on successful login', async () => {
    // 模拟成功响应，返回 token
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ token: 'mocked_token' }),
      ok: true
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    // waiting for the tip message of the alertStore
    await waitFor(() => {
      expect(alertStore.getState().openAlert).toHaveBeenCalledWith('Register successfully', 'success');
    });

    expect(authStore.getState().setToken).toHaveBeenCalledWith('mocked_token');
  });

  it('navigates to the Login page when the Login link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    // Find the 'Go login' link and click it
    fireEvent.click(screen.getByText(/Go login/i));

    // Wait for the Register page to be rendered and check if it contains a specific element
    await waitFor(() => {
      // Check if the Login page has a unique element to identify it
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });
});
