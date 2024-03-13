import { Account } from "@/types"
import { useForm } from "@inertiajs/react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, CheckboxGroup } from "@nextui-org/react";
import { PropsWithChildren, cloneElement } from "react";

export default ({ children, type, account, isPage }: PropsWithChildren<{ isPage?: boolean } & ({ type: "create", account?: never } | { type: "edit", account: Account })>) => {

    const { data, setData, errors, post, put } = useForm<Account>({
        id: account?.id ?? "",
        name: account?.name ?? "",
        balance: account?.balance ?? 0,
        type: account?.type ?? "bank"
    })

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const submit = async () => {
        if (type == "create") {
            return post(route("accounts.store"), {
                onSuccess: () => {
                    alert("Successfully added")
                    onClose()
                }
            })
        }

        put(route("accounts.update", account.id), {
            onSuccess: () => {
                alert("Successfully updated");
                onClose()
            }
        })
    }

    if (isPage) {
        return <div className="h-full grid place-content-center gap-4">
            <Input
                autoFocus
                label="Name"
                placeholder="Enter name"
                defaultValue={data.name}
                onInput={e => setData("name", e.currentTarget.value)}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                classNames={{ base: "w-96" }}

            />
            <Input
                label="Balance"
                placeholder="Enter balance"
                type="number"
                defaultValue={data.balance.toString()}
                onInput={e => setData("balance", Number(e.currentTarget.value))}
                isInvalid={!!errors.balance}
                errorMessage={errors.balance}

            />
            <CheckboxGroup
                label="Account type"
                value={[data.type]}
                onValueChange={(e) => setData("type", e[e.length - 1] as Account["type"])}
                orientation="horizontal"
                isInvalid={!!errors.type}
                errorMessage={errors.type}
            >
                <Checkbox value="bank">Bank</Checkbox>
                <Checkbox value="advance">Advance</Checkbox>
            </CheckboxGroup>
            <Button color="primary" variant="shadow" onPress={submit}>
                Add
            </Button>
        </div>
    }

    return (
        <>
            {cloneElement(children as any, { onClick: onOpen })}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Add account</ModalHeader>
                    <ModalBody>
                        <Input
                            autoFocus
                            label="Name"
                            placeholder="Enter name"
                            defaultValue={data.name}
                            onInput={e => setData("name", e.currentTarget.value)}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name}

                        />
                        <Input
                            label="Balance"
                            placeholder="Enter balance"
                            type="number"
                            defaultValue={data.balance.toString()}
                            onInput={e => setData("balance", Number(e.currentTarget.value))}
                            isInvalid={!!errors.balance}
                            errorMessage={errors.balance}

                        />
                        <CheckboxGroup
                            label="Account type"
                            value={[data.type]}
                            onValueChange={(e) => setData("type", e[e.length - 1] as Account["type"])}
                            orientation="horizontal"
                            isInvalid={!!errors.type}
                            errorMessage={errors.type}
                        >
                            <Checkbox value="bank" >Bank</Checkbox>
                            <Checkbox value="advance">Advance</Checkbox>
                        </CheckboxGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="shadow" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" variant="shadow" onPress={submit}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
