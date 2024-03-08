import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <section className='h-screen grid place-content-center'>
            {children}
        </section>
    );
}
