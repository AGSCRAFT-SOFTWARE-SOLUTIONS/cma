import { Client, PageProps } from "@/types";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import CreateUpdateClient from "./CreateUpdateClient";
import DeleteClient from "./DeleteClient";
import ReadClient from "./ReadClient";
import { Head } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faEye,
    faPen,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default ({ clients }: PageProps<{ clients: Client[] }>) => {
    return (
        <section className="grid gap-4">
            <Head title="Clients" />
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl">Clients</h1>
                <CreateUpdateClient type="create">
                    <Button color="primary" variant="shadow">
                        <FontAwesomeIcon icon={faCirclePlus} /> Add one
                    </Button>
                </CreateUpdateClient>
            </div>
            <Table>
                <TableHeader>
                    <TableColumn>SNo</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Phone</TableColumn>
                    <TableColumn>Address</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {clients.map((client, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.phone}</TableCell>
                            <TableCell>{client.address}</TableCell>
                            <TableCell className="flex gap-2">
                                <ReadClient client={client}>
                                    <Button
                                        className="min-w-min"
                                        color="primary"
                                        variant="flat"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                </ReadClient>
                                <CreateUpdateClient type="edit" client={client}>
                                    <Button
                                        className="min-w-min"
                                        color="secondary"
                                        variant="flat"
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </Button>
                                </CreateUpdateClient>
                                <DeleteClient client={client}>
                                    <Button
                                        className="min-w-min"
                                        color="danger"
                                        variant="flat"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </DeleteClient>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
};
