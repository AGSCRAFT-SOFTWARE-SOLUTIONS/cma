import { PropsWithChildren, cloneElement, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { router, usePage } from "@inertiajs/react";
import { Client } from "@/types";

export default function App({
    children,
    client,
}: PropsWithChildren<{ client: Client }>) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [error, setError] = useState("");

    const submit = () => {
        router.delete(route("clients.destroy", client.id), {
            onSuccess: () => alert("Successfully added"),
            onError: (e) => setError(e.error),
        });
    };

    return (
        <>
            {cloneElement(children as any, { onClick: onOpen })}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Delete client?
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this client?
                                    This action cannot be undone.
                                </p>
                                {error && (
                                    <p className="bg-danger rounded-xl p-4 text-danger-foreground">
                                        {error}
                                    </p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="danger"
                                    variant="shadow"
                                    onPress={submit}
                                >
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
