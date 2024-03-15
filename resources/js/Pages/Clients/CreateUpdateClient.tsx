import { Client } from "@/types";
import { useForm } from "@inertiajs/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from "@nextui-org/react";
import { PropsWithChildren, cloneElement } from "react";

export default ({
    children,
    type,
    client,
}: PropsWithChildren<
    { type: "create"; client?: never } | { type: "edit"; client: Client }
>) => {
    const { data, setData, errors, post, put } = useForm<Client>({
        id: client?.id ?? "",
        name: client?.name ?? "",
        phone: client?.phone ?? "",
        address: client?.address ?? "",
    });

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const submit = async () => {
        if (type == "create") {
            return post(route("clients.store"), {
                onSuccess: () => {
                    alert("Successfully added");
                    onClose();
                },
            });
        }

        put(route("clients.update", client.id), {
            onSuccess: () => {
                alert("Successfully updated");
                onClose();
            },
        });
    };

    return (
        <>
            {cloneElement(children as any, { onClick: onOpen })}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Add client
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            autoFocus
                            label="Name"
                            placeholder="Enter name"
                            defaultValue={data.name}
                            onInput={(e) =>
                                setData("name", e.currentTarget.value)
                            }
                            isInvalid={!!errors.name}
                            errorMessage={errors.name}
                        />
                        <Input
                            label="Phone"
                            placeholder="Enter phone"
                            defaultValue={data.phone}
                            onInput={(e) =>
                                setData("phone", e.currentTarget.value)
                            }
                            isInvalid={!!errors.phone}
                            errorMessage={errors.phone}
                        />
                        <Input
                            label="Address"
                            placeholder="Enter address"
                            defaultValue={data.address}
                            onInput={(e) =>
                                setData("address", e.currentTarget.value)
                            }
                            isInvalid={!!errors.address}
                            errorMessage={errors.address}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="shadow"
                            onPress={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            color="primary"
                            variant="shadow"
                            onPress={submit}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
