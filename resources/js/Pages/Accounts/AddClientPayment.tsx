import {
    Account,
    Client,
    ClientPayment,
    ClientPaymentAugment,
    Project,
} from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
} from "@nextui-org/react";
import { PropsWithChildren, cloneElement } from "react";
import CreateUpdateClient from "../Clients/CreateUpdateClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import CreateUpdateProject from "../Projects/CreateUpdateProject";
import CreateUpdateAccount from "./CreateUpdateAccount";

type Props = PropsWithChildren<
    | {
          type: "edit";
          client_payment: ClientPaymentAugment;
          project_id?: never;
          client_id?: never;
      }
    | {
          type: "create";
          client_payment?: never;
          project_id?: string;
          client_id?: string;
      }
>;

export default ({
    children,
    client_id,
    project_id,
    client_payment,
    type,
}: Props) => {
    const {
        clients,
        projects,
        accounts,
    }: { clients: Client[]; projects: Project[]; accounts: Account[] } =
        usePage().props as any;

    const { data, setData, errors, post, put } = useForm({
        type: "client_payment",
        id: client_payment?.id ?? "",
        project_id: client_payment?.project_id ?? "",
        client_id: client_payment?.client_id ?? "",
        transaction_id: client_payment?.transaction_id ?? "",
        amount: client_payment?.transaction.amount,
        created_at: client_payment?.transaction.created_at,
        account_id: client_payment?.transaction.account_id ?? "",
        payment_method: client_payment?.transaction.payment_method ?? "",
        note: client_payment?.transaction.note ?? "",
    });

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const submit = () => {
        post(route("transactions.store"), {
            onSuccess: () => alert("transaction recorded"),
            onError: (e) => console.log(e),
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
                        Add client payment
                    </ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-[1fr_max-content] gap-2 items-center">
                            <Autocomplete
                                label="Select the client"
                                isInvalid={!!errors.client_id}
                                errorMessage={errors.client_id}
                                onSelectionChange={(e) =>
                                    setData("client_id", e.toString())
                                }
                                defaultSelectedKey={client_id ?? data.client_id}
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
                                    className="min-w-min h-full"
                                    color="primary"
                                    variant="flat"
                                >
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </Button>
                            </CreateUpdateClient>
                        </div>
                        <div className="grid grid-cols-[1fr_max-content] gap-2 items-center">
                            <Autocomplete
                                label="Select the account"
                                isInvalid={!!errors.account_id}
                                errorMessage={errors.account_id}
                                onSelectionChange={(e) =>
                                    setData("account_id", e.toString())
                                }
                                defaultSelectedKey={data.account_id ?? ""}
                            >
                                {accounts.map((account) => (
                                    <AutocompleteItem
                                        key={account.id}
                                        value={account.id}
                                    >
                                        {account.name}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <CreateUpdateAccount type="create">
                                <Button
                                    className="min-w-min h-full"
                                    color="primary"
                                    variant="flat"
                                >
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </Button>
                            </CreateUpdateAccount>
                        </div>
                        <div className="grid grid-cols-[1fr_max-content] gap-2 items-center">
                            <Autocomplete
                                label="Select the Project"
                                isInvalid={!!errors.project_id}
                                errorMessage={errors.project_id}
                                onSelectionChange={(e) =>
                                    setData("project_id", e.toString())
                                }
                                defaultSelectedKey={
                                    project_id ?? data?.project_id
                                }
                            >
                                {projects.map((project) => (
                                    <AutocompleteItem
                                        key={project.id}
                                        value={project.id}
                                    >
                                        {project.name}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <CreateUpdateProject type="create">
                                <Button
                                    className="min-w-min h-full"
                                    color="primary"
                                    variant="flat"
                                >
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </Button>
                            </CreateUpdateProject>
                        </div>
                        <Input
                            type="date"
                            label="Date"
                            placeholder="Enter date"
                            defaultValue={data.created_at}
                            onInput={(e) =>
                                setData("created_at", e.currentTarget.value)
                            }
                            isInvalid={!!errors.created_at}
                            errorMessage={errors.created_at}
                        />
                        <Input
                            type="number"
                            label="Amount"
                            placeholder="Enter amount"
                            defaultValue={data.amount?.toString()}
                            onInput={(e) =>
                                setData("amount", Number(e.currentTarget.value))
                            }
                            isInvalid={!!errors.amount}
                            errorMessage={errors.amount}
                        />
                        <Autocomplete
                            label="Select the payment method"
                            isInvalid={!!errors.payment_method}
                            errorMessage={errors.payment_method}
                            onSelectionChange={(e) =>
                                setData("payment_method", e.toString())
                            }
                            defaultSelectedKey={data?.project_id}
                        >
                            <AutocompleteItem key={"cash"} value={"cash"}>
                                Cash
                            </AutocompleteItem>
                            <AutocompleteItem key={"upi"} value={"upi"}>
                                UPI
                            </AutocompleteItem>
                            <AutocompleteItem key={"card"} value={"card"}>
                                Card
                            </AutocompleteItem>
                        </Autocomplete>
                        <Textarea
                            label="Note"
                            defaultValue={data.note}
                            onInput={(e) =>
                                setData("note", e.currentTarget.value)
                            }
                        ></Textarea>
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
