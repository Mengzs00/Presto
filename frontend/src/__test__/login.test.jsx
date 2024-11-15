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
  vi.clearAllMocks(); // 清除所有 mock 调用数据
});

describe("Login page test", () => {
  it("capature the login page title in the login page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
  it("capature email label in the login page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
  it("capature password label in the login page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it("click login button without email nor password information and showing error message", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const button = screen.getByText("Login");
    expect(button).toBeInTheDocument();
    await fireEvent.click(button);
    expect(screen.getByText('Please enter your email')).toBeInTheDocument();
    expect(screen.getByText('Please enter your password')).toBeInTheDocument();
  });

  it('displays success message on successful login', async () => {
    // 模拟成功响应，返回 token
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ token: 'mocked_token' }),
      ok: true
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // waiting for the tip message of the alertStore
    await waitFor(() => {
      expect(alertStore.getState().openAlert).toHaveBeenCalledWith('Successfully', 'success');
    });

    expect(authStore.getState().setToken).toHaveBeenCalledWith('mocked_token');
  });

  it('displays error message on failed login', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ error: 'Invalid credentials' }),
      ok: false
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Wait for the error message and check if alertStore.openAlert was called with correct parameters
    await waitFor(() => {
      expect(alertStore.getState().openAlert).toHaveBeenCalledWith('Your account or password is error.', 'error');
    });
  });

  it('navigates to the Register page when the Register link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    // Find the 'Register' link and click it
    fireEvent.click(screen.getByText(/Register/i));

    // Wait for the Register page to be rendered and check if it contains a specific element
    await waitFor(() => {
      // Check if the Register page has a unique element to identify it
      expect(screen.getByText('Register Page')).toBeInTheDocument();
    });
  });
});
