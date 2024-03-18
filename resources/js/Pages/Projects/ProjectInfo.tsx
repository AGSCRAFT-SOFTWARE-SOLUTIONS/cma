import { ProjectAugment } from "@/types";
import { Button } from "@nextui-org/react";
import CreateUpdateProject from "./CreateUpdateProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default ({ project }: { project: ProjectAugment }) => {
    return (
        <>
            <div className="grid gap-4 grid-cols-[max-content_1fr] items-center">
                <label>Name</label>
                <p className="p-4 bg-default-100 rounded-lg">{project.name} </p>
                <label>Client</label>
                <p className="p-4 bg-default-100 rounded-lg">
                    {project.client.name}
                </p>
                <label>Location</label>
                <p className="p-4 bg-default-100 rounded-lg">
                    {project.location}{" "}
                </p>
                <label>Category</label>
                <p className="p-4 bg-default-100 rounded-lg">
                    {project.category}{" "}
                </p>
                <label>Budget</label>
                <p className="p-4 bg-default-100 rounded-lg">
                    {project.budget.toString()}
                </p>
                <label>Start date</label>
                <p className="p-4 bg-default-100 rounded-lg">
                    {project.start_date}
                </p>
                <label>Completion date</label>
                <p className="p-4 bg-default-100 rounded-lg">
                    {project.completion_date}
                </p>
                <label>Description</label>
                <p className="p-4 bg-default-100 rounded-lg">
                    {project.description}
                </p>
            </div>
            <CreateUpdateProject type="edit" project={project}>
                <Button color="primary" variant="shadow" className="mt-4">
                    <FontAwesomeIcon icon={faPen} /> Edit
                </Button>
            </CreateUpdateProject>
        </>
    );
};
