import { Project, PageProps, Client } from "@/types";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import CreateUpdateProject from "./CreateUpdateProject";
import DeleteProject from "./DeleteProject";
import ReadProject from "./ReadProject";
import { Head } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faEye,
    faPen,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default ({
    projects,
}: PageProps<{ projects: (Project & { client: Client })[] }>) => {
    return (
        <section className="grid gap-4">
            <Head title="Projects" />
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl">Projects</h1>
                <CreateUpdateProject type="create">
                    <Button color="primary" variant="shadow">
                        <FontAwesomeIcon icon={faCirclePlus} /> Add one
                    </Button>
                </CreateUpdateProject>
            </div>
            <Table>
                <TableHeader>
                    <TableColumn>SNo</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Client</TableColumn>
                    <TableColumn>Category</TableColumn>
                    <TableColumn>Location</TableColumn>
                    <TableColumn>Start date</TableColumn>
                    <TableColumn>Budget</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {projects.map((project, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{project.client.name}</TableCell>
                            <TableCell>{project.category}</TableCell>
                            <TableCell>{project.location}</TableCell>
                            <TableCell>{project.start_date}</TableCell>
                            <TableCell>{project.budget}</TableCell>
                            <TableCell className="flex gap-2">
                                <ReadProject project={project}>
                                    <Button
                                        className="min-w-min"
                                        color="primary"
                                        variant="flat"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                </ReadProject>
                                <CreateUpdateProject
                                    type="edit"
                                    project={project}
                                >
                                    <Button
                                        className="min-w-min"
                                        color="secondary"
                                        variant="flat"
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </Button>
                                </CreateUpdateProject>
                                <DeleteProject project={project}>
                                    <Button
                                        className="min-w-min"
                                        color="danger"
                                        variant="flat"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </DeleteProject>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
};
