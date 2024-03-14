import { PropsWithChildren, cloneElement } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { router } from "@inertiajs/react";
import { Project } from "@/types";

export default function App({
    children,
    project,
}: PropsWithChildren<{ project: Project }>) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submit = () => {
        router.delete(route("projects.destroy", project.id), {
            onSuccess: () => alert("Successfully added"),
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
                                Delete project?
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this
                                    project? This action cannot be undone.
                                </p>
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
