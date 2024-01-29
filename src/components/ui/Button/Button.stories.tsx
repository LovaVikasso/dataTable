import type {Meta, StoryObj} from '@storybook/react'
import {Button} from './'

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Components/Button',

};

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {
    args: {
        variant: 'solid',
        children: 'Solid Button',
    },
}

export const Outlined: Story = {
    args: {
        variant: 'outline',
        children: 'Outline Button',
    },
}
export const SolidDisabled: Story = {
    args: {
        variant: 'solid',
        children: 'Outline Button',
        disabled: true
    },
}
export const OutlinedDisabled: Story = {
    args: {
        variant: 'outline',
        children: 'Outline Button',
        disabled: true
    },
}
