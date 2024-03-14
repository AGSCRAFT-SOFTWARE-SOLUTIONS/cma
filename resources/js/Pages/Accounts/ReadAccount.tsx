import { PropsWithChildren, cloneElement } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Account } from "@/types";
import CreateUpdateAccount from "./CreateUpdateAccount";
import DeleteAccount from "./DeleteAccount"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function App({ children, account }: PropsWithChildren<{ account: Account }>) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {cloneElement(children as any, { onClick: onOpen })}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Account: {account.name}</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Name"
                                    value={account.name}

                                />
                                <Input
                                    label="Balance"
                                    value={account.balance.toString()}

                                />
                                <Input
                                    label="Type"
                                    value={account.type}

                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" onClick={onClose}>Close</Button>
                                <CreateUpdateAccount type="edit" account={account}>
                                    <Button className="min-w-min" color="secondary" variant="shadow"><FontAwesomeIcon icon={faPen} /> Edit</Button>
                                </CreateUpdateAccount>
                                <DeleteAccount account={account}>
                                    <Button className="min-w-min" color="danger" variant="shadow"><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                                </DeleteAccount>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

