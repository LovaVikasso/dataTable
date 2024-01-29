import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import s from './button.module.scss';

type DefaultButtonProps = ComponentPropsWithoutRef<'button'>;

export type ButtonVariant = 'solid' | 'outline' | 'ghost';

export type ButtonProps = DefaultButtonProps & {
    fullWidth?: boolean;
    variant?: ButtonVariant;
};

export const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
    ({ className, fullWidth, variant = 'solid', ...rest }, ref) => {
        const classNames = {
            root: `${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className || ''}`.trim(),
        };

        return <button className={classNames.root} {...rest} ref={ref} />;
    }
);
