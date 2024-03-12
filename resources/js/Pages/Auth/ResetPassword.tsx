import { useEffect, FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, Input } from '@nextui-org/react';

export default function ResetPassword({ token, email }: { token: string, email: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        label="Email"
                        isInvalid={!!errors.email}
                        errorMessage={!!errors.email}
                    />
                </div>

                <div className="mt-4">
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        label="Password"
                        isInvalid={!!errors.password}
                        errorMessage={!!errors.password}
                    />
                </div>

                <div className="mt-4">
                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        label="Confirm Password"
                        isInvalid={!!errors.password_confirmation}
                        errorMessage={!!errors.password_confirmation}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button color="primary" className="ms-4" disabled={processing}>
                        Reset Password
                    </Button>
                </div>
            </form>
        </>
    );
}
