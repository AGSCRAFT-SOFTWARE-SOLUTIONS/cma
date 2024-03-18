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
import { Client, Project } from "@/types";
import CreateUpdateProject from "./CreateUpdateProject";
import DeleteProject from "./DeleteProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function App({
    children,
    project,
}: PropsWithChildren<{ project: Project & { client: Client } }>) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {cloneElement(children as any, { onClick: onOpen })}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Project: {project.name}
                            </ModalHeader>
                            <ModalBody>
                                <Input label="Name" value={project.name} />
                                <Input
                                    label="Client"
                                    value={project.client.name}
                                />
                                <Input
                                    label="Location"
                                    value={project.location}
                                />
                                <Input
                                    label="Category"
                                    value={project.category}
                                />
                                <Input
                                    label="Budget"
                                    value={project.budget.toString()}
                                />
                                <Input
                                    label="Start_date"
                                    value={project.start_date}
                                />
                                <Input
                                    label="Completion_date"
                                    value={project.completion_date}
                                />
                                <Input
                                    label="Description"
                                    value={project.description}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" onClick={onClose}>
                                    Close
                                </Button>
                                <CreateUpdateProject
                                    type="edit"
                                    project={project}
                                >
                                    <Button
                                        className="min-w-min"
                                        color="secondary"
                                        variant="shadow"
                                    >
                                        <FontAwesomeIcon icon={faPen} /> Edit
                                    </Button>
                                </CreateUpdateProject>
                                <DeleteProject project={project}>
                                    <Button
                                        className="min-w-min"
                                        color="danger"
                                        variant="shadow"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />{" "}
                                        Delete
                                    </Button>
                                </DeleteProject>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
