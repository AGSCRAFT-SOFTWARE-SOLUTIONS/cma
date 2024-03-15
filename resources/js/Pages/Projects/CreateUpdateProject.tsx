import { Client, Project } from "@/types";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    Autocomplete,
    AutocompleteItem,
    Textarea,
} from "@nextui-org/react";
import { PropsWithChildren, cloneElement } from "react";
import CreateUpdateClient from "../Clients/CreateUpdateClient";

export default ({
    children,
    type,
    project,
    clients,
}: PropsWithChildren<
    { clients: Client[] } & (
        | { type: "create"; project?: never }
        | { type: "edit"; project: Project }
    )
>) => {
    const { data, setData, errors, post, put } = useForm<Project>({
        id: project?.id ?? "",
        name: project?.name ?? "",
        budget: project?.budget ?? 0,
        category: project?.category ?? "",
        location: project?.location ?? "",
        client_id: project?.client_id ?? "",
        start_date: project?.start_date ?? "",
        description: project?.description ?? "",
        completion_date: project?.completion_date ?? "",
    });

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const submit = async () => {
        if (type == "create")
            post(route("projects.store"), {
                onSuccess: () => {
                    alert("Successfully added");
                    onClose();
                },
            });
        else
            put(route("projects.update", project.id), {
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
                        Add project
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
                        <div className="grid grid-cols-[1fr_max-content] gap-2 items-center">
                            <Autocomplete
                                label="Select a client"
                                isInvalid={!!errors.client_id}
                                errorMessage={errors.client_id}
                                onSelectionChange={(e) =>
                                    setData("client_id", e.toString())
                                }
                            >
                                {clients.map((client) => (
                                    <AutocompleteItem
                                        key={client.id}
                                        value={client.id}
                                    >
                                        {client.name}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <CreateUpdateClient type="create">
                                <Button
                                    className="min-w-min"
                                    color="primary"
                                    variant="flat"
                                >
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </Button>
                            </CreateUpdateClient>
                        </div>
                        <Input
                            label="Location"
                            placeholder="Enter location"
                            defaultValue={data.location}
                            onInput={(e) =>
                                setData("location", e.currentTarget.value)
                            }
                            isInvalid={!!errors.location}
                            errorMessage={errors.location}
                        />
                        <Input
                            label="Category"
                            placeholder="Enter category"
                            defaultValue={data.category}
                            onInput={(e) =>
                                setData("category", e.currentTarget.value)
                            }
                            isInvalid={!!errors.category}
                            errorMessage={errors.category}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                type="date"
                                label="Start date"
                                placeholder="Enter start date"
                                defaultValue={data.start_date}
                                onInput={(e) =>
                                    setData("start_date", e.currentTarget.value)
                                }
                                isInvalid={!!errors.start_date}
                                errorMessage={errors.start_date}
                            />
                            <Input
                                type="date"
                                label="Completion date"
                                placeholder="Enter completion date"
                                defaultValue={data.completion_date}
                                onInput={(e) =>
                                    setData(
                                        "completion_date",
                                        e.currentTarget.value,
                                    )
                                }
                                isInvalid={!!errors.completion_date}
                                errorMessage={errors.completion_date}
                            />
                        </div>
                        <Textarea
                            label="Description"
                            placeholder="Enter description"
                            defaultValue={data.description}
                            onInput={(e) =>
                                setData("description", e.currentTarget.value)
                            }
                            isInvalid={!!errors.description}
                            errorMessage={errors.description}
                        />
                        <Input
                            type="number"
                            label="Budget"
                            placeholder="Enter budget"
                            defaultValue={data.budget.toString()}
                            onInput={(e) =>
                                setData("budget", Number(e.currentTarget.value))
                            }
                            isInvalid={!!errors.budget}
                            errorMessage={errors.budget}
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
