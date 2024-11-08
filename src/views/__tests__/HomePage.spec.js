import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import HomePage from '../HomePage.vue'

// Set up a mock for `useAuth`
const mockLogin = vi.fn()
vi.mock('../../stores/auth', () => ({
  useAuth: () => ({
    login: mockLogin, // Mock `login` as a jest/vitest function
  }),
}))

// Set up a mock for `useRouter`
const mockRouterPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockRouterPush, // Mock `push` as a jest/vitest function
  }),
}))

describe('HomePage', () => {
  it('renders properly', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toContain('Home page')
  })

  it('should have login button', () => {
    const wrapper = mount(HomePage)
    // Check if the button with the text "Login" exists
    const button = wrapper.find('#login-button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Login')
  })

  it('should trigger login function', async () => {
    const wrapper = mount(HomePage)

    const button = wrapper.find('#login-button')
    await button.trigger('click')
    // Assert that `login` was called and `router.push` was invoked with the correct path

    expect(mockLogin).toHaveBeenCalled()
    expect(mockRouterPush).toHaveBeenCalledWith('/protected-page')
  })
})
