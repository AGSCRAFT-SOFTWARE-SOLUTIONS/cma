import { PropsWithChildren, cloneElement } from "react";
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
import { Client } from "@/types";
import CreateUpdateClient from "./CreateUpdateClient";
import DeleteClient from "./DeleteClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function App({
    children,
    client,
}: PropsWithChildren<{ client: Client }>) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {cloneElement(children as any, { onClick: onOpen })}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Client: {client.name}
                            </ModalHeader>
                            <ModalBody>
                                <Input label="Name" value={client.name} />
                                <Input label="Phone" value={client.phone} />
                                <Input label="Address" value={client.address} />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" onClick={onClose}>
                                    Close
                                </Button>
                                <CreateUpdateClient type="edit" client={client}>
                                    <Button
                                        className="min-w-min"
                                        color="secondary"
                                        variant="shadow"
                                    >
                                        <FontAwesomeIcon icon={faPen} /> Edit
                                    </Button>
                                </CreateUpdateClient>
                                <DeleteClient client={client}>
                                    <Button
                                        className="min-w-min"
                                        color="danger"
                                        variant="shadow"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />{" "}
                                        Delete
                                    </Button>
                                </DeleteClient>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
