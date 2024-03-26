import { ProjectAugment } from "@/types";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import AddClientPayment from "../Transactions/AddClientPayment";
import CreateUpdatePurchase from "../Transactions/CreateUpdatePurchase";

export default ({ project }: { project: ProjectAugment }) => {
    return (
        <div className="grid gap-8">
            <div className="grid gap-2">
                <div className="flex justify-between">
                    <h3 className="font-bold text-2xl">Client Payments</h3>
                    <AddClientPayment type="create">
                        <Button color="primary" variant="shadow">
                            Add client payment
                        </Button>
                    </AddClientPayment>
                </div>
                <Table>
                    <TableHeader>
                        <TableColumn>Sno</TableColumn>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Amount</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {project.client.client_payments.map(
                            (payment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{project.client.name}</TableCell>
                                    <TableCell>
                                        {payment.transaction.created_at}
                                    </TableCell>
                                    <TableCell>
                                        {payment.transaction.amount}
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="grid gap-2">
                <div className="flex justify-between">
                    <h3 className="font-bold text-2xl">Purchases</h3>
                    <CreateUpdatePurchase type="create">
                        <Button color="primary" variant="shadow">
                            Add purchase
                        </Button>
                    </CreateUpdatePurchase>
                </div>
                <Table>
                    <TableHeader>
                        <TableColumn>Sno</TableColumn>
                        <TableColumn>Type</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Amount</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {(project.purchases || []).map((purchase, index) => (
                            <TableRow key={index}>
                                <TableCell>{index}</TableCell>
                                <TableCell>
                                    {purchase.products?.[0].type}
                                </TableCell>
                                <TableCell>
                                    {purchase.expense.transaction.created_at}
                                </TableCell>
                                <TableCell>
                                    {purchase.expense.transaction.amount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
