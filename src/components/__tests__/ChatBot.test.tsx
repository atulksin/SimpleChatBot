import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ChatBot from '../ChatBot';

describe('ChatBot', () => {
    beforeEach(() => {
        // Mock the Date.toLocaleTimeString() method
        jest.spyOn(Date.prototype, 'toLocaleTimeString')
            .mockImplementation(() => '12:00:00');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders the chat interface', () => {
        render(<ChatBot />);
        expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    });

    it('allows users to send messages', async () => {
        render(<ChatBot />);

        const input = screen.getByPlaceholderText('Type a message...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'Hello bot!' } });
        fireEvent.click(sendButton);

        // User message should appear immediately
        expect(screen.getByText('Hello bot!')).toBeInTheDocument();
        expect(screen.getByText('user · 12:00:00')).toBeInTheDocument();

        // Bot response should appear after delay
        await waitFor(() => {
            expect(screen.getByText('(Simulated bot) I got: "Hello bot!"')).toBeInTheDocument();
            expect(screen.getAllByText('12:00:00')).toHaveLength(2); // Both messages show same time
        });
    });

    it('allows sending messages with Enter key', async () => {
        render(<ChatBot />);

        const input = screen.getByPlaceholderText('Type a message...');

        fireEvent.change(input, { target: { value: 'Hello with enter' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(screen.getByText('Hello with enter')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('(Simulated bot) I got: "Hello with enter"')).toBeInTheDocument();
        });
    });

    it('does not send empty messages', () => {
        render(<ChatBot />);

        const input = screen.getByPlaceholderText('Type a message...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(sendButton);

        // No messages should be added
        expect(screen.queryByText('user · 12:00:00')).not.toBeInTheDocument();
    });

    it('clears input after sending message', () => {
        render(<ChatBot />);

        const input = screen.getByPlaceholderText('Type a message...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'Test message' } });
        fireEvent.click(sendButton);

        expect(input).toHaveValue('');
    });

    it('maintains correct message order', async () => {
        render(<ChatBot />);

        const input = screen.getByPlaceholderText('Type a message...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        // Send first message
        fireEvent.change(input, { target: { value: 'First message' } });
        fireEvent.click(sendButton);

        // Send second message
        fireEvent.change(input, { target: { value: 'Second message' } });
        fireEvent.click(sendButton);

        // Wait for both bot responses
        await waitFor(() => {
            const messages = screen.getAllByText(/message/i);
            expect(messages).toHaveLength(4);
            expect(messages[0].textContent).toBe('First message');
            expect(messages[1].textContent).toBe('(Simulated bot) I got: "First message"');
            expect(messages[2].textContent).toBe('Second message');
            expect(messages[3].textContent).toBe('(Simulated bot) I got: "Second message"');
        });
    });
});