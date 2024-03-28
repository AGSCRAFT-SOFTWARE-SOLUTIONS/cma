import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import CreateUpdateDayLog from "./CreateUpdateDayLog";
import { ProjectAugment } from "@/types";

let index = 0;

export default ({ project }: { project: ProjectAugment }) => {
    return (
        <div className="grid gap-2">
            <div className="flex justify-between">
                <h3 className="font-bold text-2xl">Client Payments</h3>
                <CreateUpdateDayLog type="create">
                    <Button color="primary" variant="shadow">
                        Add day log
                    </Button>
                </CreateUpdateDayLog>
            </div>
            <Table>
                <TableHeader>
                    <TableColumn>Sno</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Date</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{"asdf"}</TableCell>
                        <TableCell>{"Adsf"}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
