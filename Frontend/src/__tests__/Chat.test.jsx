import { render, screen, act } from '@testing-library/react';
import { MyContext } from '../MyContext.jsx';
import Chat from '../Chat.jsx';
import { describe, it, expect, vi } from 'vitest';

const mockProviderValue = {
  newChat: false,
  prevChats: [
    { role: 'user', content: 'hello' },
    { role: 'assistant', content: 'world' }
  ],
  reply: 'world'
};

describe('Chat Component', () => {
  it('renders chat messages correctly', () => {
    render(
      <MyContext.Provider value={mockProviderValue}>
        <Chat />
      </MyContext.Provider>
    );

    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('displays the assistant reply with typing effect', async () => {
    vi.useFakeTimers();
    
    render(
      <MyContext.Provider value={mockProviderValue}>
        <Chat />
      </MyContext.Provider>
    );

    // Initial state should be first word or empty
    // The typing effect is split by spaces: 'world' has 1 word.
    
    act(() => {
      vi.advanceTimersByTime(100); // More than enough for one word (40ms/word)
    });

    expect(screen.getByText('world')).toBeInTheDocument();
    
    vi.useRealTimers();
  });

  it('handles null/undefined reply gracefully', () => {
    const nullReplyValue = { ...mockProviderValue, reply: null };
    
    render(
      <MyContext.Provider value={nullReplyValue}>
        <Chat />
      </MyContext.Provider>
    );
    
    // Should still render previous messages without crashing
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
